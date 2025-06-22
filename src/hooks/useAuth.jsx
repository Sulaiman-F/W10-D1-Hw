import { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import AuthContext from '../context/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.signup(email, password);
      if (response.success) {
        setToken(response.token);
        setUser({ email });
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || { message: 'Signup failed' } 
      };
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.signin(email, password);
      if (response.success) {
        setToken(response.token);
        setUser({ email });
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      console.error('Signin error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || { message: 'Signin failed' } 
      };
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await authAPI.signout();
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    signup,
    signin,
    signout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
