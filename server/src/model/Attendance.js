import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },

    grade: { type: String, required: true },

    date: { 
      type: Date,
      default: () => {
        const d = new Date();
        d.setHours(0,0,0,0);
        return d;
      }
    },

    status: { type: String, enum: ["Present", "Absent"], default: "Absent" },

    name: { type: String },

    loginTime: { type: Date, default: null },

    logoutTime: { type: Date, default: null },

    duration: { type: String, default: "0 minutes" }
  },

  { timestamps: true }
);

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
