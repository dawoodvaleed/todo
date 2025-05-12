"use client";

import { Todo } from "@/types/todo.type";
import { List } from "@/components/list";
import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import { AddTodoForm } from "@/components/form";
import { FiPlus } from 'react-icons/fi';
import { Button } from "@/components/button";
import { handleError } from "@/utils/handle-error";

const TODO_API_URL = '/api/todos';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodo = async (id: number) => {
    try {
      const res = await fetch(`${TODO_API_URL}/${id}`, {
        method: 'PUT',
      });

      if (!res.ok) {
        throw new Error('Failed to toggle todo completion');
      }

      fetchTodos();
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`${TODO_API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }

      fetchTodos();
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch(TODO_API_URL);

      if (!res.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await res.json();
      setTodos(data);
    } catch (err: unknown) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-100">
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-2xl font-bold">Todo List</h1>
          <Button onClick={() => setIsModalOpen(true)} className="rounded-full" aria-label="Add Todo">
            <FiPlus size={30} />
          </Button>
        </div>
        {todos.length ?
          <List items={todos} onToggle={toggleTodo} onDelete={(id) => deleteTodo(id)} /> :
          <p className="text-gray-500">No todos available. Please add a new todo.</p>
        }
        <Modal title="Add New Todo" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddTodoForm
            onFinishSubmit={() => {
              setIsModalOpen(false)
              fetchTodos();
            }}
          />
        </Modal>
      </main>
    </div>
  );
}
