import React from 'react';
import { Loader2 } from 'lucide-react';

// 1. Define the props, extending standard HTML button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}: ButtonProps) {


    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";


    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm border border-transparent",
        secondary: "bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 focus:ring-zinc-500 shadow-sm",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm border border-transparent",
        ghost: "bg-transparent text-zinc-700 hover:bg-zinc-200 focus:ring-zinc-500", // Matches your zinc-200 background nicely
    };

    // Sizing variants
    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-base",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {/* Loading Spinner */}
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}

            {/* Left Icon (hides if loading) */}
            {!isLoading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}

            {/* Button Text/Content */}
            {children}

            {/* Right Icon (hides if loading) */}
            {!isLoading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
        </button>
    );
}