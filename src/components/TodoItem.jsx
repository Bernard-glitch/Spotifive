import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleUpdate = () => {
        updateTodo(todo.id, newTitle);
        setIsEditing(false);
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <span>{todo.title}</span>
                    <button onClick={() => setIsEditing(true)}>✏️</button>
                    <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
