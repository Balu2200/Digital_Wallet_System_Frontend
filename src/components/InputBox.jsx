import { useState } from "react";

const InputBox = ({ placeholder, label, onChange, type = "text", value, toggleVisibility }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="flex mb-1 font-medium">{label}</label>
      <input
        onChange={onChange}
        className={`border border-black p-2 rounded-lg pr-10 ${isFocused ? 'ring-2 ring-indigo-400' : ''}`}
        placeholder={placeholder}
        type={type}
        value={value}
        required
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 focus:outline-none"
          tabIndex={-1}
        >
          {type === "password" ? (
            // Eye closed icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021 9c0 5.523-4.477 10-10 10-1.657 0-3.22-.402-4.575-1.125M9.88 9.88a3 3 0 104.24 4.24" />
            </svg>
          ) : (
            // Eye open icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default InputBox;