// src/api/studentAPI.js
import api from "./api";

export const studentAPI = {
  // ✅ Get subjects related to student's grade
  getSubjectsByGrade: async (grade) => {
    try {
      const response = await api.get(`/api/classes/grade/${grade}`);
      return response.data.data.subjects; // Return subjects array directly
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Get full class info by grade (if needed)
  getClassDetailsByGrade: async (grade) => {
    try {
      const response = await api.get(`/api/classes/grade/${grade}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ✅ Get all videos of student's class
  getVideosForStudentClass: async (classId) => {
    try {
      const response = await api.get(`/api/videos/class/${classId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
   getStudent: async () =>{
    try{
        const respone = await api.get("/api/auth/students");
        return respone.data;

    } catch(error){
        throw error.respone?.data || error.message
    }
  },
  getAttendance: async () =>{
    try{
      const respone = await api.get("/api/auth/attendance");
      return respone.data;
    }catch(error){
      throw  error.respone?.data || error.message
    }
  },
  // Add student manually
  addStudentManual: async (studentData) => {
    try {
      const response = await api.post("/api/admin/add-student-manual", studentData)
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },
   addStudentsBulk: async (studentsData) => {
    try {
      const response = await api.post(`/api/admin/add-students-bulk`, { students: studentsData },)
      return response.data;
    } catch (error) {
      console.error('Error adding bulk students:', error);
      throw error;
    }
  }

  
  
};
