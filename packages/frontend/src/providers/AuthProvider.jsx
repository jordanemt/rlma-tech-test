import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthContext from '../context/authContext.jsx';
import { login } from '../services/auth.js';

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const refetch = async () => {
    const token = await login();
    setToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!token) {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      return;
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
    setIsLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider value={{
      isLoading,
      token,
      refetch,
    }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
