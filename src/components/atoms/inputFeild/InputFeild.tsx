import React from 'react';

type InputFieldProps = {
  label?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
};

const InputFeild: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  className = '',
  disabled = false,
  ...props
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-gray-500" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      {...props}
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={`px-4 py-3 border border-gray-500 rounded text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      disabled={disabled}
    />
  </div>
);

export default InputFeild;
