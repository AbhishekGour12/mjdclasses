"use client";
import React, { useState } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import { IoIosStar } from "react-icons/io";
import { FiPlay } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoFilter } from "@/app/lib/useVideoFilter";

export default function PopularClasses() {
  const { videos, loading } = useVideoFilter({ isFeatured: true });
  const [activeVideo, setActiveVideo] = useState(null);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-600 text-lg animate-pulse">Loading featured videos...</p>
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto py-10 " id="popularclasses">
      <div className="text-center mb-10">
        <h1 className="text-xl mb-3 font-semibold">Explore Programs</h1>
        <h1 className="text-purple-600 text-3xl font-semibold mb-4">
          Our Most Popular Classes
        </h1>
        <p className="text-[#667085] text-lg">
          Watch our featured lectures – the most loved lessons by students.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>No featured videos available yet.</p>
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={25}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {videos.map((video) => {
            const videoId = getYouTubeId(video.youtubeLink);
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : "/courseImg1.jpg";

            return (
              <SwiperSlide key={video._id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  {/* Thumbnail / Video */}
                  <div className="relative group">
                    {activeVideo === video._id ? (
                      <YouTube
                        videoId={videoId}
                        opts={{
                          width: "100%",
                          height: "200",
                          playerVars: { autoplay: 1 },
                        }}
                      />
                    ) : (
                      <Image
                        src={thumbnail}
                        alt={video.title}
                        width={500}
                        height={280}
                        className="w-full object-cover cursor-pointer"
                        onClick={() => setActiveVideo(video._id)}
                      />
                    )}

                    {/* Play Icon Overlay */}
                    {activeVideo !== video._id && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                        onClick={() => setActiveVideo(video._id)}
                      >
                        <FiPlay className="text-white text-5xl" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h5 className="text-purple-600 font-semibold text-sm mb-1 uppercase">
                      {video.subject}
                    </h5>
                    <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {video.description || "No description provided."}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex gap-2 items-center">
                        <IoIosStar className="text-[#FF9B26]" />
                        <span>{video.classId?.className || "Unknown Class"}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>⏱ {video.duration || "N/A"}</span>
                        <span>👁 {video.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {/* Video Modal for Full View */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-black rounded-xl overflow-hidden w-[90%] md:w-[70%] aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1"
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
                  playerVars: { autoplay: 1 },
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
