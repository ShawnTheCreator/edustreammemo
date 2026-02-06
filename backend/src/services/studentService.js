import Student from '../models/Student.js';
import AppError from '../utils/AppError.js';

/**
 * Student Service Layer
 * Contains pure business logic for student operations
 */
class StudentService {
  /**
   * Get all students
   * Uses .lean() for better performance on read operations
   */
  async getAllStudents() {
    console.log('[Service] Fetching all students from database...');
    const students = await Student.find()
      .select('-__v')
      .lean()
      .sort({ createdAt: -1 });
    
    console.log('[Service] Found', students.length, 'students in database');
    if (students.length > 0) {
      console.log('[Service] First student:', students[0].firstName, students[0].lastName);
    }
    
    return students.map(student => ({
      ...student,
      id: student._id.toString(),
      enrollmentDate: student.enrollmentDate.toISOString().split('T')[0]
    }));
  }

  /**
   * Get single student by ID
   */
  async getStudentById(id) {
    const student = await Student.findById(id)
      .select('-__v')
      .lean();
    
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    return {
      ...student,
      id: student._id.toString(),
      enrollmentDate: student.enrollmentDate.toISOString().split('T')[0]
    };
  }

  /**
   * Create new student
   * Validates for duplicate email
   */
  async createStudent(studentData) {
    // Check for existing email
    const existingStudent = await Student.findOne({ email: studentData.email });
    if (existingStudent) {
      throw new AppError('A student with this email already exists', 400);
    }

    const student = await Student.create(studentData);
    
    return {
      id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      major: student.major,
      enrollmentDate: student.enrollmentDate.toISOString().split('T')[0],
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }

  /**
   * Update existing student
   */
  async updateStudent(id, updateData) {
    // If email is being updated, check for duplicates
    if (updateData.email) {
      const existingStudent = await Student.findOne({ 
        email: updateData.email,
        _id: { $ne: id }
      });
      
      if (existingStudent) {
        throw new AppError('A student with this email already exists', 400);
      }
    }

    const student = await Student.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!student) {
      throw new AppError('Student not found', 404);
    }

    return {
      id: student._id.toString(),
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      major: student.major,
      enrollmentDate: student.enrollmentDate.toISOString().split('T')[0],
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }

  /**
   * Delete student
   */
  async deleteStudent(id) {
    const student = await Student.findByIdAndDelete(id);
    
    if (!student) {
      throw new AppError('Student not found', 404);
    }

    return { message: 'Student deleted successfully' };
  }
}

export default new StudentService();
