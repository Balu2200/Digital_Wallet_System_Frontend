import React from "react";

export const Button = ({
  label,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  icon = null,
  fullWidth = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-soft hover:shadow-medium focus:ring-primary-500",
    secondary:
      "bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-300 text-secondary-700 focus:ring-secondary-400",
    accent:
      "bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white shadow-soft hover:shadow-medium focus:ring-accent-500",
    outline:
      "border-2 border-primary-600 hover:bg-primary-50 active:bg-primary-100 text-primary-600 focus:ring-primary-500",
    ghost:
      "hover:bg-secondary-100 active:bg-secondary-200 text-secondary-700 focus:ring-secondary-400",
  };

  const sizes = "px-5 py-2.5 text-sm";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
    </button>
  );
};
