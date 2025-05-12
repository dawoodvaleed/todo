import { Todo } from '@/types/todo.type';
import { Button } from '../button';
import { FiTrash } from 'react-icons/fi';

type ListItemProps = {
    item: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

export const ListItem = ({ item: { id, completed, text }, onToggle, onDelete }: ListItemProps) => {
    return (
        <li className="flex items-center justify-between p-2 border-b">
            <span
                onClick={() => onToggle(id)}
                className={`cursor-pointer break-all ${completed ? 'line-through text-gray-500' : ''}`}
                aria-label="Todo text"
            >
                {text}
            </span>
            <Button onClick={() => onDelete(id)} className="ml-6 rounded-full" variant="danger" aria-label="Delete todo">
                <FiTrash size={20} />
            </Button>
        </li>
    );
};
