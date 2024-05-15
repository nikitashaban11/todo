import React from 'react';
import styled from 'styled-components';
import { Todo } from './TodoList';
import { formatDate } from '../utils';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const Item = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-top: 8px;
  background: white;
  border-radius: 4px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const TodoText = styled.span<{ completed: boolean }>`
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const DeleteButton = styled.button`
  padding: 4px 8px;
  font-size: 0.8em;
  color: white;
  background-color: #ff6347;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
  transition: background-color 0.3s;
`;

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdateTodo,
  onDelete,
}) => {
  const toggleCompletion = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onUpdateTodo(updatedTodo);
  };

  return (
    <Item completed={todo.completed}>
      <label>
        <Checkbox checked={todo.completed} onChange={toggleCompletion} />
        <TodoText completed={todo.completed}>
          {todo.title} {todo.dueDate && ` - due on ${formatDate(todo.dueDate)}`}
        </TodoText>
      </label>
      <DeleteButton onClick={() => onDelete(todo.id)}>Delete</DeleteButton>
    </Item>
  );
};

export default TodoItem;
