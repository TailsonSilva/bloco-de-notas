
import React from 'react';
import { Card } from './ui/Card';
import { useTasks } from '../context/TaskContext';

export const StatsOverview: React.FC = () => {
    const { stats } = useTasks();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="relative group hover:border-blue-400/30">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                <div className="relative flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-blue-200">Total de Tarefas</p>
                        <h3 className="text-3xl font-bold text-white mt-1 drop-shadow-md">{stats.total}</h3>
                    </div>
                    <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl shadow-inner shadow-blue-500/10">
                        <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                </div>
            </Card>

            <Card className="relative group hover:border-green-400/30">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                <div className="relative flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-green-200">Concluídas</p>
                        <h3 className="text-3xl font-bold text-white mt-1 drop-shadow-md">{stats.completed}</h3>
                    </div>
                    <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl shadow-inner shadow-green-500/10">
                        <svg className="w-6 h-6 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </Card>

            <Card className="relative group hover:border-orange-400/30">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                <div className="relative flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-orange-200">Pendentes</p>
                        <h3 className="text-3xl font-bold text-white mt-1 drop-shadow-md">{stats.pending}</h3>
                    </div>
                    <div className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl shadow-inner shadow-orange-500/10">
                        <svg className="w-6 h-6 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div className="relative mt-4">
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                            style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-orange-200/70 mt-2 font-medium">
                        {stats.completionRate}% de produtividade (Concluído)
                    </p>
                </div>
            </Card>
        </div>
    );
};
