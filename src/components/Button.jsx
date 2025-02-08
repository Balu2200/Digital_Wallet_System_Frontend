import React from 'react';

export const Button = ({ label, onClick }) => {

  return (
    <button
      onClick={onClick}
      className="bg-indigo-400 rounded-lg p-2 w-full font-bold text hover:bg-black text-white transition-all cursor-pointer mt-2"
    >
      {label}
    </button>
  );
};


