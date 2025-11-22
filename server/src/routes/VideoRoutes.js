import express from "express";
import { addVideo, getAllVideos, getVideosByClass, updateVideo, deleteVideo, getRecentVideos } from "../controllers/VideoController.js";

const router = express.Router();

router.post("/", addVideo);
router.get("/", getAllVideos);
router.get("/class/:classId", getVideosByClass);
router.put("/update/:id", updateVideo);
router.delete("/:id", deleteVideo);
router.get("/recent", getRecentVideos);
export default router;
