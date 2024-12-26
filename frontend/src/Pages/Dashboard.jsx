import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import FileCard from '../components/FileCard';

const Dashboard = () => {
  const files = []; // Replace with actual files from the API or context

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Dashboard
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }}>
        Upload New File
      </Button>
      <Grid container spacing={2}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FileCard file={file} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No files uploaded yet.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
