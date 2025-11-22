"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaYoutube,
  FaPlayCircle,
  FaEye,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";
import VideoForm from "./VideoForm";
import { useVideoFilter } from "@/app/lib/useVideoFilter";
import { videoAPI } from "@/app/lib/Video";
import io  from 'socket.io-client';


const socket = io(process.env.NEXT_PUBLIC_API_URL ,{
  transports: ["websocket"],
})
export default function VideoManagement() {
  const [videos, setVideos] = useState([]);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [isConnected, setIsConnected] = useState(false)
  const {filter} = useVideoFilter();
  const [searchTitle, setSearchTitle] = useState("");
const [searchSubject, setSearchSubject] = useState("");
const [searchClass, setSearchClass] = useState("");
const [searchDate, setSearchDate] = useState("");

  useEffect(() =>{
    socket.on('connect', ()=>{setIsConnected(true)});
    socket.on('disconnect', ()=>{setIsConnected(false)})
    socket.on('videos', (newRecord) => {
             // console.log('New attendance update received:', newRecord);
              // State ko update karein (naye record ko list mein sabse upar add karein)
              fetchVideos()
          });
  
          // ✅ IMPORTANT: Cleanup function
          // Jab component unmount ho, to listeners ko hata dein taki memory leak na ho
          return () => {
              socket.off('connect');
              socket.off('disconnect');
              socket.off('videos');
          };
      }, []); // Empty arra
      useEffect(() => {
         // console.log("Connection status:", isConnected);
      }, [isConnected]);
  // ✅ Fetch all videos from backend
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await videoAPI.getAllVideos();
      console.log(res)
      setVideos(res.data);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };
  const filteredVideos = videos?.filter((v) => {
  const matchTitle = v.title.toLowerCase().includes(searchTitle.toLowerCase());
  const matchSubject = v.subject.toLowerCase().includes(searchSubject.toLowerCase());
  const matchClass =
    v.classId?.className?.toLowerCase().includes(searchClass.toLowerCase());

  const matchDate =
    searchDate === "" ||
    v.uploadDate === searchDate ||
    new Date(v.uploadDate).toLocaleDateString("en-CA") === searchDate;

  return matchTitle && matchSubject && matchClass && matchDate;
});


  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ Handle Add / Update Video
  const handleAddVideo = async () => {
     fetchVideos(); // refresh list after saving
    setShowVideoForm(false);
    setEditingVideo(null);
  };

  // ✅ Handle Delete Video
  const handleDeleteVideo = async (id) => {
    if (confirm("Are you sure you want to delete this video?")) {
      try {
        const res = await videoAPI.deleteVideo(id);
        await fetchVideos();
      } catch (err) {
        console.error("Error deleting video:", err);
      }
    }
  };

  return (
    <motion.div
      key="videos"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Lectures</h1>
          <p className="text-gray-600">
            Manage video lectures for different classes and subjects
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingVideo(null);
            setShowVideoForm(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus className="mr-2" />
          Add New Video
        </motion.button>
      </div>

      {/* Video Form Modal */}
      <AnimatePresence>
        {showVideoForm && (
          <VideoForm
            editingVideo={editingVideo}
            onSave={handleAddVideo}
            onCancel={() => {
              setShowVideoForm(false);
              setEditingVideo(null);
            }}
            id={id}
            
          />
        )}
      </AnimatePresence>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading videos...</p>}
{/* FILTERS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-2xl shadow">
  
  {/* Search Title */}
  <input
    type="text"
    placeholder="Search by Title"
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
    className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500"
  />

  {/* Search Subject */}
  <input
    type="text"
    placeholder="Search by Subject"
    value={searchSubject}
    onChange={(e) => setSearchSubject(e.target.value)}
    className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500"
  />

  {/* Search Class */}
  <input
    type="text"
    placeholder="Search by Class (ex: 10th)"
    value={searchClass}
    onChange={(e) => setSearchClass(e.target.value)}
    className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500"
  />

  {/* Filter by Upload Date */}
  <input
    type="date"
    value={searchDate}
    onChange={(e) => setSearchDate(e.target.value)}
    className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500"
  />

</div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos?filteredVideos.map((video, index) => (

          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <FaYoutube className="text-red-500 text-2xl mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaBook className="text-blue-500" />
                      <span>{video.subject}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingVideo(video);
                      setShowVideoForm(true);
                      setId(video._id)
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteVideo(video._id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaPlayCircle className="mr-3 text-purple-500" />
                  <span>Duration: {video.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaEye className="mr-3 text-green-500" />
                  <span>{video.views?.toLocaleString()} views</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-3 text-orange-500" />
                  <span>Uploaded: {video.uploadDate}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Class:</span>{" "}
                  {video.classId?.className || "N/A"}
                </div>
              </div>

              {video.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.description}
                </p>
              )}

              <motion.a
                whileHover={{ scale: 1.02 }}
                href={video.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Watch on YouTube
              </motion.a>
            </div>
          </motion.div>
        )):''}
      </div>
    </motion.div>
  );
}
