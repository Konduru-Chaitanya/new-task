import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h4">Welcome to the Dashboard!</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;