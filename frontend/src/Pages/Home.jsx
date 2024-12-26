import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SecureShare
      </Typography>
      <Typography variant="h6" gutterBottom>
        A secure and user-friendly way to share files with advanced encryption and access control.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Get Started
        </Button>
        <Button component={Link} to="/login" variant="outlined" color="primary">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
