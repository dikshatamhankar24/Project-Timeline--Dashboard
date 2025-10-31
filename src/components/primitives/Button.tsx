import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none active:scale-[0.97]";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:brightness-110 focus:ring-2 focus:ring-blue-400",
    secondary:
      "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:brightness-110 focus:ring-2 focus:ring-emerald-400",
    outline:
      "border border-blue-400 text-blue-600 bg-white hover:bg-blue-50 focus:ring-2 focus:ring-blue-300 shadow-sm",
  };

  return (
    <button {...props} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
