import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/AuthContext';

 

// ProtectedRoute component that checks if the user is logged in
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return children;
};
export default ProtectedRoute;