// src/pages/UserDetailsPage.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetailsPage = () => {
  const { id } = useParams(); // Get user ID from URL params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${id}`); // Fetching using user ID
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">User Details</Typography>
      <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>City: {user.city}</Typography>
      <Typography>State: {user.state}</Typography>
      <Typography>Country: {user.country}</Typography>
      <Typography>Gender: {user.gender}</Typography>
      <Typography>Date of Birth: {user.dob}</Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    </Box>
  );
};

export default UserDetailsPage;
