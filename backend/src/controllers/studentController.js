import studentService from '../services/studentService.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Student Controller
 * Handles HTTP requests and responses
 */
class StudentController {
  /**
   * GET /api/students
   * Get all students
   */
  getAllStudents = catchAsync(async (req, res) => {
    console.log('[Controller] getAllStudents called');
    const students = await studentService.getAllStudents();
    console.log('[Controller] Sending', students.length, 'students to frontend');
    
    res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  });

  /**
   * GET /api/students/:id
   * Get single student
   */
  getStudent = catchAsync(async (req, res) => {
    const student = await studentService.getStudentById(req.params.id);
    
    res.status(200).json({
      success: true,
      data: student
    });
  });

  /**
   * POST /api/students
   * Create new student
   */
  createStudent = catchAsync(async (req, res) => {
    const student = await studentService.createStudent(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  });

  /**
   * PUT /api/students/:id
   * Update student
   */
  updateStudent = catchAsync(async (req, res) => {
    const student = await studentService.updateStudent(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  });

  /**
   * DELETE /api/students/:id
   * Delete student
   */
  deleteStudent = catchAsync(async (req, res) => {
    await studentService.deleteStudent(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  });
}

export default new StudentController();
