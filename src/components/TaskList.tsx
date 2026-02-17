
import React from 'react';
import { useTasks, TaskFilter } from '../context/TaskContext';
import { TaskItem } from './TaskItem';

const TaskList: React.FC = () => {
    const { filteredTasks, filter, setFilter } = useTasks();

    const filters: { label: string; value: TaskFilter }[] = [
        { label: 'Todas', value: 'all' },
        { label: 'Pendentes', value: 'pending' },
        { label: 'Concluídas', value: 'completed' },
    ];

    return (
        <div className="w-full">
            <div className="flex gap-2 mb-6 p-1 bg-black/20 backdrop-blur-sm rounded-xl w-fit">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === f.value
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 border-dashed">
                        <div className="mx-auto w-16 h-16 mb-4 bg-white/5 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 font-medium">
                            {filter === 'all'
                                ? 'Nenhuma tarefa encontrada. Adicione uma nova!'
                                : filter === 'pending'
                                    ? 'Você está em dia! Nenhuma tarefa pendente.'
                                    : 'Nenhuma tarefa concluída ainda.'}
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))
                )}
            </div>
        </div>
    );
};

export { TaskList };
