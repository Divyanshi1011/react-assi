// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('./models/User'); // Assuming you have a User model

const app = express();
const port = 5000;

// Enable CORS
app.use(cors()); // This will allow requests from all origins by default
// If needed, restrict CORS to a specific domain:
// app.use(cors({
//   origin: 'http://localhost:3000' // Only allow requests from frontend running on port 3000
// }));

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// User Registration Route
app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Check if email is already taken
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email is already registered.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log(`Server is running on http://localhost:${3001}`);
});
