import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username);
        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login to Spotifive</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto mt-3">
                <input
                    className="form-control mb-3"
                    placeholder="Enter username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <button className="btn btn-success w-100">Login</button>
            </form>
        </div>
    );
}