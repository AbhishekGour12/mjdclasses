"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import * as XLSX from "xlsx"; // <-- IMPORTANT

export default function AttendanceManagement({ attendance }) {
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // FILTERED DATA
  const filteredAttendance = attendance?.filter((record) => {
    const name = record?.name?.toLowerCase() || "";
    const grade = record?.grade?.toLowerCase() || "";
    const recordDate = new Date(record.date).toLocaleDateString("en-CA");

    return (
      name.includes(searchName.toLowerCase()) &&
      grade.includes(searchClass.toLowerCase()) &&
      (searchDate === "" || recordDate === searchDate)
    );
  });

  // ============================================================
  // 📤 EXPORT TO EXCEL FUNCTION
  // ============================================================
  const exportToExcel = () => {
    const exportData = filteredAttendance.map((r) => ({
      Name: r.name,
      Class: r.grade,
      Date: new Date(r.date).toLocaleDateString("en-CA"),
      Login_Time: r.loginTime
        ? new Date(r.loginTime).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "—",
      Logout_Time: r.logoutTime
        ? new Date(r.logoutTime).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "—",
      Duration: r.duration || "—",
      Status: r.status,
    }));

    // Create sheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // Download file
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };

  // ============================================================

  return (
    <motion.div
      key="attendance"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Records</h1>
          <p className="text-gray-600">
            Track student login, logout, and attendance data
          </p>
        </div>

        {/* 📤 EXPORT BUTTON */}
        <button
          onClick={exportToExcel}
          className="px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all"
        >
          Export Excel ⬇️
        </button>
      </div>

      {/* ========================= FILTERS ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Student Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="text"
          placeholder="Search by Class"
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* ========================= TABLE ========================= */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Login</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Logout</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-purple-900 uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredAttendance?.length > 0 ? (
                filteredAttendance.map((record, index) => (
                  <motion.tr
                    key={record._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-purple-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {record.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">{record.grade}</td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(record.date).toLocaleDateString("en-CA")}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.loginTime
                        ? new Date(record.loginTime).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.logoutTime
                        ? new Date(record.logoutTime).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.duration || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No matching attendance records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
