
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-4 py-2.5 bg-white/5 border backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-blue-400/50'
                        } ${className}`}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-400 ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
