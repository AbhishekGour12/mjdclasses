import cron from "node-cron";
import StudentModel from "../model/Student.js";
import AttendanceModel from "../model/Attendance.js";

// 🕛 Run every day at 12:00 AM
export const dailyAttendanceJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("📅 Running daily attendance cron job...");

    try {
      // Normalize date -> 00:00:00
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const students = await StudentModel.find();

      for (const student of students) {
        
        // Check if attendance already created (Present/Absent)
        const existing = await AttendanceModel.findOne({
          student: student._id,
          date: today
        });

        if (!existing) {
          // Student never logged in => Mark Absent
          await AttendanceModel.create({
            student: student._id,
            grade: student.grade,
            name: student.name,
            date: today,
            status: "Absent",
            loginTime: null,
            logoutTime: null,
            duration: "0 minutes",
          });
        }

        // Now update attendance statistics
        const totalDays = await AttendanceModel.countDocuments({
          student: student._id
        });

        const totalPresent = await AttendanceModel.countDocuments({
          student: student._id,
          status: "Present"
        });

        const attendancePercentage =
          totalDays === 0 ? 0 : (totalPresent / totalDays) * 100;

        await StudentModel.findByIdAndUpdate(student._id, {
          totalDays,
          totalPresent,
          attendancePercentage
        });
      }

      console.log("✅ Daily attendance job completed successfully.");
    } catch (error) {
      console.error("❌ Cron job error:", error);
    }
  });
};



export const weeklyAttendanceJob = () =>{
// Weekly Cron Job: runs every Monday at 1 AM
cron.schedule("0 1 * * 1", async () => {
  console.log("Weekly attendance percentage calculation started...");

  try {
    const students = await StudentModel.find();

    // 365 days range
    const today = new Date();
    const past365 = new Date(today);
    past365.setDate(today.getDate() - 365);

    for (const student of students) {
      // Count how many PRESENT days in last 365 days
      const presentCount = await AttendanceModel.countDocuments({
        student: student._id,
        status: "Present",
        date: { $gte: past365, $lte: today }
      });

      // Fixed denominator = 365 days
      const attendancePercentage = (presentCount / 365) * 100;

      student.totalPresent = presentCount;
      student.attendancePercentage = attendancePercentage.toFixed(2);

      await student.save();
    }

    console.log("Weekly attendance update completed successfully.");
  } catch (error) {
    console.error("Error updating weekly attendance:", error);
  }
});
}
