"use client"
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<{ id: number; task: string }[]>([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetch('/api/todo')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleSubmit = async () => {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setTask('');
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        placeholder="New task"
        onChange={e => setTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
