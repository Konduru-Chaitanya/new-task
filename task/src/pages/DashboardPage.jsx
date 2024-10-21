import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve user ID from local storage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) {
                setLoading(false);
                setError('No user ID found. Please log in.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUserDetails(response.data);
            } catch (err) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail'); // Clear email from local storage
        localStorage.removeItem('userId'); // Clear user ID from local storage
        navigate('/'); // Redirect to login page
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6">{error}</Typography>;
    }

    if (!userDetails) {
        return <Typography variant="h6">No user data found. Please log in.</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
            <Card sx={{ marginTop: 2 }}>
                <CardContent>
                    <Typography variant="h5">User Details</Typography>
                    <Typography variant="body1"><strong>Full Name:</strong> {userDetails.firstName} {userDetails.lastName}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {userDetails.email}</Typography>
                    <Typography variant="body1"><strong>Phone:</strong> {userDetails.phone}</Typography>
                    <Typography variant="body1"><strong>Gender:</strong> {userDetails.gender}</Typography>
                    <Typography variant="body1"><strong>Address:</strong> {userDetails.areaName}, {userDetails.city}, {userDetails.state}, {userDetails.country}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DashboardPage;
