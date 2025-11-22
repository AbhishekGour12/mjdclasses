import ClassModel from "../model/Class.js";
import Video from "../model/Video.js";

// Add new class
export const addClass = async (req, res) => {
  try {
    const { grade, className, subjects, schedule } = req.body;
    const newClass = new ClassModel({ grade, className, subjects, schedule });
    await newClass.save();
    res.status(201).json({ message: "Class added successfully", data: newClass });
  } catch (error) {
    res.status(500).json({ message: "Error adding class", error });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

// Get single class by ID
export const getClassById = async (req, res) => {
  try {
    const classData = await ClassModel.findById(req.params.id);
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const updated = await ClassModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Class updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    await ClassModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};

// ✅ Get class info (with subjects) by grade
// ✅ Get class info (with subjects + videos) by grade
export const getClassByGrade = async (req, res) => {
  try {
    const { grade } = req.params;

    // Find class with this grade
    const classData = await ClassModel.findOne({ grade }).lean();

    // If no class found, respond and stop
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found for this grade",
      });
    }

    // Ensure subjects is an array
    const subjects = Array.isArray(classData.subjects) ? classData.subjects : [];

    // For each subject fetch related videos (in parallel)
    const subjectsWithVideos = await Promise.all(
      subjects.map(async (subject) => {
        const videos = await Video.find({ subject, classId: classData._id }).lean();
        return { subject, videos };
      })
    );

    // Single response containing classData and subjects+videos
    return res.status(200).json({
      success: true,
      message: "Class data fetched successfully",
      data: {
        ...classData,
        subjects: subjectsWithVideos, // replace plain subjects with enriched subjects
      },
    });
  } catch (error) {
    console.error("getClassByGrade error:", error);

    // Defensive: if headers were already sent, don't try to send another response
    if (res.headersSent) return;

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message ?? error,
    });
  }
};

