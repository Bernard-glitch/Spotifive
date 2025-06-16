import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();
export const useTodos = () => useContext(TodoContext);

const TODOS_KEY = 'spotifiveTodos';

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(TODOS_KEY);
        if (stored) {
            setTodos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title) => {
        setTodos(prev => [...prev, { id: Date.now(), title, }]);
    };

    const updateTodo = (id, newTitle) => {
        setTodos(prev =>
            prev.map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo))
        );
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};