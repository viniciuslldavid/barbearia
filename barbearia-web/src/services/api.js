import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  return api.post('/login', { email, password });
};

export const register = async (name, email, password, phone) => {
  return api.post('/register', { name, email, password, phone });
};

export const getUserProfile = async () => {
  return api.get('/users/profile');
};

export const getServices = async () => {
  return api.get('/services');
};

export const getBarbers = async () => {
  return api.get('/barbers');
};

export const createSchedule = async (serviceId, barberId, date, time) => {
  return api.post('/schedules', { serviceId, barberId, date, time });
};

export const createPublicSchedule = async (serviceId, barberId, date, time, userName, userPhone) => {
  return api.post('/public/schedules', { serviceId, barberId, date, time, userName, userPhone });
};

export const getUserSchedules = async () => {
  return api.get('/schedules');
};

export const getAllSchedules = async () => {
  return api.get('/admin/schedules');
};

export default api;