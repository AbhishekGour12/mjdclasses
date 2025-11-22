import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
    },
    phone:{
        type: Number,
        required: true
    },
    // SYSTEM PREFERENCES
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      twoFactorAuth: { type: Boolean, default: false },
      autoBackup: { type: Boolean, default: true },
    },

    // Optional: admin image
    avatar: {
      type: String,
      default: "",
    },

    // Optional: Last login tracking
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
