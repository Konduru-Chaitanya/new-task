import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, MenuItem, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import dayjs from 'dayjs';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Profile picture must be smaller than 5MB.');
        return;
      }
      setProfilePicture(file);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    areaName: Yup.string().required('Area name is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country selection is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().required('Date of birth is required').nullable(),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSignupSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('areaName', values.areaName);
    formData.append('city', values.city);
    formData.append('state', values.state);
    formData.append('country', values.country);
    formData.append('gender', values.gender);
    formData.append('dob', dayjs(values.dob).format('YYYY-MM-DD')); 
    formData.append('password', values.password);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/'); 
        resetForm(); 
      } else {
        alert(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            areaName: '',
            city: '',
            state: '',
            country: '',
            gender: '',
            dob: null, 
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignupSubmit}
        >
          {({ errors, touched, setFieldValue, values, isSubmitting }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2} width={500}>
                <Typography variant="h5">Signup</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Last Name"
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                </Grid>

                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Phone Number"
                      name="phone"
                      variant="outlined"
                      fullWidth
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Area Name"
                      name="areaName"
                      variant="outlined"
                      fullWidth
                      error={touched.areaName && !!errors.areaName}
                      helperText={touched.areaName && errors.areaName}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="City"
                      name="city"
                      variant="outlined"
                      fullWidth
                      error={touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="State"
                      name="state"
                      variant="outlined"
                      fullWidth
                      error={touched.state && !!errors.state}
                      helperText={touched.state && errors.state}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      select
                      label="Country"
                      name="country"
                      variant="outlined"
                      fullWidth
                      error={touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Outside India">Outside India</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      select
                      label="Gender"
                      name="gender"
                      variant="outlined"
                      fullWidth
                      error={touched.gender && !!errors.gender}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Field>
                  </Grid>
                </Grid>

                <DatePicker
                  label="Date of Birth"
                  value={values.dob || null} 
                  onChange={(value) => setFieldValue('dob', value)} 
                  renderInput={(params) => (
                    <Field
                      as={TextField}
                      {...params}
                      error={touched.dob && !!errors.dob}
                      helperText={touched.dob && errors.dob}
                    />
                  )}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </Grid>
                </Grid>

                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-picture-upload"
                  type="file"
                  onChange={handleProfilePictureChange}
                />
                <label htmlFor="profile-picture-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    Upload Profile Picture
                  </Button>
                </label>

                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Signup
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </LocalizationProvider> 
  );
};

export default SignupPage;
