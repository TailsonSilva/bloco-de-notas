
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useTasks } from '../context/TaskContext';

export const TaskInput: React.FC = () => {
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !date || !time) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        addTask({
            title,
            date,
            time,
        });

        // Reset form
        setTitle('');
        setDate('');
        setTime('');
    };

    return (
        <Card title="Nova Tarefa" className="mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-grow w-full md:w-auto">
                    <Input
                        label="Descrição"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Enviar relatório financeiro"
                    />
                </div>
                <div className="w-full md:w-40">
                    <Input
                        label="Data"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-32">
                    <Input
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-auto">
                    <Button type="submit" fullWidth>
                        Adicionar
                    </Button>
                </div>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </Card>
    );
};
