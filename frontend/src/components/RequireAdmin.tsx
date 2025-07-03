import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  if (!user || !token || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default RequireAdmin; 