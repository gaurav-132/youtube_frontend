import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text' | 'icon';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = "font-medium rounded-full transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-yt-white text-yt-black hover:bg-gray-200 border border-transparent",
        secondary: "bg-yt-hover text-yt-white hover:bg-[#3f3f3f] border border-transparent",
        text: "bg-transparent text-yt-white hover:bg-yt-hover border border-transparent",
        icon: "bg-transparent text-yt-white hover:bg-yt-hover rounded-full p-2 aspect-square"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm font-semibold",
        lg: "px-6 py-3 text-base"
    };

    const variantStyles = variants[variant];
    const sizeStyles = variant === 'icon' ? '' : sizes[size];

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
