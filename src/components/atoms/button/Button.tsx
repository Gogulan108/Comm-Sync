import React from 'react';

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  title,
  type = 'button',
  className = '',
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 ${className}`}
    disabled={disabled}
  >
    {children ?? title}
  </button>
);

export default Button;
