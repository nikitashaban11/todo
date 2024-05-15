import { Todo } from '../components/TodoList';

const API_URL = 'http://localhost:3000/todos';

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data;
};

export const addTodo = async (todo: { title: string; dueDate?: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  return response.ok;
};

export const updateTodo = async (todo: Todo) => {
  console.log('updateTodo', todo);
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return await response.json();
};
