import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const fetchFiles = () => api.get('/files');
export const uploadFile = (fileData) => api.post('/files/upload', fileData);
export const deleteFile = (fileId) => api.delete(`/files/${fileId}`);


////////////////////////////////


// import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Update to your backend URL
});

// Add interceptor for attaching tokens
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default API;
