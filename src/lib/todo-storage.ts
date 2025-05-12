import { Todo } from '@/types/todo.type';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data', 'todos.json');

const ensureStorageExists = async () => {
  const dirPath = path.dirname(filePath);

  try {
    await fs.mkdir(dirPath, { recursive: true });

    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
    }
  } catch (err) {
    console.error('Error ensuring storage exists:', err);
    throw err;
  }
};

export const readTodos = async () => {
  await ensureStorageExists();
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export const writeTodos = async (todos: Todo[]) => {
  await ensureStorageExists();
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}

export const removeTodoById = async (id: number) => {
  try {
    const todos = await readTodos();
    const updatedTodos = todos.filter((todo: Todo) => todo.id !== id);
    await writeTodos(updatedTodos);
    return true;
  } catch (err) {
    console.error('Error deleting todo:', err);
    return false;
  }
}

export async function toggleTodoCompletion(id: number) {
  try {
    const todos = await readTodos();
    const todoIndex = todos.findIndex((todo: Todo) => todo.id === id);

    if (todoIndex === -1) {
      return false;
    }

    todos[todoIndex].completed = !todos[todoIndex].completed;

    await writeTodos(todos);
    return true;
  } catch (err) {
    console.error('Error toggling todo completion:', err);
    return false;
  }
}
