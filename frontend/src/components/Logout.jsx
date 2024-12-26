import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import API from '../utils/api';

const Logout = () => {
  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    try {
      await API.post('/logout/', { refresh });
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      alert('Logout successful!');
    } catch (error) {
      alert('Error during logout.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Logout</Typography>
      <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
