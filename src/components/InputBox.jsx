import { useState } from "react";

const InputBox = ({
  placeholder,
  label,
  onChange,
  type = "text",
  value,
  toggleVisibility,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="block text-sm font-medium text-secondary-700 mb-2">
        {label}
      </label>
      <input
        onChange={onChange}
        className="input-field"
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
          className="absolute right-3 top-10 flex items-center text-secondary-500 hover:text-secondary-700 focus:outline-none transition-colors"
          tabIndex={-1}
        >
          {type === "password" ? (
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
