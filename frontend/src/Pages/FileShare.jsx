import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { UserContext } from './UserContext'; // Assuming UserContext is already created
import axios from 'axios';

const apiBaseUrl = "http://localhost:8000/api"; // Change as per your API endpoint

function FileShare() {
  const [fileId, setFileId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(${apiBaseUrl}/file-share/, {
        secure_file: fileId,
        shared_with_email: email,
      }, {
        headers: {
          'Authorization': Bearer ${user.token},
        },
      });
      setSuccess(response.data);
    } catch (error) {
      console.error("Error sharing file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Share Secure File</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="File ID"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Share'}
        </Button>
      </form>
      {success && <Alert severity="success">File shared successfully!</Alert>}
    </Box>
  );
}

export default FileShare