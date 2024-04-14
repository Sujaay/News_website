// models/Article.js

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true  }
  // Add more fields as needed
});

module.exports = mongoose.model('Article', articleSchema);
