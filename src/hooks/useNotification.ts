
import { useEffect, useRef } from 'react';
import { Task } from '../context/TaskContext';

export const useNotification = (tasks: Task[]) => {
    const processedRef = useRef<Set<string>>(new Set());

    // Request permission on mount
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }
    }, []);

    // Check for due tasks
    useEffect(() => {
        if (typeof window === 'undefined' || !('Notification' in window)) return;

        const checkDueTasks = () => {
            const now = new Date();

            tasks.forEach(task => {
                if (task.completed) return;

                // Skip if already notified this session
                // Note: For a real app, we'd want to persist "notified" state in the task itself
                // to avoid re-notifying on page reload. For this scope, a ref is okay for session.
                if (processedRef.current.has(task.id)) return;

                const taskDue = new Date(`${task.date}T${task.time}`);
                const timeDiff = taskDue.getTime() - now.getTime();

                // Notify if task is due within the next minute or recently passed (up to 5 mins ago)
                // This covers the case where the user opens the app slightly after the due time
                if (timeDiff <= 60000 && timeDiff > -300000) {
                    if (Notification.permission === 'granted') {
                        new Notification("Lembrete de Tarefa", {
                            body: `Hora de: ${task.title}`,
                            icon: '/favicon.ico' // Assuming standard nextjs favicon
                        });
                        processedRef.current.add(task.id);
                    }
                }
            });
        };

        // Initial check
        checkDueTasks();

        // Check every minute
        const intervalId = setInterval(checkDueTasks, 60000);

        return () => clearInterval(intervalId);
    }, [tasks]);
};
