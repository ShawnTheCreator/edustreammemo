import React from 'react';
import { Button } from '../UI/Button.jsx';

export const StudentTable = ({ students, onEdit, onDelete, isLoading }) => {
  if (isLoading && students.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-navy mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching student records...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="bg-brand-red p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No students found</h3>
        <p className="text-gray-500 max-w-xs">Start by adding a new student to your database.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Major</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{student.firstName} {student.lastName}</div>
                      <div className="text-xs text-gray-400">ID: {student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {student.major}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" onClick={() => onEdit(student)} className="!py-1 !px-3">Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(student.id)} className="!py-1 !px-3">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
