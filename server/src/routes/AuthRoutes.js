import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  getAttendance,
  getRecentStudents,
  contact,

 
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:token", getUserProfile);
router.get("/students", getUsers);
router.get("/attendance", getAttendance);
router.get("/recent", getRecentStudents);
router.post("/contact", contact)

 // for admin

export default router;
