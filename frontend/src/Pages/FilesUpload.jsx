import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import { UserContext } from './UserContext'; // Assuming UserContext is already created
import axios from 'axios';

const apiBaseUrl = "http://localhost:8000/api"; // Change as per your API endpoint

// Secure File Upload Component
function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(UserContext);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !fileName) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);

    try {
      const response = await axios.post(${apiBaseUrl}/files/upload/, formData, {
        headers: {
          'Authorization': Bearer ${user.token},
          'Content-Type': 'multipart/form-data'
        } 
      });
      setSuccess(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Upload Secure File</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" component="label">
          Select File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading || !file}>
          {isLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </form>
      {success && <Alert severity="success">File uploaded successfully!</Alert>}
    </Box>
  );
}

export default FileUpload