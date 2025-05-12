import React, { useState } from 'react';
import { BaseForm } from './base-form';

type AddTodoFormProps = {
    onFinishSubmit: () => void;
};

export const AddTodoForm = ({ onFinishSubmit }: AddTodoFormProps) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const addTodo = async () => {
        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input.trim() }),
            });

            if (!res.ok) throw new Error('Failed to add todo');

            setInput('');
        } catch {
            alert('Error adding todo');
        } finally {
            setLoading(false);
            onFinishSubmit();
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLoading(true);

        await addTodo();
    };

    return (
        <BaseForm handleSubmit={handleSubmit} input={input} setInput={setInput} loading={loading} />
    );
};
