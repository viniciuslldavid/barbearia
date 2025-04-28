import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Token encontrado no localStorage:', token); // Log para depuração
      if (token) {
        try {
          const response = await getUserProfile();
          console.log('Perfil do usuário obtido:', response.data); // Log para depuração
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao carregar perfil do usuário:', error.response?.data || error.message); // Log para depuração
          setUser(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await import('../services/api').then(api => api.login(email, password));
      localStorage.setItem('token', response.data.token);
      const userResponse = await getUserProfile();
      setUser(userResponse.data);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};