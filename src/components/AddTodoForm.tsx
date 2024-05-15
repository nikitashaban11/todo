import styled from 'styled-components';
import React, { useState } from 'react';

interface AddTodoFormProps {
  onAddTodo: (todo: { title: string; dueDate?: string }) => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: darkblue;
  }
`;

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo({ title, dueDate: dueDate || undefined });
    setTitle('');
    setDueDate('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Add new todo'
        required
      />
      <Input
        type='date'
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button type='submit'>Add Todo</Button>
    </Form>
  );
};

export default AddTodoForm;
