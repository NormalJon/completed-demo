import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DocConverter from './utils/DocConverter.jsx';
import PriceBook from './components/pricebook/pricebook_2.jsx';
import PricebookUpdate from './components/pricebook/PricebookUpdate.jsx';
import Login from './components/auth/LoginForm.jsx';
import PrivateRoute from './components/auth/PrivateRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to pricebook */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/pricebook" replace />
            </PrivateRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/docconverter"
          element={
            <PrivateRoute>
              <DocConverter />
            </PrivateRoute>
          }
        />
        <Route
          path="/pricebook"
          element={
            <PrivateRoute>
              <PriceBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/pricebookupdate"
          element={
            <PrivateRoute>
              <PricebookUpdate />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;