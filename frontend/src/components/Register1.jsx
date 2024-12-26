import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import API from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '', date_of_birth: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/user/register/', formData);
      setMessage('Registration successful! Please check your email for OTP verification.');
    } catch (error) {
      setMessage('Error during registration. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
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
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
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
        <TextField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formData.date_of_birth}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
      {message && <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default Register;
