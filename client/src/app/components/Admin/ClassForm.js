import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClassForm({ editingClass, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    grade: "",
    className: "",
    subjects: [],
  });

  // ------------------------------------------
  //    DYNAMIC GRADES & SUBJECTS
  // ------------------------------------------
  const [availableGrades, setAvailableGrades] = useState([
    { value: "1", label: "Grade 1" },
    { value: "2", label: "Grade 2" },
    { value: "3", label: "Grade 3" },
    { value: "4", label: "Grade 4" },
    { value: "5", label: "Grade 5" },
    { value: "6", label: "Grade 6" },
    { value: "7", label: "Grade 7" },
    { value: "8", label: "Grade 8" },
    { value: "9", label: "Grade 9" },
    { value: "10", label: "Grade 10" },
    { value: "11", label: "Grade 11" },
    { value: "12", label: "Grade 12" },
  ]);

  const [availableSubjects, setAvailableSubjects] = useState([
    "Hindi",
    "English",
    "Mathematics",
    "Science",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "Sanskrit",
    "English Grammar",
    "General Knowledge",
    "Moral Science",
    "Computer Science",
    "Economics",
    "History",
    "Geography",
    "Civics",
    "Environmental Science",
  ]);

  const [newGrade, setNewGrade] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
  if (editingClass) {
    setFormData({
      grade: editingClass.grade || "",
      className: editingClass.className || "",
      subjects: Array.isArray(editingClass.subjects) ? editingClass.subjects : [],
    });

    setSelectedSubjects(
      Array.isArray(editingClass.subjects) ? editingClass.subjects : []
    );
  } else {
    setSelectedSubjects([]);
  }
}, [editingClass]);


  // ------------------------------------------
  //    ADD NEW GRADE
  // ------------------------------------------
  const handleAddGrade = () => {
  if (!newGrade.trim()) return alert("Enter grade name");

  // Use the grade itself as value
  const gradeValue = newGrade.trim();

  // Check duplicate
  if (availableGrades.some((g) => g.value.toLowerCase() === gradeValue.toLowerCase())) {
    alert("This grade already exists!");
    return;
  }

  setAvailableGrades((prev) => [
    ...prev,
    { value: gradeValue, label: newGrade }
  ]);

  setNewGrade("");
};


  // ------------------------------------------
  //    ADD NEW SUBJECT
  // ------------------------------------------
  const handleAddSubject = () => {
    if (!newSubject.trim()) return alert("Enter a subject");

    if (availableSubjects.includes(newSubject)) {
      alert("Subject already exists!");
      return;
    }

    setAvailableSubjects((prev) => [...prev, newSubject]);
    setNewSubject("");
  };

  // ------------------------------------------
  //    SELECT SUBJECT TOGGLE
  // ------------------------------------------
  const handleSubjectToggle = (subject) => {
    const updated = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(updated);
    setFormData((prev) => ({ ...prev, subjects: updated }));
  };

  // ------------------------------------------
  //    SUBMIT FORM
  // ------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubjects.length) {
      alert("Select at least one subject");
      return;
    }
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {editingClass ? "Edit Class" : "Add New Class"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ------------------ GRADE INPUT ------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Grade
            </label>
            <select
              required
              value={formData.grade}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, grade: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            >
              <option value="">Select Grade</option>
              {availableGrades.map((grade) => (
                <option key={grade.value} value={grade.value}>
                  {grade.label}
                </option>
              ))}
            </select>

            {/* ADD NEW GRADE */}
            <div className="flex mt-3 space-x-2">
              <input
                type="text"
                placeholder="Add new grade"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddGrade}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl"
              >
                Add
              </button>
            </div>
          </div>

          {/* ------------------ CLASS NAME ------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Name
            </label>
            <input
              type="text"
              required
            value={formData.className}

              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  className: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* ------------------ SUBJECT LIST ------------------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border p-3 rounded-xl max-h-60 overflow-y-auto">
              {availableSubjects.map((sub) => (
                <label key={sub} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(sub)}
                    onChange={() => handleSubjectToggle(sub)}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>

            {/* ADD NEW SUBJECT */}
            <div className="flex mt-3 space-x-2">
              <input
                type="text"
                placeholder="Add new subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
              >
                Add
              </button>
            </div>
          </div>

          {/* ------------------ BUTTONS ------------------ */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-xl"
            >
              {editingClass ? "Update Class" : "Add Class"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
