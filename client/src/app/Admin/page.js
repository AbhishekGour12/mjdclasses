"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Admin/Sidebar";
import TopBar from "../components/Admin/Topbar";
import Dashboard from "../components/Admin/Dashboard";
import ClassesManagement from "../components/Admin/ClassesManagement";
import StudentsManagement from "../components/Admin/StudentsManagement";
import AttendanceManagement from "../components/Admin/AttendanceMangement";
import VideoManagement from "../components/Admin/VideoManagement";
import WebsiteManagement from "../components/Admin/WebsiteManagement";
import Settings from "../components/Admin/Setting";
import { studentAPI } from "../lib/student";
import io  from 'socket.io-client';
import { useRouter } from "next/navigation";
import AddStudents from "../components/Admin/AddStudents";


const socket = io("https://api.mjdclasses.in" ,{
  transports: ["websocket"],
})
// Available grades and subjects


// Demo data with new structure
const demoClasses = [
  { 
    id: 1, 
    grade: "10", 
    className: "Grade 10", 
    subjects: ["Mathematics", "Science", "English", "Social Studies", "Hindi"],
    schedule: "Mon-Fri 8:00 AM - 2:00 PM",
    students: 45,
    color: "bg-blue-500"
  },
  { 
    id: 2, 
    grade: "11", 
    className: "Grade 11 Science", 
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
    schedule: "Mon-Fri 8:00 AM - 2:00 PM",
    students: 32,
    color: "bg-green-500"
  },
  { 
    id: 3, 
    grade: "12", 
    className: "Grade 12 Commerce", 
    subjects: ["Economics", "Business Studies", "Mathematics", "English", "Accountancy"],
    schedule: "Mon-Fri 8:00 AM - 2:00 PM",
    students: 28,
    color: "bg-purple-500"
  }
];

const demoStudents = [
  { 
    id: 1, 
    name: "Aarav Sharma", 
    email: "aarav@example.com", 
    classId: 1, 
    className: "Grade 10",
    grade: "10",
    attendance: 95, 
    lastLogin: "2024-01-15 09:45", 
    avatar: "AS" 
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    email: "priya@example.com", 
    classId: 2, 
    className: "Grade 11 Science",
    grade: "11",
    attendance: 88, 
    lastLogin: "2024-01-15 14:20", 
    avatar: "PP" 
  }
];

const demoAttendance = [
  { 
    id: 1, 
    studentName: "Aarav Sharma", 
    classId: 1,
    className: "Grade 10", 
    date: "2024-01-15", 
    time: "09:45 AM", 
    status: "Present" 
  }
];

const demoVideos = [
  { 
    id: 1, 
    title: "Algebra Basics - Quadratic Equations", 
    classId: 1,
    className: "Grade 10",
    subject: "Mathematics",
    youtubeLink: "https://youtube.com/watch?v=abc123", 
    uploadDate: "2024-01-10", 
    views: 1450, 
    duration: "45:30",
    description: "Learn quadratic equations with step-by-step examples"
  },
  { 
    id: 2, 
    title: "Newton's Laws of Motion", 
    classId: 2,
    className: "Grade 11 Science",
    subject: "Physics",
    youtubeLink: "https://youtube.com/watch?v=def456", 
    uploadDate: "2024-01-12", 
    views: 890, 
    duration: "38:15",
    description: "Understanding the fundamental laws of motion"
  }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classes, setClasses] = useState(demoClasses);
  const [students, setStudents] = useState(demoStudents);
  const [videos, setVideos] = useState(demoVideos);
  
  const [admin, setAdmin] = useState();
  const [attendance, setAttendance] = useState();
  
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New student registration", time: "5 min ago", read: false },
    { id: 2, message: "Class schedule updated", time: "1 hour ago", read: false },
  ]);

  // Website settings
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: "Elite Coaching Center",
    siteDescription: "Quality Education for Bright Future",
    contactEmail: "contact@elitecoaching.com",
    phone: "+91 9876543210",
    address: "123 Education Street, Learning City, 560001",
    socialMedia: {
      facebook: "https://facebook.com/elitecoaching",
      twitter: "https://twitter.com/elitecoaching",
      instagram: "https://instagram.com/elitecoaching",
      linkedin: "https://linkedin.com/company/elitecoaching"
    },
    theme: "purple"
  });
 const  router = useRouter()
  // Close sidebar when clicking on overlay on mobile
  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 useEffect(() =>{
  let admin = localStorage.getItem("admin");
    if(!admin) router.push("/AdminLogin")
  if(localStorage.getItem("admin")){
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }
 fetchAttendace()

 },[])
 const fetchAttendace = async() =>{
     try{
     const res =  await studentAPI.getAttendance();
     if(res){
       setAttendance(res);
     }
   }catch(err){
     console.log(err.message)
   }
 
 
    }

    const [isConnected, setIsConnected] = useState(socket.connected);

 useEffect(() =>{
  socket.on('connect', ()=>{setIsConnected(true)});
  socket.on('disconnect', ()=>{setIsConnected(false)})
  socket.on('attendance_updated', (newRecord) => {
          //  console.log('New attendance update received:', newRecord);
            // State ko update karein (naye record ko list mein sabse upar add karein)
            setAttendance(newRecord);
        });

        // ✅ IMPORTANT: Cleanup function
        // Jab component unmount ho, to listeners ko hata dein taki memory leak na ho
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('attendance_updated');
        };
    }, []); // Empty arra
    useEffect(() => {
       // console.log("Connection status:", isConnected);
    }, [isConnected]);
 
  // Stats for dashboard
  const stats = {
    totalClasses: classes.length,
    totalStudents: students.length,
    totalVideos: videos.length,
    averageAttendance: Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length),
  };

  const navigationItems = [
    { id: "dashboard", name: "Dashboard", icon: "FaChartLine" },
    { id: "classes", name: "Classes", icon: "FaChalkboardTeacher" },
    { id: "students", name: "Students", icon: "FaUserGraduate" },
     { id: "add-students", name: "Add Students", icon: "FaUserPlus" }, // New tab
    { id: "attendance", name: "Attendance", icon: "FaCalendarCheck" },
    { id: "videos", name: "Video Lectures", icon: "FaVideo" },
    { id: "website", name: "Website", icon: "FaGlobe" },
    { id: "settings", name: "Settings", icon: "FaCog" },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard stats={stats} students={students} videos={videos} classes={classes} />;
      case "classes":
        return (
          <ClassesManagement 
            classes={classes} 
            setClasses={setClasses} 
          
          />
        );
      case "students":
        return <StudentsManagement students={students} classes={classes} />;
      case "add-students": // New case
        return <AddStudents classes={classes} onStudentsAdded={handleStudentsAdded} />;
      case "attendance":
        return <AttendanceManagement attendance={attendance} classes={classes} />;
      case "videos":
        return (
          <VideoManagement 
            videos={videos} 
            setVideos={setVideos} 
            classes={classes}
          />
        );
      case "website":
        return <WebsiteManagement websiteSettings={websiteSettings} setWebsiteSettings={setWebsiteSettings} />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard stats={stats} students={students} videos={videos} classes={classes} />;
    }
  };
  // Handler for when students are added
  const handleStudentsAdded = (newStudents) => {
    setStudents(prev => [...prev, ...newStudents]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigationItems={navigationItems}
        admin={admin}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Bar */}
        <TopBar 
          activeTab={activeTab}
          setSidebarOpen={setSidebarOpen}
          navigationItems={navigationItems}
          notifications={notifications}
          admin={admin}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {renderActiveTab()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}