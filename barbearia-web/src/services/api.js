import axios from 'axios';

const api = axios.create({
  baseURL: 'https://barbeariabackend-production.up.railway.app',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  return api.post('/api/login', { email, password });
};

export const register = async (name, email, password, phone) => {
  return api.post('/api/register', { name, email, password, phone });
};

export const getUserProfile = async () => {
  return api.get('/api/users/profile');
};

export const getServices = async () => {
  return api.get('/api/services');
};

export const getBarbers = async () => {
  return api.get('/api/barbers');
};

export const getAvailableTimes = async (params) => {
  return api.get('/api/available-times', { params });
};

export const createSchedule = async (serviceId, barberId, date, time) => {
  return api.post('/api/schedules', { serviceId, barberId, date, time });
};

export const createPublicSchedule = async (serviceId, barberId, date, time, userName, userPhone) => {
  return api.post('/api/public/schedules', { serviceId, barberId, date, time, userName, userPhone });
};

export const getUserSchedules = async () => {
  return api.get('/api/schedules');
};

export const getAllSchedules = async () => {
  return api.get('/api/admin/schedules');
};

export const updateScheduleStatus = async (scheduleId, status) => {
  return api.post('/api/admin/schedules/update-status', { scheduleId, status });
};

export const createBarber = async (name) => {
  return api.post('/api/admin/barbers', { name });
};

export const createService = async (name, price) => {
  return api.post('/api/admin/services', { name, price });
};

export default api;