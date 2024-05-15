import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import {
  fetchTodos,
  deleteTodo,
  updateTodo,
  addTodo,
} from '../api/todoService';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
  color: #666;
  ::placeholder {
    color: #aaa;
  }
`;

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(newTodos);

    try {
      await updateTodo(updatedTodo);
    } catch (error) {
      console.error('Failed to update todo', error);
      const todos = await fetchTodos();
      setTodos(todos);
    }
  };

  const handleDelete = async (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo', error);
      const todos = await fetchTodos();
      setTodos(todos);
    }
  };

  const handleAddTodo = async (newTodoData: {
    title: string;
    dueDate?: string;
  }) => {
    const newTodo = {
      ...newTodoData,
      completed: false,
      id: Date.now().toString(), // Temporary ID for optimistic update
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    try {
      const addedTodo = await addTodo(newTodoData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === newTodo.id ? addedTodo : todo))
      );
    } catch (error) {
      console.error('Failed to add todo', error);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== newTodo.id)
      );
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>TODO List</Title>
      <SearchInput
        type='text'
        placeholder='Search todos...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodo={handleUpdateTodo}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
