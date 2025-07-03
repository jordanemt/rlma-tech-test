import { useContext } from 'react';
import AuthContext from '../context/authContext.jsx';

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
