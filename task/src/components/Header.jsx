import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold userId
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userId from local storage or context
    const storedUserId = localStorage.getItem('userId'); // Adjust according to where you store the user ID
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserDetailsClick = () => {
    if (userId) {
      navigate(`/user-details/${userId}`); // Use template literals to include userId
    }
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userId'); // Clear userId from local storage on logout
    navigate('/');
    handleMenuClose();
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

        {/* Profile Icon */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
        >
          <AccountCircle />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleUserDetailsClick}>User Details</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
