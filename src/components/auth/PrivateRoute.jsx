//Src//Components//Auth//PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If the user is not logged in, redirect to the login page.
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default PrivateRoute;
