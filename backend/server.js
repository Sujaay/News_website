// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth'); // Import auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

// Connect to MongoDB
<<<<<<< HEAD

// const MONGODB_URI = 'mongodb+srv://tanaya0222:User123@cluster0.maw7mev.mongodb.net/'; // Change this to your MongoDB connection string
const MONGODB_URI='mongodb+srv://tanaya0222:User123@cluster0.maw7mev.mongodb.net/'
=======
const MONGODB_URI = 'mongodb+srv://tanaya0222:User123@cluster0.maw7mev.mongodb.net/news_db'; // Change this to your MongoDB connection string, including database name
>>>>>>> 68864a24f65b19e2d945f93eef5e578a0e9f07ad
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection failed:', error);
  });
