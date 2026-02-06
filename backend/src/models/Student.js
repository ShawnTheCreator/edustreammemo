import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(value) {
        return /^\S+@\S+\.\S+$/.test(value);
      },
      message: 'Please enter a valid email address'
    }
  },
  major: {
    type: String,
    required: [true, 'Major is required'],
    trim: true,
    minlength: [2, 'Major must be at least 2 characters'],
    maxlength: [100, 'Major cannot exceed 100 characters']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Inactive'],
      message: 'Status must be either Active or Inactive'
    },
    default: 'Active'
  }
}, {
  timestamps: true,
  versionKey: false
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
