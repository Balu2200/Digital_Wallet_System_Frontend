import { useState } from "react";

const InputBox = ({ placeholder, label, onChange, type = "text", value, toggleVisibility }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="flex mb-1 font-medium">{label}</label>
      <input
        onChange={onChange}
        className={`border border-black p-2 rounded-lg pr-10 ${
          isFocused ? "ring-2 ring-indigo-400" : ""
        }`}
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
          className="absolute right-5 top-12 -translate-y-1/2 flex items-center text-gray-500 focus:outline-none"
          tabIndex={-1}
        >
          {type === "password" ? (
            // Eye closed icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575m16.239 1.489A9.956 9.956 0 0121 9c0 5.523-4.477 10-10 10a9.96 9.96 0 01-4.575-1.125M3 3l18 18"
              />
            </svg>
          ) : (
            // Eye Icon (password hidden)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default InputBox;