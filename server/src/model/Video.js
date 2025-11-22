import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  youtubeLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "Educational video lecture"
  },
  duration: String,
  views: {
    type: Number,
    default: 0,
  },
  uploadDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  isFeatured:{
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
