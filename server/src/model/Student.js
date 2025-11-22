import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    grade: { type: String, required: true },
    phone: {type:Number},
    stream: {type:String},

    // ✅ Attendance fields
    attendancePercentage: { type: Number, default: 0 },
    totalPresent: { type: Number, default: 0 },
    totalDays: { type: Number, default: 0 },
    lastLogin: { type: Date },
    lastPingTime: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
