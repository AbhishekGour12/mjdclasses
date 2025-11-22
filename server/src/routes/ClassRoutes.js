import express from "express";
import {
  addClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  getClassByGrade
} from "../controllers/ClassController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", addClass);
router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.get("/grade/:grade", protect, getClassByGrade);  // ✅ <-- ADD THIS ROUTE
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
