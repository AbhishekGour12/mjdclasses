import VideoModel from "../model/Video.js";
import ClassModel from "../model/Class.js";
import Video from "../model/Video.js";

import axios from "axios";

export const addVideo = async (req, res) => {
  try {
    const { title, classId, subject, youtubeLink, description, isFeatured } = req.body;

    // Validate class and subject
    const classInfo = await ClassModel.findById(classId);
    if (!classInfo) return res.status(404).json({ message: "Class not found" });
    if (!classInfo.subjects.includes(subject)) {
      return res.status(400).json({ message: "Invalid subject for selected class" });
    }

    // Extract YouTube video ID
    const videoId = extractVideoId(youtubeLink);
    if (!videoId)
      return res.status(400).json({ message: "Invalid YouTube link" });

    // Fetch YouTube Data
    const API_KEY = process.env.YOUTUBE_KEY || "AIzaSyBxLbeyEcwu9SSMDLpjO2twM8gnMnN0Tmw";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

    const { data } = await axios.get(apiUrl);
    if (!data.items.length)
      return res.status(400).json({ message: "Video details not found on YouTube" });

    const videoInfo = data.items[0];

    // Convert ISO 8601 duration → mm:ss
    const isoDuration = videoInfo.contentDetails.duration;
    const duration = convertYouTubeDuration(isoDuration);

    const views = parseInt(videoInfo.statistics.viewCount || 0);

    const newVideo = new VideoModel({
      title: title || videoInfo.snippet.title,
      classId,
      subject,
      youtubeLink,
      description: description || videoInfo.snippet.description,
      duration,
      views,
      isFeatured,
      thumbnail: videoInfo.snippet.thumbnails.high.url,
    });

    await newVideo.save();

    res.status(201).json({ message: "Video added successfully", data: newVideo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding video", error });
  }
};

// Extract video ID
const extractVideoId = (url) => {
  const regex = /(?:v=|\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Convert ISO 8601 → mm:ss
const convertYouTubeDuration = (iso) => {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match[1] || 0);
  const seconds = parseInt(match[2] || 0);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};


/// ✅ Get all videos with optional filters
export const getAllVideos = async (req, res) => {
  try {
    const { isFeatured, classId, subject } = req.query;
    const filter = {};
    const io = req.io;

    // Apply filters if provided
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";
    if (classId) filter.classId = classId;
    if (subject) filter.subject = subject;

    // Fetch with filters
    const videos = await VideoModel.find(filter)
      .populate("classId", "className grade")
      .sort({ createdAt: -1 }); // optional, latest first

    return res.status(200).json({
      success: true,
      message: "Videos fetched successfully",
      count: videos.length,
      data: videos,
    });
    
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching videos", error });
  }
};


// Get videos by class
export const getVideosByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const {subject} = req.body;
    const videos = await VideoModel.find({$and:[{ classId }, {subject}]}).populate("classId", "className grade");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class videos", error });
  }
};

// Update video
export const updateVideo = async (req, res) => {
  try {
    const io = req.io;
    const updated = await VideoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Video updated successfully", data: updated });
    const result = await Video.find();
    if(result){
      io.emit("videos", result)
      
      
    }

  } catch (error) {
    res.status(500).json({ message: "Error updating video", error });
  }
};

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    await VideoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video", error });
  }
};

export const getRecentVideos = async (req, res) => {
  try {
    const recentVideos = await VideoModel.find()
      .sort({ createdAt: -1 })
      .limit(4)
      
      

    res.json({
      success: true,
      data: recentVideos,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent videos", error: err });
  }
};
