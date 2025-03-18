import {Navigate, useLocation} from 'react-router';
import useAuth from '../hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' replace state={{from: location}} />
  );
};

export default ProtectedRoute;
