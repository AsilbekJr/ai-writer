import { useAuthContext } from '@/contexts/auth.context';
import type { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
