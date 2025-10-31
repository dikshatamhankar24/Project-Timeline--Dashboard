import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    {...props}
    className={`w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className || ""}`}
  />
);

export default Input;
