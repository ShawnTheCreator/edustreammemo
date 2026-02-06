import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-brand-navy uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all placeholder:text-gray-400 text-sm ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};
