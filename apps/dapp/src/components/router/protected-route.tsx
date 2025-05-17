import { useWallet } from '@defi-token/blockchain';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) navigate('/sign-in');
  }, [isConnected, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
