import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Atualizado para porta 3001
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/login', { email, password });

export const register = (name, email, password, phone) =>
  api.post('/register', { name, email, password, phone });

export const getServices = () => api.get('/services');
export const getBarbers = () => api.get('/barbers');
export const createSchedule = (serviceId, barberId, date, time) =>
  api.post('/schedules', { serviceId, barberId, date, time });
export const getUserProfile = () => api.get('/users/profile');

export default api;