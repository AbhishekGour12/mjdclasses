import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiPlay,
  FiClock,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiBook,
  FiCalculator,
  FiGlobe,
  FiFeather,
  FiMusic,
  FiCode,
  FiStar,
} from "react-icons/fi";

// Mock data - replace with actual API calls
const mockData = {
  userClass: "Class 6",
  subjects: [
    {
      id: 1,
      name: "Mathematics",
      icon: <FiCalculator className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      classes: [
        {
          id: 101,
          title: "Chapter 1 - Fractions",
          description: "Understanding basic fractions and their operations",
          duration: "45 min",
          thumbnail: "/math-thumb-1.jpg",
          completed: true,
          progress: 100,
        },
        {
          id: 102,
          title: "Chapter 2 - Decimals",
          description: "Working with decimal numbers and conversions",
          duration: "38 min",
          thumbnail: "/math-thumb-2.jpg",
          completed: false,
          progress: 75,
        },
        {
          id: 103,
          title: "Chapter 3 - Algebra Basics",
          description: "Introduction to algebraic expressions",
          duration: "52 min",
          thumbnail: "/math-thumb-3.jpg",
          completed: false,
          progress: 0,
        },
      ],
    },
    {
      id: 2,
      name: "Science",
      icon: <FiGlobe className="text-2xl" />,
      color: "from-blue-500 to-teal-400",
      classes: [
        {
          id: 201,
          title: "Living Organisms",
          description: "Characteristics of living things",
          duration: "40 min",
          thumbnail: "/science-thumb-1.jpg",
          completed: true,
          progress: 100,
        },
        {
          id: 202,
          title: "States of Matter",
          description: "Solid, liquid, and gas properties",
          duration: "35 min",
          thumbnail: "/science-thumb-2.jpg",
          completed: false,
          progress: 50,
        },
      ],
    },
    {
      id: 3,
      name: "English",
      icon: <FiFeather className="text-2xl" />,
      color: "from-green-500 to-blue-400",
      classes: [
        {
          id: 301,
          title: "Grammar Basics",
          description: "Parts of speech and sentence structure",
          duration: "48 min",
          thumbnail: "/english-thumb-1.jpg",
          completed: false,
          progress: 25,
        },
      ],
    },
    {
      id: 4,
      name: "Social Studies",
      icon: <FiBook className="text-2xl" />,
      color: "from-orange-500 to-red-500",
      classes: [
        {
          id: 401,
          title: "Ancient Civilizations",
          description: "Early human societies and cultures",
          duration: "55 min",
          thumbnail: "/sst-thumb-1.jpg",
          completed: false,
          progress: 0,
        },
      ],
    },
  ],
  continueWatching: [
    {
      id: 102,
      subject: "Mathematics",
      title: "Chapter 2 - Decimals",
      thumbnail: "/math-thumb-2.jpg",
      progress: 75,
      duration: "38 min",
    },
    {
      id: 202,
      subject: "Science",
      title: "States of Matter",
      thumbnail: "/science-thumb-2.jpg",
      progress: 50,
      duration: "35 min",
    },
  ],
};

const CoursePage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentClassIndex, setCurrentClassIndex] = useState(0);

  const filteredSubjects = mockData.subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            My Courses – {mockData.userClass}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Continue your learning journey with daily lessons
          </p>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search subjects or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg shadow-purple-100 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Continue Watching Section */}
        {mockData.continueWatching.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiPlay className="text-purple-600" />
              Continue Watching
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.continueWatching.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-sm text-purple-600 font-semibold">
                        {item.subject}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <FiPlay className="text-purple-600 text-xl group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiClock />
                      <span>{item.duration}</span>
                    </div>
                    <span className="text-purple-600 font-semibold">
                      Continue
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Subjects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <FiBook className="text-purple-600" />
            Your Subjects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() =>
                  setSelectedSubject(
                    selectedSubject?.id === subject.id ? null : subject
                  )
                }
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${subject.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {subject.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {subject.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {subject.classes.length} lessons available
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-semibold text-sm group-hover:underline">
                    View Classes
                  </span>
                  <motion.div
                    animate={{
                      rotate: selectedSubject?.id === subject.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowRight className="text-purple-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Subject Details Slider */}
        <AnimatePresence>
          {selectedSubject && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedSubject.color} flex items-center justify-center text-white`}
                    >
                      {selectedSubject.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedSubject.name}
                      </h2>
                      <p className="text-gray-600">
                        Explore all available classes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiArrowLeft className="text-xl text-gray-600" />
                  </button>
                </div>

                {/* Class Slider */}
                <div className="relative">
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {selectedSubject.classes.map((classItem, index) => (
                      <motion.div
                        key={classItem.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex-none w-80 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden group cursor-pointer"
                      >
                        <div className="relative">
                          {/* Thumbnail Placeholder */}
                          <div className="w-full h-48 bg-gradient-to-r from-purple-400 to-blue-400 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                <FiPlay className="text-white text-2xl ml-1" />
                              </div>
                            </div>

                            {/* Progress Overlay */}
                            {classItem.progress > 0 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                <div
                                  className={`h-full ${
                                    classItem.completed
                                      ? "bg-green-500"
                                      : "bg-purple-500"
                                  } transition-all duration-500`}
                                  style={{ width: `${classItem.progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>

                          {/* Completion Badge */}
                          {classItem.completed && (
                            <div className="absolute top-4 right-4">
                              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                                <FiCheckCircle />
                                Completed
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                            {classItem.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {classItem.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FiClock />
                              <span>{classItem.duration}</span>
                            </div>

                            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              Watch Now
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-2xl rounded-full p-3 hover:scale-110 transition-transform">
                    <FiArrowLeft className="text-xl text-gray-700" />
                  </button>
                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-2xl rounded-full p-3 hover:scale-110 transition-transform">
                    <FiArrowRight className="text-xl text-gray-700" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Video Player Page Component
const VideoPlayerPage = ({
  classItem,
  subject,
  onClose,
  onNext,
  onPrevious,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 hover:text-purple-300 transition-colors"
        >
          <FiArrowLeft />
          Back to Courses
        </button>
        <h1 className="text-xl font-bold">{classItem.title}</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Player */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Video Placeholder */}
            <div className="bg-gradient-to-br from-purple-900 to-blue-900 aspect-video rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 mx-auto">
                  <FiPlay className="text-white text-3xl ml-1" />
                </div>
                <p className="text-white text-lg">
                  Now Playing: {classItem.title}
                </p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-50 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-white">
                <button
                  onClick={onPrevious}
                  className="hover:text-purple-300 transition-colors"
                >
                  <FiArrowLeft className="text-xl" />
                </button>

                <div className="flex items-center gap-4">
                  <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                    <FiPlay className="text-white text-lg ml-1" />
                  </button>
                </div>

                <button
                  onClick={onNext}
                  className="hover:text-purple-300 transition-colors"
                >
                  <FiArrowRight className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className="w-80 bg-gray-900 text-white p-4 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">Class Playlist</h3>
          <div className="space-y-2">
            {subject.classes.map((item, index) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  item.id === classItem.id
                    ? "bg-purple-600 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <FiClock />
                      <span>{item.duration}</span>
                      {item.completed && (
                        <FiCheckCircle className="text-green-400 ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component with Routing
const App = () => {
  const [currentPage, setCurrentPage] = useState("courses");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);

  if (currentPage === "video" && currentVideo && currentSubject) {
    return (
      <VideoPlayerPage
        classItem={currentVideo}
        subject={currentSubject}
        onClose={() => setCurrentPage("courses")}
        onNext={() => {
          /* Handle next video */
        }}
        onPrevious={() => {
          /* Handle previous video */
        }}
      />
    );
  }

  return <CoursePage />;
};

export default App;
