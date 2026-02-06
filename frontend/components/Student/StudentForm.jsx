import React, { useState, useEffect } from 'react';
import { Button } from '../UI/Button.jsx';
import { Input } from '../UI/Input.jsx';

export const StudentForm = ({ 
  initialData, 
  mode, 
  onSubmit, 
  onCancel, 
  isSubmitting 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        major: initialData.major,
        status: initialData.status
      });
    }
  }, [initialData, mode]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.major) newErrors.major = 'Major is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        <div className="px-8 py-6 bg-brand-navy flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {mode === 'add' ? 'Register New Student' : 'Update Student Record'}
          </h2>
          <button onClick={onCancel} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="First Name" 
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
            />
            <Input 
              label="Last Name" 
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
            />
          </div>
          
          <Input 
            label="Email Address" 
            type="email"
            placeholder="john.doe@university.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Academic Major" 
              placeholder="Computer Science"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              error={errors.major}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-brand-navy uppercase tracking-wider">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy text-sm h-[38px]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="secondary" isLoading={isSubmitting}>
              {mode === 'add' ? 'Register Student' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
