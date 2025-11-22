// src/api/videoAPI.js
import api from "./api";

export const videoAPI = {
  // ✅ Get all videos (with class populated)
  getAllVideos: async (filters = {}) => {
   
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`/api/videos${params ? `?${params}` : ""}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    
    }
  },

  // ✅ Get videos by class ID
  getVideosByClass: async (classId) => {
    try {
      const response = await api.get(`/api/videos/class/${classId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Add new video
  addVideo: async (videoData) => {
    try {
      console.log("hello")
      const response = await api.post("/api/videos", videoData);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add video.";
      throw new Error(msg);
    }
  },

  // ✅ Update video
  updateVideo: async (formData, id) => {
    try {
      
      const response = await api.put(`/api/videos/update/${id}`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Delete video
  deleteVideo: async (videoId) => {
    try {
      const response = await api.delete(`/api/videos/${videoId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
