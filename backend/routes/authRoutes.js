const express = require('express');
const { check } = require('express-validator');
const { signup, login, getUserDetails } = require('../controllers/authController'); // Import the controllers
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Signup route with validation and file upload
router.post('/signup',
  upload.single('profilePicture'),
  [
    check('firstName').notEmpty().withMessage('First name is required.'),
    check('lastName').notEmpty().withMessage('Last name is required.'),
    check('email').isEmail().withMessage('Please provide a valid email.'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    check('phone').notEmpty().withMessage('Phone number is required.'),
    check('city').notEmpty().withMessage('City is required.'),
    check('state').notEmpty().withMessage('State is required.'),
    check('country').notEmpty().withMessage('Country is required.'),
    check('gender').notEmpty().withMessage('Gender is required.'),
    check('dob').notEmpty().withMessage('Date of birth is required.'),
  ],
  signup
);

// Login route with validation
router.post('/login', 
  [
    check('email').isEmail().withMessage('Please provide a valid email.'),
    check('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

// Get user by ID
router.get('/:id', getUserDetails); // Use the getUserDetails controller

module.exports = router;
