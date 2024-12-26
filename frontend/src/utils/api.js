import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const fetchFiles = () => api.get('/files');
export const uploadFile = (fileData) => api.post('/files/upload', fileData);
export const deleteFile = (fileId) => api.delete(`/files/${fileId}`);
