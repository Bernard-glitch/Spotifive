import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import MusicPlayer from '../components/MusicPlayer';

export default function Home() {
    const { todos, addTodo } = useTodos();
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(title);
        setTitle('');
    };

    return (
        <div className="container mt-4">
            <MusicPlayer />
            <form onSubmit={handleSubmit} className="mb-3 d-flex">
                <input
                    className="form-control me-2"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    required
                />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>
            <ul className="list-group">
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
            </ul>
        </div>
    );
}
