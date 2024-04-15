import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { getBusinessNews } from '../utils/Business/BusinessNewsapi'; 
import { getTrendingBusinessNews } from '../../utils/Business/trendingBusinessapi'; 
import './Business.css'; 
import Navbar from '../../components/Navbar/Navbar';
import { getBusinessNews } from '../../utils/Business/BusinessNewsapi';

function BusinessPage() {
  const [businessNews, setBusinessNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const data = await getBusinessNews();
        // Filter out articles from certain sources or with specific criteria
        const filteredNews = data.filter(article => !isFromGoogleNews(article) && !isFromCricbuzz(article) && hasImage(article));
        setBusinessNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business news:', error);
        setLoading(false);
      }
    };

    fetchBusinessNews();
  }, []);

  const hasImage = (article) => {
    return !!article.urlToImage; // Returns true if urlToImage is not null or undefined
  };
  

  const isFromGoogleNews = (article) => {
    return article.source.name.toLowerCase().includes('google');
  };

  // Function to check if the article is from Cricbuzz
  const isFromCricbuzz = (article) => {
    return article.source.name.toLowerCase().includes('cricbuzz');
  };


  useEffect(() => {
    const fetchTrendingBusinessNews = async () => {
      try {
        const data = await getTrendingBusinessNews(); // Replace with your API call to fetch trending business news
        const trendingData = data.slice(0, 10); // Adjust as needed
        setTrendingNews(trendingData);
      } catch (error) {
        console.error('Error fetching trending business news:', error);
      }
    };

    fetchTrendingBusinessNews();
  }, []);

  const handleSaveArticle = async (articleData) => {
    try {
      await axios.post('http://localhost:5000/api/articles/save', articleData);
      // Handle successful save
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    
    <div className="business-page">
    <header>
      <h1 >BUSINESS NEWS</h1>
    </header>
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="news-container">
          {/* Big News */}
          {businessNews.length > 0 && (
            <div className="big-news">
              <div className="article-container">
                <img src={businessNews[0].urlToImage} alt={businessNews[0].title} className="article-image" />
                <div className="article-content">
                  <h2>
                    <a href={businessNews[0].url} target="_blank" rel="noopener noreferrer">{businessNews[0].title}</a>
                  </h2>
                  <p>{businessNews[0].description}</p>
                  <button onClick={() => handleSaveArticle(businessNews[0])}>Save</button>
                </div>
              </div>
            </div>
          )}
          {/* Regular News List */}

          <div className='list-and-trending'>
          <div className="news-list-container">
            <h2>MORE NEWS STORIES</h2>
            {businessNews.slice(1).map((article, index) => (
              <div key={index} className="news-list">
                <div className="article-container">
                  <img src={article.urlToImage} alt={article.title} className="article-image" />
                  <div className="article-content">
                    <h2>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                    </h2>
                    <p>{article.description}</p>
                    <button onClick={() => handleSaveArticle(article)}>Save</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Trending News */}
          <div className="trending-news-container">
            <h2>Trending News from around the world</h2>
            <ul>
              {trendingNews.map((article, index) => (
              <div key={index} className="trending-news-list">
                <div className="article-container">
                  <div className="article-content">
                    <p>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                    </p>
                    <p>{article.description}</p>
                  </div>
                </div>
              </div>
            ))}
            </ul>
          </div>
          </div>

        </div>
      )}
    </main>
  </div>
);
}

export default BusinessPage;
