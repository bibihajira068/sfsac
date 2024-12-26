import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import API from '../utils/api';

const OTPVerification = () => {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/verify-otp/', formData);
      setMessage('OTP verified successfully! You can now log in.');
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>OTP Verification</Typography>
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
          label="OTP"
          name="otp"
          fullWidth
          margin="normal"
          value={formData.otp}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Verify OTP</Button>
      </form>
      {message && <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default OTPVerification;
