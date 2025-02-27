import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const res = await api.get('/api/v1/auth/me');
        
        setUser(res.data.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        setError('Authentication error. Please log in again.');
      }
    };

    loadUser();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      
      const res = await api.post('/api/v1/auth/register', formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        const userRes = await api.get('/api/v1/auth/me');
        
        setUser(userRes.data.data);
        setIsAuthenticated(true);
        setError(null);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const res = await api.post('/api/v1/auth/login', { email, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        const userRes = await api.get('/api/v1/auth/me');
        
        setUser(userRes.data.data);
        setIsAuthenticated(true);
        setError(null);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.get('/api/v1/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;