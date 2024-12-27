import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress, Alert } from '@mui/material';
import API from '../utils/api';
import { useUser } from '../context/AuthContext';

const apiBaseUrl = "http://localhost:8000/api"; // Change as per your API endpoint


function FileList() {
  const [files, setFiles] = useState([]);
  const { user } = useUser();
  const accesstoken = localStorage.getItem("token")
  // console.log(accesstoken)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // const response = await axios.get(${apiBaseUrl}/secure-files/list/, {
        const response = await API.get('/files/listfiles/', {
          headers: {
            'Authorization': `Bearer ${accesstoken}`
          },
        });
        console.log(response.data);
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, [user]);

  return (
    <Box>
      <Typography variant="h6">Your Secure Files</Typography>
      {files.length === 0 ? (
        <Typography>No files uploaded.</Typography>
      ) : (
        files.map((file) => (
          <Card key={file.id} style={{ margin: "1rem 0" }}>
            <CardContent>
              <Typography variant="subtitle1">{file.name}</Typography>
              <Typography variant="body2">Uploaded on: {new Date(file.uploaded_at).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default FileList;