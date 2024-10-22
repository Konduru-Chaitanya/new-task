const User = require('../models/User');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
  const { firstName, lastName, email, password, phone, city, state, country, gender, dob, areaName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      city,
      state,
      country,
      gender,
      dob,
      areaName,
      profilePicture: req.file ? req.file.path : null,
    });

    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        state: user.state,
        country: user.country,
        gender: user.gender,
        dob: user.dob,
        areaName: user.areaName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send user details (without password)
    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        state: user.state,
        country: user.country,
        gender: user.gender,
        dob: user.dob,
        areaName: user.areaName,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        city: updatedUser.city,
        state: updatedUser.state,
        country: updatedUser.country,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        areaName: updatedUser.areaName,
        profilePicture: updatedUser.profilePicture,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add to your exports
module.exports = { signup, login, getUserDetails, updateUserDetails };
