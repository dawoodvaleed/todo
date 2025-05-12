import { NextResponse } from 'next/server';
import { readTodos, writeTodos } from '@/lib/todo-storage';
import { Todo } from '@/types/todo.type';

export async function GET() {
    const todos: Todo[] = await readTodos();
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
        return NextResponse.json({ error: 'Text is required and must be a string' }, { status: 400 });
    }

    const todos: Todo[] = await readTodos();

    const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
    };

    todos.push(newTodo);
    await writeTodos(todos)

    return NextResponse.json(newTodo, { status: 201 });
}
