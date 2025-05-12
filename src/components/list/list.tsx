import { Todo } from '@/types/todo.type';
import { ListItem } from './list-item';

type ListProps = {
    items: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};

export const List = ({ items, onToggle, onDelete }: ListProps) => {
    return (
        <ul className="w-full max-w-md mx-auto">
            {items.map((item) => (
                <ListItem
                    key={item.id}
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};
