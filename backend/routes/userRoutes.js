// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate input
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Check if email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ success: false, message: 'Email already in use.' });
  }

  try {
    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
