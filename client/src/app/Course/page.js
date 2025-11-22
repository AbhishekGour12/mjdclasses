"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlay,
  FiClock,
  FiArrowLeft,
  FiBook,
  FiVideo,
} from "react-icons/fi";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { classAPI } from "../lib/class";
import Navbar from "../components/Navbar";

const CoursePage = () => {
   const user = useSelector((state) => state.auth.user);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [loading, setLoading] = useState(user?.classes ? true : false);



  const lectureRef = useRef();

  useEffect(() => {
    if (selectedSubject && lectureRef.current) {
      lectureRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [selectedSubject])
 

 useEffect(() => {
  const fetchData = async () => {
    try {
      if (!user?.classes) return;

      const response = await classAPI.getClassByGrade(user.classes);
      console.log(response)
      // ✅ Access the correct data path
      if (response.success && Array.isArray(response.data.subjects)) {
        setSubjects(response.data.subjects);
      } else {
        setSubjects([]); // fallback if something missing
      }

    } catch (err) {
      console.error("Error fetching subjects:", err);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [user]);


  const openVideo = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading courses...
        </p>
      </div>
    );

  const filteredSubjects = subjects.filter((subject) =>
    subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8"
        >
          My Courses – Class {user?.classes}
        </motion.h1>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 shadow focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Subjects */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                setSelectedSubject(
                  selectedSubject?.subject === subject.subject ? null : subject
                )
              }
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl cursor-pointer transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {subject.subject}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {subject.videos.length > 0
                  ? `${subject.videos.length} lesson${
                      subject.videos.length > 1 ? "s" : ""
                    } available`
                  : "No lessons available"}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-semibold text-sm">
                  {selectedSubject?.subject === subject.subject
                    ? "Hide Videos"
                    : "View Lessons →"}
                </span>
                <FiBook className="text-purple-600" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Videos Section */}
        <AnimatePresence>
          {selectedSubject && (
            <motion.section
              ref={lectureRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedSubject.subject}
                </h2>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition"
                >
                  <FiArrowLeft />
                  Back
                </button>
              </div>

              {selectedSubject.videos.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <FiVideo className="text-4xl mx-auto mb-3 text-gray-400" />
                  <p>No videos uploaded yet for this subject.</p>
                </div>
              ) : (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="pb-10"
                >
                  {selectedSubject.videos.map((video, index) => (
                    <SwiperSlide key={video._id || index}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
                      >
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {video.description || "No description provided."}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiClock className="text-gray-500" />
                            <span>45 min</span>
                          </div>
                          <button
                            onClick={() => openVideo(video.youtubeLink)}
                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Watch Now
                          </button>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Video Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative bg-black rounded-xl overflow-hidden w-[90%] md:w-[70%] aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
                <YouTube
                  videoId={getYouTubeId(videoUrl)}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { autoplay: 1 },
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoursePage;
