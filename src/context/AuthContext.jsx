import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const USER_KEY = 'spotifiveUser';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        if (storedUser) setUser(storedUser);
    }, []);

    const login = (username) => {
        setUser(username);
        localStorage.setItem(USER_KEY, username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(USER_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
