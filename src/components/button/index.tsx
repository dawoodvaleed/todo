import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

const variantClasses: Record<'primary' | 'secondary' | 'danger', string> = {
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'bg-blue-600 hover:bg-blue-700',
    danger: 'bg-red-800 hover:bg-red-900',
};

export const Button = ({
    onClick,
    children,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`text-white p-1 rounded transition duration-200 ease-in-out 
                ${variantClasses[variant]} ${className}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'}`}
            {...props}
        >
            {children}
        </button>
    );
};
