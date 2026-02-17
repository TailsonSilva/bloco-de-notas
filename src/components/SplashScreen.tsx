
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [count, setCount] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Prevent state update during render
                    setTimeout(() => {
                        onFinish();
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white">
            <div className="animate-bounce mb-8">
                <svg
                    className="w-24 h-24 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
                Bloco de Notas CLT
            </h1>
            <p className="text-xl text-blue-200 mb-12 text-center max-w-md px-4">
                Prepare-se para um turno de alta produtividade.
            </p>

            <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-blue-900"
                        fill="none"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-blue-500 transition-all duration-1000 ease-linear"
                        strokeDasharray={377}
                        strokeDashoffset={377 - (377 * count) / 10}
                        fill="none"
                    />
                </svg>
                <span className="text-4xl font-mono font-bold">{count}</span>
            </div>

            <button
                onClick={onFinish}
                className="mt-12 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
            >
                Pular Introdução
            </button>
        </div>
    );
};
