import { NextResponse } from 'next/server';
import { removeTodoById, toggleTodoCompletion } from '@/lib/todo-storage';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
        return new NextResponse('Invalid ID', { status: 400 });
    }

    const success = await removeTodoById(Number(id));

    if (success) {
        return NextResponse.json({ message: 'Todo deleted', id }, { status: 200 });
    } else {
        return new NextResponse('Failed to delete todo', { status: 500 });
    }
}

export async function PUT(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
        return new NextResponse('Invalid ID', { status: 400 });
    }

    const success = await toggleTodoCompletion(Number(id));

    if (success) {
        return NextResponse.json({ message: 'Todo completion toggled' });
    } else {
        return new NextResponse('Failed to toggle todo completion', { status: 500 });
    }
}
