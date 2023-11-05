import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Protected = () => {
  const { username } = useAuth();

  return username ? <Outlet /> : <Navigate to={'/login'} />;
};

export default Protected;
