// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/Viewer');

// Route to handle user login
router.post('/login', async (req, res) => {
  console.log('Received a POST request to /api/auth/login');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    // Ensure that email and password are included in the request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Extracted fields:', { email, password });
    // Find the user by email and password in your database
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to handle user registration
router.post('/register', async (req, res) => {
  console.log('Received a POST request to /api/auth/register');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    // Ensure that email and password are included in the request body
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Extracted fields:', { email, password });
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user in the database
    const newUser = new User({ email, password });
    await newUser.save();
 
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
