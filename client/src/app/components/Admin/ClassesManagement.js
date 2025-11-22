"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaUsers, FaBook } from "react-icons/fa";
import ClassForm from "./ClassForm";
import { classAPI } from "@/app/lib/class";
import toast from "react-hot-toast";

export default function ClassesManagement() {
  const [classes, setClasses] = useState([]);
  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all classes from backend
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await classAPI.getAllClasses();
      
      setClasses(res);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // ✅ Add or Update Class
  const handleAddClass = async (newClass) => {
    try {
      if (editingClass) {
    
    const res =  await classAPI.updateClass(editingClass, newClass);
       if(res){
        toast.success("updated successfully")
       }
      } else {
         const res = await classAPI.addClass(newClass);
         if(res){
          toast.success(res.message);
         }
      }
     await fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
      toast.error(error.message)
    }
    setShowClassForm(false);
    setEditingClass(null);
  };

  // ✅ Delete Class
  const handleDeleteClass = async (id) => {
    if (confirm("Are you sure you want to delete this class?")) {
      try {
        await fetch(`http://localhost:5000/api/classes/${id}`, { method: "DELETE" });
        await fetchClasses();
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  return (
    <motion.div
      key="classes"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Classes Management</h1>
          <p className="text-gray-600">Manage classes and assign subjects to each class</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowClassForm(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus className="mr-2" />
          Add New Class
        </motion.button>
      </div>

      {/* Class Form Modal */}
      <AnimatePresence>
        {showClassForm && (
          <ClassForm
            editingClass={editingClass}
            onSave={handleAddClass}
            onCancel={() => {
              setShowClassForm(false);
              setEditingClass(null);
            }}
          
          />
        )}
      </AnimatePresence>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading classes...</p>}

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, index) => (
          <motion.div
            key={cls._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{cls.className}</h3>
                  <p className="text-gray-600">Grade {cls.grade}</p>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingClass(cls._id);
                      setShowClassForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteClass(cls._id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-3 text-purple-500" />
                  <span className="text-sm">{cls.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-3 text-green-500" />
                  <span className="text-sm">0 Students</span>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <FaBook className="mr-2 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">Subjects:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cls.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
