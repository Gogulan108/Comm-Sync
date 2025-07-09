import React from 'react';

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  title,
  type = 'button',
  className = '',
  disabled = false,
  isLoading = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 ${className}`}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Loading...
      </span>
    ) : (
      (children ?? title)
    )}
  </button>
);

export default Button;
