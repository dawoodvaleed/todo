import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTodoForm } from '@/components/form';

describe('AddTodoForm Component', () => {
    const mockOnFinishSubmit = jest.fn();

    beforeEach(() => {
        mockOnFinishSubmit.mockClear();
    });

    it('should render the form correctly', () => {
        render(<AddTodoForm onFinishSubmit={mockOnFinishSubmit} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText(/Add Todo/)).toBeInTheDocument();
    });

    it('should update input value when typing', () => {
        render(<AddTodoForm onFinishSubmit={mockOnFinishSubmit} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        expect(input).toHaveValue('New Todo');
    });

    it('should not submit if input is empty', async () => {
        render(<AddTodoForm onFinishSubmit={mockOnFinishSubmit} />);
        const addButton = screen.getByText(/Add Todo/);
        fireEvent.click(addButton);
        await waitFor(() => expect(mockOnFinishSubmit).not.toHaveBeenCalled());
    });

    it('should submit the form and clear input on success', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: true })
        ) as jest.Mock;

        render(<AddTodoForm onFinishSubmit={mockOnFinishSubmit} />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText(/Add Todo/);

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('/api/todos', expect.any(Object)));
        expect(input).toHaveValue('');
        expect(mockOnFinishSubmit).toHaveBeenCalled();
    });

    it('should show an alert on submission failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: false })
        ) as jest.Mock;

        window.alert = jest.fn();

        render(<AddTodoForm onFinishSubmit={mockOnFinishSubmit} />);
        const input = screen.getByRole('textbox');
        const addButton = screen.getByText(/Add Todo/);

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Error adding todo'));
        expect(mockOnFinishSubmit).toHaveBeenCalled();
    });
});