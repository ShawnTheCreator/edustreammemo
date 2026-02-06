import React, { useState, useEffect, useCallback } from 'react';
import { studentService } from './api/studentService.js';
import { StudentTable } from './components/Student/StudentTable.jsx';
import { StudentForm } from './components/Student/StudentForm.jsx';
import { Button } from './components/UI/Button.jsx';
import { ToastContainer } from './components/Toast.jsx';

const App = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, text) => {
    setToasts((prev) => [...prev, { id: Date.now(), type, text }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const refreshData = useCallback(async () => {
    console.log('[Frontend] refreshData called - fetching students...');
    setIsLoading(true);
    try {
      const data = await studentService.getAll();
      console.log('[Frontend] Received', data.length, 'students from API:', data);
      setStudents(data);
    } catch (err) {
      console.error('[Frontend] Error fetching students:', err.message);
      addToast('error', 'Failed to fetch student data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddClick = () => {
    setFormMode('add');
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (student) => {
    setFormMode('edit');
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to remove this student record?')) return;
    
    try {
      await studentService.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      addToast('success', 'Student record deleted successfully');
    } catch (err) {
      addToast('error', 'Failed to delete student');
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formMode === 'add') {
        const newStudent = await studentService.create(formData);
        setStudents((prev) => [...prev, newStudent]);
        addToast('success', 'Student registered successfully');
      } else {
        const updatedStudent = await studentService.update({ ...formData, id: editingStudent.id });
        setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
        addToast('success', 'Student record updated');
      }
      setIsFormOpen(false);
    } catch (err) {
      addToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <header className="bg-brand-navy py-4 px-6 md:px-12 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/Logo.webp" alt="Erisn Africa" className="h-8 w-8" />
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Erisn <span className="text-brand-red">Africa</span> Education</h1>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/80 text-sm">
            <span>Admin Dashboard</span>
            <div className="h-4 w-px bg-white/20"></div>
            <span>Academic Year 2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-navy">Student Directory</h2>
            <p className="text-gray-500 mt-1">Manage institutional student records and enrollment status.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={refreshData} disabled={isLoading} className="hidden md:flex">
              <svg className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </Button>
            <Button variant="secondary" onClick={handleAddClick}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Student
            </Button>
          </div>
        </div>

        {/* Data Grid Component */}
        <StudentTable 
          students={students} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteStudent}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 mt-12">
        &copy; 2026 Erisn Africa Education Systems. Professional Grade Data Architecture.
      </footer>

      {/* Modal Form */}
      {isFormOpen && (
        <StudentForm 
          mode={formMode}
          initialData={editingStudent}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default App;
