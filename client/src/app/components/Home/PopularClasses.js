"use client";
import React, { useState } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import { IoIosStar, IoIosPlay } from "react-icons/io";
import { FiPlay, FiClock, FiEye, FiBook } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoFilter } from "@/app/lib/useVideoFilter";

export default function PopularClasses() {
  const { videos, loading } = useVideoFilter({ isFeatured: true });
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden" id="popularclasses">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 text-lg font-semibold bg-purple-100 px-4 py-2 rounded-full">
            Explore Programs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6 mb-4">
            Our Most <span className="text-purple-600">Popular Classes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch our featured lectures – the most loved lessons by students, designed for maximum engagement and learning outcomes.
          </p>
        </motion.div>

        {videos.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <FiBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-lg">No featured videos available yet.</p>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-70",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-purple-600 !opacity-100",
              }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-16"
            >
              {videos.map((video, index) => {
                const videoId = getYouTubeId(video.youtubeLink);
                const thumbnail = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : "/courseImg1.jpg";

                return (
                  <SwiperSlide key={video._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -10 }}
                      onHoverStart={() => setHoveredCard(video._id)}
                      onHoverEnd={() => setHoveredCard(null)}
                     className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 border border-purple-100 hover:border-purple-300 cursor-pointer 
min-h-[420px] sm:min-h-[450px] md:min-h-[480px] flex flex-col"

                    >
                      {/* Thumbnail Container */}
                      <div className="relative overflow-hidden">
                        <div className="relative h-48 bg-gradient-to-br from-purple-400 to-blue-400">
                          {videoId ? (
                            <Image
                              src={thumbnail}
                              alt={video.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiBook className="text-white text-4xl" />
                            </div>
                          )}
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Play Button */}
                          <div 
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={() => setActiveVideo(video._id)}
                          >
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl cursor-pointer">
                              <IoIosPlay className="text-white text-2xl ml-1" />
                            </div>
                          </div>

                          {/* Featured Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                              Featured
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                            {video.subject}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                          {video.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {video.description || "No description provided."}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <FiClock className="text-purple-500" />
                              <span>{video.duration || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiEye className="text-purple-500" />
                              <span>{video.views || 0}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <IoIosStar />
                            <span className="font-semibold">{video.classId?.className || "All Levels"}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full mt-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"

                          onClick={() => setActiveVideo(video._id)}
                        >
                          Watch Now
                        </motion.button>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black rounded-2xl overflow-hidden w-full max-w-4xl aspect-video relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center z-10 hover:scale-110 transition-transform shadow-2xl"
                  onClick={() => setActiveVideo(null)}
                >
                  ✕
                </button>
                <YouTube
                  videoId={getYouTubeId(
                    videos.find((v) => v._id === activeVideo)?.youtubeLink
                  )}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { 
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0
                    },
                  }}
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}