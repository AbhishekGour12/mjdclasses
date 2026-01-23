
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import Student from "../model/Student.js";
import User from "../model/User.js";

export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;
    console.log(fullName)

    // Validate fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await Admin.create({
      fullName,
      email,
      password: hashedPassword,
      phone: phone
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        preferences: newAdmin.preferences,
      },
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check all fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password are required" });
    }

    // Check if user exists
    const user = await Admin.findOne({ email:email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "123456",
      { expiresIn: "7d" }
    );

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
       
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};




// Add single student manually
export const addStudentManual = async (req, res) => {
  try {
    const { name, email, phone, password, grade, stream, payment } = req.body;

    // Validation
    if (!name || !email || !phone || !password || !grade) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone.toString(),
      classes: grade,
      stream: stream || '',
      role: 'user',
      payment: payment || false
    });

    await user.save();

    // Create Student record
    const student = new Student({
      name,
      email,
      grade,
      stream: stream || '',
      phone: phone.toString(),
      userId: user._id
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          class: user.classes,
          stream: user.stream,
          payment: user.payment
        },
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
          grade: student.grade
        }
      }
    });

  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add multiple students via Excel
export const addStudentsBulk = async (req, res) => {
  try {
    const { students } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No student data provided'
      });
    }

    const addedStudents = [];
    const errors = [];

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      
      try {
        // Validate required fields
        if (!student.name || !student.email || !student.grade) {
          errors.push({
            row: i + 1,
            error: 'Missing required fields (name, email, grade)'
          });
          continue;
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: student.email });
        if (existingUser) {
          errors.push({
            row: i + 1,
            email: student.email,
            error: 'User already exists'
          });
          continue;
        }

        // Generate password if not provided
        const password = student.password || generateRandomPassword();

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({
          name: student.name,
          email: student.email,
          password: hashedPassword,
          phone: student.phone?.toString() || '',
          classes: student.grade,
          stream: student.stream || '',
          role: 'user',
          payment: student.payment || false
        });

        await user.save();

        // Create Student record
        const studentRecord = new Student({
          name: student.name,
          email: student.email,
          grade: student.grade,
          stream: student.stream || '',
          phone: student.phone?.toString() || '',
          userId: user._id
        });

        await studentRecord.save();

        addedStudents.push({
          name: user.name,
          email: user.email,
          grade: user.classes,
          password: password // Send generated password for reference
        });

      } catch (error) {
        errors.push({
          row: i + 1,
          email: student.email,
          error: error.message
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `Added ${addedStudents.length} students successfully`,
      data: {
        addedCount: addedStudents.length,
        errorCount: errors.length,
        students: addedStudents,
        errors: errors.length > 0 ? errors : undefined
      }
    });

  } catch (error) {
    console.error('Error in bulk student addition:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Helper function to generate random password
const generateRandomPassword = () => {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Get all students (for reference)
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    // Get user data
    const user = await User.findById(id).select('-password');
    
    if (!user || user.role !== 'user') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get student academic data
    const student = await Student.findOne({ userId: id });
    
    // Get attendance records (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentAttendance = await Attendance.find({
      studentId: id,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    // Calculate statistics
    const totalClasses = student?.totalClasses || 0;
    const attendedClasses = student?.attendedClasses || 0;
    const attendancePercentage = totalClasses > 0 
      ? Math.round((attendedClasses / totalClasses) * 100)
      : 0;

    // Get performance data (if you have assessments/exams)
    const performance = student?.performance || 0;

    res.json({
      success: true,
      data: {
        basicInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          class: user.classes,
          stream: user.stream,
          payment: user.payment,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin || 'Never'
        },
        academicInfo: {
          grade: student?.grade || user.classes,
          stream: student?.stream || user.stream,
          totalClasses,
          attendedClasses,
          attendancePercentage,
          performance,
          joinDate: student?.createdAt || user.createdAt
        },
        attendance: {
          recent: recentAttendance,
          stats: {
            present: recentAttendance.filter(a => a.status === 'Present').length,
            absent: recentAttendance.filter(a => a.status === 'Absent').length,
            late: recentAttendance.filter(a => a.status === 'Late').length,
            total: recentAttendance.length
          }
        }
      }
    });

  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      email, 
      phone, 
      grade, 
      stream, 
      payment,
      password,
      resetPassword 
    } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    // Find user
    const user = await User.findById(id);
    
    if (!user || user.role !== 'user') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if email is being changed and if new email already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another student'
        });
      }
    }

    // Prepare update data for User
    const userUpdateData = {};
    if (name) userUpdateData.name = name;
    if (email) userUpdateData.email = email;
    if (phone) userUpdateData.phone = phone.toString();
    if (grade) userUpdateData.classes = grade;
    if (stream !== undefined) userUpdateData.stream = stream;
    if (payment !== undefined) userUpdateData.payment = payment;

    // Handle password reset
    if (resetPassword === true) {
      const newPassword = generateRandomPassword();
      userUpdateData.password = await bcrypt.hash(newPassword, 10);
    } else if (password) {
      userUpdateData.password = await bcrypt.hash(password, 10);
    }

    // Update User
    const updatedUser = await User.findByIdAndUpdate(
      id,
      userUpdateData,
      { new: true, runValidators: true }
    ).select('-password');

    // Prepare update data for Student
    const studentUpdateData = {};
    if (name) studentUpdateData.name = name;
    if (email) studentUpdateData.email = email;
    if (phone) studentUpdateData.phone = phone.toString();
    if (grade) studentUpdateData.grade = grade;
    if (stream !== undefined) studentUpdateData.stream = stream;

    // Update Student record if exists, create if doesn't
    await Student.findOneAndUpdate(
      { userId: id },
      studentUpdateData,
      { upsert: true, new: true, runValidators: true }
    );

    // Prepare response
    const response = {
      success: true,
      message: 'Student updated successfully',
      data: {
        student: updatedUser,
        passwordReset: resetPassword === true ? generateRandomPassword() : undefined
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteRelatedData } = req.query; // Optional: delete attendance, payments etc.

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID'
      });
    }

    // Find user
    const user = await User.findById(id);
    
    if (!user || user.role !== 'user') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Start transaction for atomic operations
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete user
      await User.findByIdAndDelete(id).session(session);

      // Delete student record
      await Student.findOneAndDelete({ userId: id }).session(session);

      // Optionally delete related data
      if (deleteRelatedData === 'true') {
        // Delete attendance records
        await Attendance.deleteMany({ studentId: id }).session(session);
        
        // Delete payment records (if you have a Payment model)
        // await Payment.deleteMany({ userId: id }).session(session);
        
        // Delete any other related data
      }

      await session.commitTransaction();
      session.endSession();

      res.json({
        success: true,
        message: 'Student deleted successfully',
        data: {
          deletedStudent: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        }
      });

    } catch (transactionError) {
      await session.abortTransaction();
      session.endSession();
      throw transactionError;
    }

  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// ... other CRUD operations (getStudentById, updateStudent, deleteStudent)