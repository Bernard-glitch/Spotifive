import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import MusicPlayer from './components/MusicPlayer';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

const TODOS_KEY = 'spotifiveTodos';

const App = () => {
  const { user, login, logout } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, durationMs = 0) => {
    if (title.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title, durationMs, startTime: durationMs > 0 ? Date.now() : null, }]);
    }
  };

  const updateTodo = (id, newTitle) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="app-container">
      <h1>🎵 Spotifive Todo List</h1>
      <p>Welcome, {user}! <button onClick={logout}>Logout</button></p>
      <MusicPlayer />
      <TodoList
        todos={todos}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
