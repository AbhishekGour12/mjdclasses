"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBook, FaUsers, FaVideo, FaCalendarAlt, FaYoutube, FaEye } from "react-icons/fa";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchDashboardData = async () => {
    try {
     
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`);
    
      setStats(res.data.data)
      const student = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/recent`);
      setStudents(student.data.data)

      const videoData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/recent`);
      setVideos(videoData.data.data)
    //  const studentData = await studentRes.json();
     // const videoData = await videoRes.json();
     
      //setStats(statData.data);
     // setStudents(studentData.data);
     // setVideos(videoData.data);
     // console.log(videoData)
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    { label: "Total Classes", value: stats?.totalClasses, icon: FaBook, color: "bg-blue-500", change: "+2" },
    { label: "Total Students", value: stats?.totalStudents, icon: FaUsers, color: "bg-green-500", change: "+12" },
    { label: "Video Lectures", value: stats?.totalVideos, icon: FaVideo, color: "bg-purple-500", change: "+5" },
    { label: "Avg Attendance", value: stats?.averageAttendance + "%", icon: FaCalendarAlt, color: "bg-orange-500", change: "+3%" },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      
      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, Admin! 👋
      </motion.h1>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05, y: -5 }} className="bg-white p-6 rounded-2xl shadow-lg ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
               
              </div>
              <div className={`${stat.color} rounded-xl p-3 text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Students and Recent Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg ">
          <h3 className="font-semibold text-lg mb-4">Recent Students</h3>
          <div className="space-y-4">
            {students.map((student, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center mr-3">{student.name[0]}</div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">Class {student.grade}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{student.attendancePercentage ?? 0}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg ">
          <h3 className="font-semibold text-lg mb-4">Recent Videos</h3>
          <div className="space-y-4">
            {videos.map((video, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <FaYoutube className="text-red-500 text-xl mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{video.title}</p>
                    <p className="text-sm text-gray-600">
                      {video.classId?.className} • {video.views} views
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-600">{video.duration}</p>
                  <p className="text-xs text-gray-500">{video.uploadDate}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}
