import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/AdminController.js';
import { addStudentManual, addStudentsBulk, getAllStudents, updateStudent, deleteStudent, getStudentById } from '../controllers/AdminController.js';
const router = express.Router();

router.post("/register", registerAdmin);
router.post('/signin', loginAdmin );
router.post('/add-student-manual',  addStudentManual);
router.post('/add-students-bulk',  addStudentsBulk);
router.get('/students',  getAllStudents);
router.get('/students/:id',  getStudentById);
router.put('/students/:id',  updateStudent);
router.delete('/students/:id',  deleteStudent);
export default router;