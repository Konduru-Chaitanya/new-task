import React, { useState }  from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
      .required('Password is required'),
  });

  const handleSignupSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignupSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2} width={300}>
              <Typography variant="h5">Signup</Typography>
              <Field
                as={TextField}
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
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
              <Field
                as={TextField}
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              <Button type="submit" variant="contained" color="primary">
                Signup
              </Button>
              <Button variant="text" onClick={() => navigate('/')}>
                Already have an account? Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignupPage;
