"use client";

import { studentAPI } from "../../lib/student";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function StudentsManagement() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const res = await studentAPI.getStudent();
      if (res) setStudents(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleView = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };
const exportToExcel = () => {
  if (!students || students.length === 0) return;

  // Convert students data into sheet data format
  const excelData = students.map((s, i) => ({
    "S. No.": i + 1,
    "Name": s.name,
    "Email": s.email,
    "Phone": s.phone || "N/A",
    "Grade / Class": s.grade,
    "Total Present Days": s.totalPresent || 0,
    "Total Days": s.totalDays || 0,
    "Attendance %": s.attendancePercentage?.toFixed(1) + "%" || "0%",
    "Last Login": s.lastLogin
      ? new Date(s.lastLogin).toLocaleString()
      : "—",
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  // Export
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Download file
  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "students-attendance.xlsx");
};

  return (
    <motion.div
      key="students"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Students Management
        </h1>
        <p className="text-gray-600">View and manage all registered students</p>
      </div>
<div className="flex justify-end">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={exportToExcel}
    className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all"
  >
    Export Excel
  </motion.button>
</div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students?.map((student, index) => (
                <motion.tr
                  key={student._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-purple-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${student.attendancePercentage || 0}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {student.attendancePercentage?.toFixed(1) || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastLogin
                      ? `${new Date(
                          student.lastLogin
                        ).toLocaleDateString("en-CA")}, ${new Date(
                          student.lastLogin
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                        onClick={() => handleView(student)}
                      >
                        <FaEye />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ View Student Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Student Details
              </h3>

              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>Name:</strong> {selectedStudent.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedStudent.email}
                </div>
                <div>
                  <strong>Phone:</strong> {selectedStudent.phone || "N/A"}
                </div>
                <div>
                  <strong>Grade:</strong> {selectedStudent.grade}
                </div>
                <div>
                  <strong>Total Present Days:</strong>{" "}
                  {selectedStudent.totalPresent || 0}
                </div>
                <div>
                  <strong>Total Days:</strong>{" "}
                  {selectedStudent.totalDays || 0}
                </div>
                <div>
                  <strong>Attendance %:</strong>{" "}
                  {selectedStudent.attendancePercentage?.toFixed(1) || 0}%
                </div>
                <div>
                  <strong>Last Login:</strong>{" "}
                  {selectedStudent.lastLogin
                    ? new Date(selectedStudent.lastLogin).toLocaleString()
                    : "—"}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeModal}
                  className="px-5 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
