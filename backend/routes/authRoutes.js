const express = require('express');
const { check, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
], signup);

router.post('/login', login);

module.exports = router;
