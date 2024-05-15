import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(bodyParser.json());

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

let todos: TodoItem[] = [];

app.get('/todos', (_, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { title, dueDate } = req.body;
  const newTodo: TodoItem = {
    id: uuidv4(),
    title,
    completed: false,
    dueDate: new Date(dueDate),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed, dueDate } = req.body;

  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = title;
    todo.completed = completed;
    todo.dueDate = dueDate ? new Date(dueDate) : todo.dueDate;

    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
