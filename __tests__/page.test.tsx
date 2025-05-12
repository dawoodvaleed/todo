import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '@/app/page';
import userEvent from '@testing-library/user-event';
import { Todo } from '@/types/todo.type';

global.fetch = jest.fn();

const mockTodos: Todo[] = [
    { id: 1, text: 'Test Todo 1', completed: false },
    { id: 2, text: 'Test Todo 2', completed: true },
];

describe('Main Page', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should render todo list after fetching', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockTodos,
        });

        render(<Home />);
        expect(screen.getByText(/todo list/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
            expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
        });
    });

    it('should show message when no todos are returned', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText(/no todos available/i)).toBeInTheDocument();
        });
    });

    it('should open and close the modal when add button is clicked', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<Home />);
        const button = screen.getByRole('button', { name: /add/i });

        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Add new todo/i)).toBeInTheDocument();
        });

        const closeButton = screen.getByLabelText('Close modal');
        userEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText(/Add new todo/i)).not.toBeInTheDocument();
        });
    });

    it('should handle toggle todo', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockTodos });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        });

        const todoText = screen.getAllByLabelText('Todo text')[0];
        fireEvent.click(todoText);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/todos/1', { method: 'PUT' });
        });
    });

    it('should handle delete todo', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => mockTodos });

        render(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        });

        // the first button is the add button but after that the delete button is always the second one
        const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
        userEvent.click(deleteButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/todos/1', { method: 'DELETE' });
        });
    });
});
