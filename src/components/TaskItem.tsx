
import React from 'react';
import { Task, useTasks } from '../context/TaskContext';
import { Button } from './ui/Button';

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { toggleTask, deleteTask } = useTasks();

    const isOverdue = !task.completed && new Date(`${task.date}T${task.time}`) < new Date();

    return (
        <div className={`group p-4 mb-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${task.completed
                ? 'bg-white/5 border-white/5 opacity-60'
                : isOverdue
                    ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-white/10 border-white/10 hover:bg-white/15 hover:border-white/20 hover:shadow-lg'
            }`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="relative flex items-center justify-center mt-1">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="peer appearance-none h-6 w-6 rounded-full border-2 border-white/30 checked:bg-green-500 checked:border-green-500 transition-all cursor-pointer"
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <div>
                        <h4 className={`text-lg font-medium transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-white'
                            }`}>
                            {task.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${isOverdue && !task.completed
                                    ? 'bg-red-500/20 border-red-500/30 text-red-200'
                                    : 'bg-white/5 border-white/10 text-gray-300'
                                }`}>
                                📅 {task.date}
                            </span>
                            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${isOverdue && !task.completed
                                    ? 'bg-red-500/20 border-red-500/30 text-red-200'
                                    : 'bg-white/5 border-white/10 text-gray-300'
                                }`}>
                                ⏰ {task.time}
                            </span>
                            {isOverdue && !task.completed && (
                                <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50">
                                    ⚠️ Atrasada
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full p-2"
                        aria-label="Deletar tarefa"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};
