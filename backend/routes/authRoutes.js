const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Signup error: User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const user = new User({ username, email });
    const savedUser = await user.save();
    console.log('User signed up successfully:', savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log('Error during signup:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ email, username });
    if (!user) {
      console.log('Login error: Invalid credentials for username or email:', { username, email });
      return res.status(401).json({ message: 'Invalid username or email.' });
    }

    console.log('User logged in successfully:', user);
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log('Error during login:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;



