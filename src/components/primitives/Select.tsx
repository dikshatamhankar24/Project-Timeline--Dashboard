import React from "react";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface SelectProps<T extends string | number | readonly string[] = string>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption<T>[];
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const Select = <T extends string = string>({
  options,
  value,
  onChange,
  className,
  ...props
}: SelectProps<T>) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full rounded border px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${className || ""}`}
    {...props}
  >
    {options.map((option, i) => (
      <option key={i} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
