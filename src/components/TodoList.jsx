import React, { useState, useEffect } from 'react';

const TodoList = ({ todos, addTodo, updateTodo, deleteTodo }) => {
    const [newTodo, setNewTodo] = useState('');
    const [timeUnit, setTimeUnit] = useState('minutes');
    const [timeValue, setTimeValue] = useState(0);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        const ms = timeUnit === 'minutes' ? timeValue * 60 * 1000 : timeValue * 60 * 60 * 1000;
        addTodo(newTodo, ms);
        setNewTodo('');
        setTimeValue(0);
    };

    const handleUpdate = (id) => {
        updateTodo(id, editingTitle);
        setEditingId(null);
        setEditingTitle('');
    };

    const formatTimeLeft = (startTime, durationMs) => {
        const endTime = startTime + durationMs;
        const timeLeft = endTime - Date.now();

        if (timeLeft <= 0) return '⏰ Time’s up!';

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
    };

    // Trigger re-render every second to update countdowns
    const [, forceUpdate] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="todo-list">
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task"
                />
                <input
                    type="number"
                    value={timeValue}
                    onChange={(e) => setTimeValue(Number(e.target.value))}
                    placeholder="Time"
                    min="0"
                    style={{ width: '80px' }}
                />
                <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                </select>
                <button type="submit">Add</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(todo.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <strong>{todo.title}</strong>
                                {todo.startTime && todo.durationMs > 0 && (
                                    <div style={{ color: 'orange', fontSize: '0.9em' }}>
                                        ⏳ {formatTimeLeft(todo.startTime, todo.durationMs)}
                                    </div>
                                )}
                                <button onClick={() => {
                                    setEditingId(todo.id);
                                    setEditingTitle(todo.title);
                                }}>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
