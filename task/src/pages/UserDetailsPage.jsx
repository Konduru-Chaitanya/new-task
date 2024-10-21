import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/user-details/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    fetchUserDetails();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/delete-user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('User deleted successfully!');
        // Optionally navigate to another page after deletion
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    areaName: Yup.string().required('Area name is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/update-user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        alert('User details updated successfully!');
        setUserDetails(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (!userDetails) {
    return <Typography>Loading...</Typography>; // Optional loading state
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Details
      </Typography>
      <Formik
        initialValues={{
          fullName: userDetails.fullName,
          email: userDetails.email,
          phone: userDetails.phone,
          gender: userDetails.gender,
          areaName: userDetails.address.areaName,
          city: userDetails.address.city,
          state: userDetails.address.state,
          country: userDetails.address.country,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="fullName"
              as={TextField}
              label="Full Name"
              fullWidth
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
              margin="normal"
            />
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              margin="normal"
            />
            <Field
              name="phone"
              as={TextField}
              label="Phone"
              fullWidth
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              margin="normal"
            />
            <Field
              name="gender"
              as={TextField}
              label="Gender"
              fullWidth
              error={touched.gender && Boolean(errors.gender)}
              helperText={touched.gender && errors.gender}
              margin="normal"
            />
            <Field
              name="areaName"
              as={TextField}
              label="Area Name"
              fullWidth
              error={touched.areaName && Boolean(errors.areaName)}
              helperText={touched.areaName && errors.areaName}
              margin="normal"
            />
            <Field
              name="city"
              as={TextField}
              label="City"
              fullWidth
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
              margin="normal"
            />
            <Field
              name="state"
              as={TextField}
              label="State"
              fullWidth
              error={touched.state && Boolean(errors.state)}
              helperText={touched.state && errors.state}
              margin="normal"
            />
            <Field
              name="country"
              as={TextField}
              label="Country"
              fullWidth
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && errors.country}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserDetailsPage;
