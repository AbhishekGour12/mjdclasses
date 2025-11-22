import VideoModel from "../model/Video.js";
import ClassModel from "../model/Class.js";
import Video from "../model/Video.js";

// Add video
export const addVideo = async (req, res) => {
  try {
    const { title, classId, subject, youtubeLink, description, isFeatured } = req.body;

    // Validate class and subject
    const classInfo = await ClassModel.findById(classId);
    if (!classInfo) return res.status(404).json({ message: "Class not found" });
    if (!classInfo.subjects.includes(subject)) {
      return res.status(400).json({ message: "Invalid subject for selected class" });
    }

    const newVideo = new VideoModel({
      title,
      classId,
      subject,
      youtubeLink,
      description,
      duration: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      views: Math.floor(Math.random() * 2000),
      isFeatured
    });

    await newVideo.save();
    res.status(201).json({ message: "Video added successfully", data: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Error adding video", error });
  }
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
