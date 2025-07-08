import React from 'react';
import ErrorBoundary from './components/atoms/errorBoundary/ErrorBoundary';
import Router from './components/Routes/Route';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
const App: React.FC = () => (
  <AuthProvider>
    <ErrorBoundary>
      <Router />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </ErrorBoundary>
  </AuthProvider>
);
export default App;
