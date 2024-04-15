const express = require('express');
const router = express.Router();
const User = require('../models/Viewer');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user in the database
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});




module.exports = router;


// Route to handle user login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Route to handle user registration
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();
 
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


//   // Route to handle user logout
//   router.post('/logout', async (req, res) => {
//     console.log('Received a POST request to /api/auth/logout');
//     try {
//       res.status(200).json({ message: 'User logged out successfully' });
//     } catch (error) {
//       console.error('Error logging out user:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

//   router.post('/change-password', async (req, res) => {
//     console.log('Received a POST request to /api/auth/change-password');
//     try {
//       res.status(200).json({ message: 'Password changed successfully' });
//     } catch (error) {
//       console.error('Error changing password:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

//   // Route to fetch user data when logged in
//   router.get('/user', async (req, res) => {
//     console.log('Received a GET request to /api/auth/user');
//     try {
//       res.status(200).json({ message: 'User data fetched successfully' });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   })

// module.exports = router;
