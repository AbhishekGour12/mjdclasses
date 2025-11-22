// src/api/classAPI.js
import api from "./api";

export const classAPI = {
  // ✅ Get all classes
  getAllClasses: async () => {
    try {
      const response = await api.get("/api/classes");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Get single class by ID
  getClassById: async (classId) => {
    try {
      const response = await api.get(`/api/classes/${classId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Get class info by grade (for student)
  getClassByGrade: async (grade) => {
    try {
      const response = await api.get(`/api/classes/grade/${grade}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Add new class
  addClass: async (classData) => {
    try {
      const response = await api.post("/api/classes", classData);
      return response.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to add class.";
      throw new Error(msg);
    }
  },

  // ✅ Update class
  updateClass: async (id, classData) => {
    try {
      const response = await api.put(`/api/classes/${id}`, classData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Delete class
  deleteClass: async (classId) => {
    try {
      const response = await api.delete(`/api/classes/${classId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
