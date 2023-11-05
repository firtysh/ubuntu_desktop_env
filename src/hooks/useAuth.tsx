import { useContext } from 'react';
import { authContext } from '../context/AuthProvider';

const useAuth = () => {
  return useContext(authContext);
};
export default useAuth;
