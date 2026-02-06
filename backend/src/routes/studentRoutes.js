import express from 'express';
import studentController from '../controllers/studentController.js';

const router = express.Router();

// GET all students and POST new student
router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

// GET, PUT, DELETE single student
router
  .route('/:id')
  .get(studentController.getStudent)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);

export default router;
