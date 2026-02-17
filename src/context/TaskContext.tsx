
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// --- Types ---
export interface Task {
    id: string;
    title: string;
    description?: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    completed: boolean;
    createdAt: number;
}

export type TaskFilter = 'all' | 'pending' | 'completed';

interface TaskContextType {
    tasks: Task[];
    filter: TaskFilter;
    setFilter: (filter: TaskFilter) => void;
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    filteredTasks: Task[];
    stats: {
        total: number;
        completed: number;
        pending: number;
        completionRate: number;
    };
}

// --- Context ---
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// --- Provider ---
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('clt-notepad-tasks', []);
    const [filter, setFilter] = useState<TaskFilter>('all');
    const [isClient, setIsClient] = useState(false);

    // Hydration fix
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsClient(true);
    }, []);

    const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
        const newTask: Task = {
            ...newTaskData,
            id: crypto.randomUUID(),
            completed: false,
            createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    }).sort((a, b) => {
        // Sort by status (pending first), then by date/time
        if (a.completed === b.completed) {
            const dateA = new Date(`${a.date}T${a.time}`).getTime();
            const dateB = new Date(`${b.date}T${b.time}`).getTime();
            return dateA - dateB;
        }
        return a.completed ? 1 : -1;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
        completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
    };

    if (!isClient) {
        return null; // or a loading spinner
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                filter,
                setFilter,
                addTask,
                toggleTask,
                deleteTask,
                updateTask,
                filteredTasks,
                stats
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

// --- Hook ---
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
