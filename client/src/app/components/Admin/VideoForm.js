"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { classAPI } from "@/app/lib/class";
import { videoAPI } from "@/app/lib/Video";
import toast from "react-hot-toast";

export default function VideoForm({ editingVideo, onSave, onCancel}) {
  const [formData, setFormData] = useState({
    title: "",
    classId: "",
    subject: "",
    youtubeLink: "",
    description: "",
    isFeatured: false// ✅ New field
  });

  const [classes, setClasses] = useState([]); // All available classes from backend
  const [subjects, setSubjects] = useState([]); // Subjects related to selected class
const [loading, setLoading] = useState(false)

  // ✅ Fetch all classes
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await classAPI.getAllClasses();
      setClasses(res);
    } catch (err) {
      console.error("Error fetching classes:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ When editing, set initial data
  useEffect(() => {
    fetchClasses();
    if (editingVideo) {
      setFormData({
        title: editingVideo.title || "",
        classId: editingVideo.classId || "",
        subject: editingVideo.subject || "",
        youtubeLink: editingVideo.youtubeLink || "",
        description: editingVideo.description || "",
        isFeatured: editingVideo.isFeatured || false,  
      });
    }
  }, [editingVideo]);

  // ✅ Fetch subjects dynamically when class changes
  const handleClassChange = async (classId) => {
    setFormData((prev) => ({ ...prev, classId, subject: "" }));
    if (classId) {
      try {
        const res = await classAPI.getClassById(classId);
        setSubjects(res.subjects || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    } else {
      setSubjects([]);
    }
  };

  // ✅ Handle submit (POST or PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.classId || !formData.subject) {
      alert("Please select class and subject");
      return;
    }

    try {
      if (editingVideo) {
       
        const res = await videoAPI.updateVideo(formData, editingVideo._id);
        if (res) toast.success(res.message);
      
        
      } else {
        const res = await videoAPI.addVideo(formData);
        toast.success(res.message);
        onSave(res.data);
      }
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {editingVideo ? "Edit Video Lecture" : "Add New Video Lecture"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
              placeholder="e.g., Newton's Laws Explained"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Class Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class (Grade)
            </label>
            <select
              required
              value={formData.classId}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className} (Grade {cls.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Subject Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              disabled={!subjects.length}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            >
              <option value="">
                {subjects.length
                  ? "Select Subject"
                  : "Choose a class first to load subjects"}
              </option>
              {subjects.map((subject, i) => (
                <option key={i} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Link
            </label>
            <input
              type="url"
              required
              value={formData.youtubeLink}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  youtubeLink: e.target.value,
                }))
              }
              placeholder="https://www.youtube.com/watch?v=example"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter video description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ✅ Featured Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mark as Featured?
            </label>
            <select
              value={formData.isFeatured ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isFeatured: e.target.value === "true",
                }))
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
            >
              {editingVideo ? "Update Video" : "Add Video"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
