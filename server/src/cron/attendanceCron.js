import cron from "node-cron";
import StudentModel from "../model/Student.js";
import AttendanceModel from "../model/Attendance.js";

// 🕛 Run every day at 12:00 AM
const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const dailyAttendanceJob = () => {
  cron.schedule(
    "5 0 * * *", // Runs at 12:05 AM IST
    async () => {
      console.log("📅 Running DAILY attendance cron...");

      try {
        const today = normalizeDate(new Date());
        const students = await StudentModel.find();

        for (const student of students) {
          // Check if today's attendance exists
          const existing = await AttendanceModel.findOne({
            student: student._id,
            date: today,
          });

          // If no login then mark ABSENT
          if (!existing) {
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
        }

        console.log("✅ Daily attendance cron completed.");
      } catch (err) {
        console.error("❌ Daily cron error:", err);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};


export const weeklyAttendanceJob = () => {
  cron.schedule(
    "0 1 * * 1", // every Monday 1AM IST
    async () => {
      console.log("📊 Running WEEKLY attendance cron...");

      try {
        const students = await StudentModel.find();
        const today = normalizeDate(new Date());

        for (const student of students) {
          const joinDate = normalizeDate(student.joinDate);
          const diffTime = Math.abs(today - joinDate);
          const totalPossibleDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const presentCount = await AttendanceModel.countDocuments({
            student: student._id,
            status: "Present",
            date: { $gte: joinDate, $lte: today },
          });

          const attendancePercentage =
            (presentCount / totalPossibleDays) * 100;

          await StudentModel.findByIdAndUpdate(student._id, {
            totalPresent: presentCount,
            totalDays: totalPossibleDays,
            attendancePercentage: attendancePercentage.toFixed(2),
          });
        }

        console.log("✅ Weekly attendance update completed.");
      } catch (error) {
        console.error("❌ Weekly cron error:", error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};

