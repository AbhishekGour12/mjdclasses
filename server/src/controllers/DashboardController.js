import Class from "../model/Class.js";
import Student from "../model/Student.js";
import Video from "../model/Video.js";
export const getDashboardStats = async (req, res) => {
  try {
    const totalClasses = await Class.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalVideos = await Video.countDocuments();

    const students = await Student.find();

    // If no students, attendance = 0
    if (students.length === 0) {
      return res.json({
        success: true,
        data: {
          totalClasses,
          totalStudents,
          totalVideos,
          averageAttendance: 0,
        },
      });
    }

    // ⬅️ Average attendance calculation (correct)
    let totalPercentage = 0;

    students.forEach(student => {
      totalPercentage += student.attendancePercentage ?? 0;
    });

    const averageAttendance = totalPercentage / students.length;

    res.json({
      success: true,
      data: {
        totalClasses,
        totalStudents,
        totalVideos,
        averageAttendance: Math.round(averageAttendance),
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: err });
  }
};
