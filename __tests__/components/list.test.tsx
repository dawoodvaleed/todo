import { render, screen, fireEvent } from '@testing-library/react';
import { List } from '@/components/list/list';
import { Todo } from '@/types/todo.type';

describe('List Component', () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const mockItems: Todo[] = [
        { id: 1, text: 'Test Todo 1', completed: false },
        { id: 2, text: 'Test Todo 2', completed: true },
    ];

    it('should render the list of items', () => {
        render(<List items={mockItems} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });

    it('should toggle item completion', () => {
        render(<List items={mockItems} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const todoText = screen.getAllByLabelText('Todo text')[0];
        fireEvent.click(todoText);

        expect(mockOnToggle).toHaveBeenCalledWith(1);
    });

    it('should delete item', () => {
        render(<List items={mockItems} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it('should render an empty list when no items are provided', () => {
        render(<List items={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
});