import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoutes.js";
import classRoutes from "./routes/ClassRoutes.js";
import videoRoutes from "./routes/VideoRoutes.js";

import http from "http";
import { Server } from "socket.io";
import dashboardRoutes from "./routes/DashboardRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js"
import path from "path";
import { dailyAttendanceJob, weeklyAttendanceJob } from "./cron/attendanceCron.js";

const app = express();
const server = http.createServer(app);

// ✅ 1. CORS MUST BE FIRST
app.use(
  cors({
    origin: ["https://mjdclasses.in", "https://www.mjdclasses.in", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cors())
// Socket.io config
const io = new Server(server, {
  cors: {
    origin: ["https://mjdclasses.in", "https://www.mjdclasses.in", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());

connectDB();
// Socket.io add in req
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes)

//daly Attendance update
 dailyAttendanceJob()

//WeeklyAttendance update
weeklyAttendanceJob()
// Server listen
server.listen(process.env.PORT || 5000, () => {
  console.log(`listen port ${process.env.PORT}`);
});
