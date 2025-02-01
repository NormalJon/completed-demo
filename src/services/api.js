// src/services/api.js
import axios from 'axios';

// You can use an environment variable for the base URL.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Example API call for login
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Other API functions can be added here

export default api;
