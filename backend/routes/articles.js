// backend/routes/articles.js

const express = require('express');
const router = express.Router();
const Article = require('../models/Articles');

// Route to save an article
router.post('/save', async (req, res) => {
  console.log('Received a POST request to /api/articles/save');
  console.log('Request body:', req.body);
  try {
    const { title, description, url, urlToImage } = req.body;
    // Ensure that imageUrl is included in the request body
    if (!title || !description || !url || !urlToImage) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Extracted fields:', { title, description, url, urlToImage });
    const newArticle = new Article({ title, description, url, urlToImage });
    await newArticle.save();
 
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/saved', async (req, res) => {
  try {
    const savedArticles = await Article.find();
    res.json(savedArticles);
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
