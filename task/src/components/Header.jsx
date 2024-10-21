import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Clear the token on logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/somepage">
          Some Page
        </Button>
        <Button color="inherit" component={Link} to="/anotherpage">
          Another Page
        </Button>
        <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
