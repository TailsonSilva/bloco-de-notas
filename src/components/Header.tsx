
"use client";

import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Format date: "Segunda-feira, 16 de Fevereiro"
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        }).format(date);
    };

    // Format time: "21:30"
    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (!time) return <div className="h-24 animate-pulse bg-white/5 rounded-2xl mx-4 mt-4"></div>;

    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                    Bloco de Notas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">CLT</span>
                </h1>
                <p className="text-blue-200 text-sm md:text-base font-medium mt-1 drop-shadow-md">
                    Organize seu turno com máxima eficiência.
                </p>
            </div>
            <div className="text-right flex flex-col items-end">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 shadow-lg">
                    <span className="block text-4xl font-mono font-bold text-white tracking-wider drop-shadow-md">
                        {formatTime(time)}
                    </span>
                    <span className="block text-blue-200 text-sm capitalize font-medium">
                        {formatDate(time)}
                    </span>
                </div>
            </div>
        </header>
    );
};
