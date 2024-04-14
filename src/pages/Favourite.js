// SavedArticlesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favourite.css';
import Navbar from '../components/Navbar';

function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles/saved');
        setSavedArticles(response.data);
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    };

    fetchSavedArticles();
  }, [savedArticles]);




  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/delete/${id}`);
      // Remove the deleted article from the savedArticles state
      setSavedArticles(savedArticles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error); // Log the error
      if (error.response && error.response.status === 404) {
        console.error('Article not found'); // Log an error message for 404 status code
        // Optionally, you can also set a message to display to the user
        // setError('The article you are trying to delete does not exist');
      } else {
        console.error('An unexpected error occurred'); // Log an error message for other status codes
        // setError('An unexpected error occurred while deleting the article');
      }
    }
  };
  
  return (
    <div className='Saved-news'>
      <Navbar/>
      <h1>Saved Articles</h1>
      <div className='container'>
        {savedArticles.map((article) => (
          <div key={article._id} className= 'news-articles'>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-image" />}

            {/* <img src={article.urlToImage} alt={article.title} className="articles-image" /> */}
              <div className="articles-content">
              <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              </h2>
              <p>{article.description}</p>
              <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
             </div>
       
             </div>
        ))}
     </div>
    </div>
  )

}
export default SavedArticlesPage;
