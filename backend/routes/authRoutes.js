const express = require('express');
const { check } = require('express-validator');
const { signup, login, getUserDetails } = require('../controllers/authController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

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

router.post('/login', 
  [
    check('email').isEmail().withMessage('Please provide a valid email.'),
    check('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

router.get('/user/:id', getUserDetails);

module.exports = router;