
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
    return (
        <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
            {title && (
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-semibold text-white tracking-wide">{title}</h3>
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
};
