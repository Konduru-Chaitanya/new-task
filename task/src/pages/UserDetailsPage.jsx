import React, { useEffect, useState } from 'react';
import { Box, Button,CircularProgress, Typography, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetailsPage = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areaName: '',
    city: '',
    state: '',
    country: '',
    gender: '',
    dob: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${id}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUser(data.user);
        setFormData(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user); 
        handleClose(); 
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card variant="outlined" sx={{ width: '400px', padding: '16px' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          <Typography variant="body1"><strong>Name: </strong>{user.firstName} {user.lastName}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {user.areaName}, {user.city}, {user.state}, {user.country}
          </Typography>
          <Typography variant="body1"><strong>Gender:</strong> {user.gender}</Typography>
          <Typography variant="body1"><strong>Date of Birth:</strong> {user.dob}</Typography>
          
          <Grid container spacing={2} sx={{ marginTop: '16px' }}>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/dashboard')}
                fullWidth
              >
                Back to Dashboard
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="outlined"
                onClick={handleEditClick}
                fullWidth
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '16px' }}>
            <Grid item xs={12}>
              <Button 
                variant="outlined"
                color="error"
                onClick={handleDeleteClick}
                fullWidth
              >
                Delete User
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="areaName"
            label="Area Name"
            type="text"
            fullWidth
            value={formData.areaName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="state"
            label="State"
            type="text"
            fullWidth
            value={formData.state}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="country"
            label="Country"
            type="text"
            fullWidth
            value={formData.country}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="gender"
            label="Gender"
            type="text"
            fullWidth
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetailsPage;