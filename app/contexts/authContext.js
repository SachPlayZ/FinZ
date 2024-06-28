"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to set token
  const login = (token) => {
    setToken(token);
    // Store token in cookies
    Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
  };

  // Function to remove token
  const logout = () => {
    setToken(null);
    Cookies.remove('token');
  };

  useEffect(() => {
    // Check for token in cookies on initial load
    const tokenFromCookie = Cookies.get('token');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
