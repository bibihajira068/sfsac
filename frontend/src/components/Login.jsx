import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import API from '../utils/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  // const [navigate] = useNavigate
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/user/login/', formData);
      localStorage.setItem('token', response.data.access);
      setMessage('Login successful!');
      window.location("/")
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
      {message && <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default Login;
