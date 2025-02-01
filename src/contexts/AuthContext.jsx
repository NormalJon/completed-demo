// src/contexts/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // A simple login function; replace with your actual auth logic/API call.
    const login = (username, password) => {
        // Example: Allow "demo" credentials.
        if (username === 'demo' && password === 'demo') {
            const userData = { username };
            setUser(userData);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
