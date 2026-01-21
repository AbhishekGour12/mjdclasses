// components/Admin/AddStudents.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaUpload, FaFileExcel, FaDownload, FaTimes } from "react-icons/fa";
import * as XLSX from "xlsx";
import { studentAPI } from "../../lib/student";

const AddStudents = ({ classes, onStudentsAdded }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Manual form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    grade: "",
    stream: "",
    payment: false
  });

  // Excel state
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");

  // Handle manual form submission
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await studentAPI.addStudentManual(formData);
      if (response.success) {
        setSuccess("Student added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          grade: "",
          stream: "",
          payment: false
        });
        // Callback to update parent
        onStudentsAdded([response.data]);
      } else {
        setError(response.message || "Failed to add student");
      }
    } catch (err) {
      setError("An error occurred while adding student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Excel file upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Validate and format the data
      const formattedData = jsonData.map((row, index) => ({
        id: index + 1,
        name: row.Name || row.name || "",
        email: row.Email || row.email || "",
        phone: row.Phone || row.phone || row.PhoneNumber || "",
        grade: row.Grade || row.grade || row.Class || "",
        stream: row.Stream || row.stream || "",
        password: row.Password || row.password || generatePassword(),
        payment: row.Payment ? row.Payment.toString().toLowerCase() === "true" : false
      }));

      setExcelData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle Excel data submission
  const handleExcelSubmit = async () => {
    if (excelData.length === 0) {
      setError("Please upload an Excel file first");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await studentAPI.addStudentsBulk(excelData);
      if (response.success) {
        setSuccess(`Successfully added ${response.data.addedCount} students!`);
        setExcelData([]);
        setFileName("");
        // Callback to update parent
        onStudentsAdded(response.data.students || []);
      } else {
        setError(response.message || "Failed to add students");
      }
    } catch (err) {
      setError("An error occurred while adding students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate random password
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  // Download Excel template
  const downloadTemplate = () => {
    const templateData = [
      {
        Name: "John Doe",
        Email: "john@example.com",
        Phone: "9876543210",
        Grade: "10",
        Stream: "Science",
        Password: "password123",
        Payment: "true"
      },
      {
        Name: "Jane Smith",
        Email: "jane@example.com",
        Phone: "9876543211",
        Grade: "11",
        Stream: "Commerce",
        Password: "password456",
        Payment: "false"
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Student_Template.xlsx");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaUserPlus className="text-purple-600" />
              Add Students
            </h2>
            <p className="text-gray-600">Add students manually or upload Excel file</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "manual" 
              ? "text-purple-600 border-b-2 border-purple-600" 
              : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Entry
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "excel" 
              ? "text-purple-600 border-b-2 border-purple-600" 
              : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("excel")}
          >
            Excel Upload
          </button>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Manual Form Tab */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="student@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="9876543210"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Set password"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Students will use this password to login
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class/Grade *
                </label>
                <select
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Grade</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.grade}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stream (Optional)
                </label>
                <input
                  type="text"
                  value={formData.stream}
                  onChange={(e) => setFormData({...formData, stream: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Science, Commerce, Arts"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="payment"
                checked={formData.payment}
                onChange={(e) => setFormData({...formData, payment: e.target.checked})}
                className="h-4 w-4 text-purple-600 rounded"
              />
              <label htmlFor="payment" className="text-sm text-gray-700">
                Payment Completed
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </form>
        )}

        {/* Excel Upload Tab */}
        {activeTab === "excel" && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <FaFileExcel className="text-green-600 text-4xl mx-auto mb-4" />
                <h3 className="font-medium text-gray-700 mb-2">Upload Excel File</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload Excel file with student data. Download template for correct format.
                </p>
                
                <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-3 inline-flex items-center gap-2 hover:bg-gray-50">
                  <FaUpload />
                  {fileName ? `Selected: ${fileName}` : "Choose Excel File"}
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={downloadTemplate}
                  className="mt-4 ml-4 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1 mx-auto"
                >
                  <FaDownload />
                  Download Template
                </button>
              </div>
            </div>

            {/* Preview Excel Data */}
            {excelData.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-3">
                  Preview ({excelData.length} students found)
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stream</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {excelData.slice(0, 5).map((student) => (
                        <tr key={student.id}>
                          <td className="px-4 py-3 text-sm">{student.name}</td>
                          <td className="px-4 py-3 text-sm">{student.email}</td>
                          <td className="px-4 py-3 text-sm">{student.phone}</td>
                          <td className="px-4 py-3 text-sm">{student.grade}</td>
                          <td className="px-4 py-3 text-sm">{student.stream}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {excelData.length > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      ... and {excelData.length - 5} more students
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleExcelSubmit}
                disabled={loading || excelData.length === 0}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? "Processing..." : "Upload Students"}
              </button>
              
              {excelData.length > 0 && (
                <button
                  onClick={() => {
                    setExcelData([]);
                    setFileName("");
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <FaTimes />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AddStudents;