import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './src/models/Student.js';

dotenv.config();

// Sample student data
const sampleStudents = [
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@university.edu',
    major: 'Computer Science',
    enrollmentDate: new Date('2024-01-15'),
    status: 'Active'
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@university.edu',
    major: 'Electrical Engineering',
    enrollmentDate: new Date('2024-02-01'),
    status: 'Active'
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@university.edu',
    major: 'Business Administration',
    enrollmentDate: new Date('2024-01-20'),
    status: 'Active'
  },
  {
    firstName: 'James',
    lastName: 'Brown',
    email: 'james.brown@university.edu',
    major: 'Mechanical Engineering',
    enrollmentDate: new Date('2023-09-10'),
    status: 'Active'
  },
  {
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia.davis@university.edu',
    major: 'Psychology',
    enrollmentDate: new Date('2024-03-05'),
    status: 'Inactive'
  },
  {
    firstName: 'William',
    lastName: 'Garcia',
    email: 'william.garcia@university.edu',
    major: 'Medicine',
    enrollmentDate: new Date('2023-08-15'),
    status: 'Active'
  },
  {
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.martinez@university.edu',
    major: 'Law',
    enrollmentDate: new Date('2024-01-10'),
    status: 'Active'
  },
  {
    firstName: 'Daniel',
    lastName: 'Anderson',
    email: 'daniel.anderson@university.edu',
    major: 'Mathematics',
    enrollmentDate: new Date('2023-09-01'),
    status: 'Active'
  },
  {
    firstName: 'Ava',
    lastName: 'Taylor',
    email: 'ava.taylor@university.edu',
    major: 'Graphic Design',
    enrollmentDate: new Date('2024-02-15'),
    status: 'Active'
  },
  {
    firstName: 'Noah',
    lastName: 'Thomas',
    email: 'noah.thomas@university.edu',
    major: 'Physics',
    enrollmentDate: new Date('2023-08-20'),
    status: 'Inactive'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    console.log('Clearing existing students...');
    await Student.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert sample data
    console.log('Inserting sample students...');
    const createdStudents = await Student.insertMany(sampleStudents);
    console.log(`✅ ${createdStudents.length} students seeded successfully`);

    // Display summary
    console.log('\n📊 Seeded Students:');
    createdStudents.forEach((student, index) => {
      console.log(`  ${index + 1}. ${student.firstName} ${student.lastName} - ${student.major}`);
    });

    console.log('\n🎉 Database seeding completed!');
    console.log(`   Collection: students`);
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Total documents: ${createdStudents.length}`);

  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n👋 MongoDB connection closed');
    process.exit(0);
  }
};

seedDatabase();
