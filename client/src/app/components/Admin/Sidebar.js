"use client"
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaSignOutAlt, FaTimes } from "react-icons/fa";
import * as Icons from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, navigationItems, admin }) {
  const router = useRouter()
  const logout = () =>{
    localStorage.removeItem("admin");
    router.push("/AdminLogin")
  }
  return (
    <motion.div 
      initial={false}
      animate={{ 
        x: sidebarOpen ? 0 : -320 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-purple-800 to-indigo-900 shadow-2xl lg:static lg:z-auto lg:inset-0 lg:translate-x-0"
    >
      <div className="flex items-center justify-between h-20 px-6 bg-purple-900/50">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <FaGraduationCap className="text-purple-600 text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{admin?admin.name:''}</h1>
            <p className="text-purple-200 text-sm">Management Panel</p>
          </div>
        </motion.div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white hover:text-purple-200 transition-colors"
        >
          <FaTimes />
        </button>
      </div>
      
      <nav className="mt-8 px-4">
        {navigationItems.map((item, index) => {
          const IconComponent = Icons[item.icon];
          return (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center px-4 py-4 text-left rounded-2xl mb-2 transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-white/20 text-white shadow-lg border-l-4 border-white"
                  : "text-purple-100 hover:bg-white/10 hover:translate-x-2"
              }`}
            >
              <IconComponent className={`mr-4 text-lg ${activeTab === item.id ? 'text-white' : 'text-purple-300'}`} />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 w-full p-6 border-t border-purple-700/50"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-white font-medium">Admin User</p>
            <p className="text-purple-200 text-xs">Administrator</p>
          </div>
        </div>
        <button className="flex items-center w-full px-4 py-2 text-purple-100 hover:bg-white/10 rounded-xl transition-colors" onClick={logout}>
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
}