import React from 'react';

export const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
      text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg 
      transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {label}
    </button>
  );
};


