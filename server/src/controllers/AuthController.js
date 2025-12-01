import User from "../model/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from "../model/Student.js";
import Attendance from "../model/Attendance.js";
import ContactMessage from "../middleware/email.js";
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET|| "123456", {
        expiresIn: '1h',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { name, email, password, classes, stream, number } = req.body;
    console.log(name, password,  classes, number)
    try {
        if (!name || !email || !password ) {
            return res.status(400).json({ success: false, message: 'Please enter all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)
        const user = new User({
            name,
            email,
            password: hashPassword,
            classes,
            stream: stream ? stream : '',
            phone: number
        })
        await user.save();
        const obj = new Student({
            name,
            email,
            grade: classes,
            stream: stream ? stream : '',
            phone: number,


        })
        await obj.save()
        if (user) {
            res.status(201).json({
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                   
                },
                message: 'register successfully'
            });

        } else {
            res.json({ message: 'Invalid user data' });
        }
    } catch (err) {
        res.json({  message: err.message })
        console.log(err.message)
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
 const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const io = req.io;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email address" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Attendance only for students
    if (user.role === "user") {
      const student = await Student.findOne({ email });

      if (student) {
        
        // Normalize today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find today's attendance
        let existingAttendance = await Attendance.findOne({
          student: student._id,
          date: today,     // MATCH ONLY THIS DATE
        });

        if (!existingAttendance) {
          // First login today → Create Present attendance
          existingAttendance = await Attendance.create({
            student: student._id,
            grade: student.grade,
            name: student.name,
            date: today,              // PERFECT normalized date
            status: "Present",
            loginTime: new Date(),
          });

        } else {
          // If present exists, only update loginTime
          existingAttendance.loginTime = new Date();
          // ❌ DO NOT UPDATE date - NEVER TOUCH IT
        }

        await existingAttendance.save();

        // Update student stats
student.lastLogin = new Date();
student.lastPingTime = new Date();

// ===== Calculate attendance from JOIN DATE =====

// Student join date
const joinDate = new Date(student.joinDate);
joinDate.setHours(0, 0, 0, 0);

// Today date normalized
const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

// Calculate day difference
const diffTime = Math.abs(todayDate - joinDate);
const totalPossibleDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

// Count PRESENT days in DB
student.totalPresent = await Attendance.countDocuments({
  student: student._id,
  status: "Present",
});

// Final percentage based on JOIN DATE
student.attendancePercentage = 
  (student.totalPresent / totalPossibleDays) * 100;

// Save total possible days also for dashboard
student.totalDays = totalPossibleDays;

await student.save();

        // Emit changes
        io.emit("attendance_updated", await Attendance.find());
      }
    }

    // Create JWT
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      data: {
        token,
        role: user.role,
        name: user.name,
        email: user.email,
        classes: user.classes,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};




const getUserProfile = async (req, res) =>{
    try{
       
   let token =  req.headers.authorization;
if (token.startsWith("Bearer ")) {
  token = token.split(" ")[1]; // get only actual token part
}

const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456");
 // will show { id: "...", iat: ..., exp: ... }

 // ✅ now should return decoded payload

    const result = await User.findById(decoded.id).select('-password');
    res.status(200).json({user: result});
} catch (error) {
    res.status(401).json({ success: false, message: error.message });
    console.log(error.message);
}
}

const getUsers = async (req, res) =>{
    try{
      
        const result = await Student.find();
       
        res.status(200).json(result);

    }catch(err){
        res.status(401).json({success: false, message: err.message});
    }
}

const getAttendance = async (req, res) =>{
  try{
  const response = await Attendance.find();
  console.log(response)
  if(response){
    res.status(200).json(response);
  }
}catch(err){
  res.status(401).json({success: false, message: err.message})
}
}


export const getRecentStudents = async (req, res) => {
  try {
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(4)
     

    res.json({
      success: true,
      data: recentStudents,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent students", error: err });
  }
};

export const contact = async (req, res) =>{
  try{
    const { name, email, phone, subject, message } = req.body;

const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background: #f7f7ff;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">

      <h2 style="color: #5a2ec2; text-align: center; margin-bottom: 10px;">
        📩 New Inquiry from MGD Coaching Classes
      </h2>

      <p style="font-size: 16px; color: #333;">
        Hello Admin,  
        <br><br>
        You have received a new contact request from your website.
      </p>

      <div style="margin-top: 20px;">
        <h3 style="color: #5a2ec2; margin-bottom: 10px;">🧑 User Details</h3>
        
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

      <div>
        <h3 style="color: #5a2ec2; margin-bottom: 10px;">📘 Subject</h3>
        <p style="font-size: 15px;">${subject}</p>
      </div>

      <div style="margin-top: 20px;">
        <h3 style="color: #5a2ec2; margin-bottom: 10px;">💬 Message</h3>
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          ${message}
        </p>
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

      <p style="text-align: center; color: #6c6c6c; font-size: 13px;">
        © ${new Date().getFullYear()} MGD Coaching Classes. All Rights Reserved.
      </p>

    </div>
  </div>
`;
  await ContactMessage(email, subject,  htmlContent);
  res.status(200).json({success: true, message: "Thank you for contacting MGD Coaching Classes! We have received your message. Our team will get in touch with you shortly."})
          
  }catch(err){
    console.log(err.message)
    res.status(400).json({success: false, message: err.message});
  }
};



export { registerUser, loginUser, getUserProfile, getUsers, getAttendance };
