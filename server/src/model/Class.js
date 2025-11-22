import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Class", classSchema);
