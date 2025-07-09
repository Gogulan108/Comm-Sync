import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/homepage/HomePage';
import LoginOrSignup from '../pages/loginOrSignup/LoginOrSignup';
import Dashboard from '../pages/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginOrSignup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
