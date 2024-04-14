import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHealthNews } from '../utils/Health/HealthNewsapi'; 
import { getTrendingHealthNews } from '../utils/Health/trendingHealthapi'; 
import './Health.css'; 

function HealthPage() {
  const [healthNews, setHealthNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const data = await getHealthNews();
        // Filter out articles from certain sources or with specific criteria
        const filteredNews = data.filter(article => !isFromGoogleNews(article) && !isFromCricbuzz(article) && hasImage(article));
        setHealthNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health news:', error);
        setLoading(false);
      }
    };

    fetchHealthNews();
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
    const fetchTrendingHealthNews = async () => {
      try {
        const data = await getTrendingHealthNews(); // Replace with your API call to fetch trending health news
        const trendingData = data.slice(0, 10); // Adjust as needed
        setTrendingNews(trendingData);
      } catch (error) {
        console.error('Error fetching trending health news:', error);
      }
    };

    fetchTrendingHealthNews();
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
    <div className="health-page">
    <header>
      <h1 >HEALTH NEWS</h1>
      <nav>
        <ul>
          {/* Add more navigation links if needed */}
        </ul>
      </nav>
    </header>
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="news-container">
          {/* Big News */}
          {healthNews.length > 0 && (
            <div className="big-news">
              <div className="article-container">
                <img src={healthNews[0].urlToImage} alt={healthNews[0].title} className="article-image" />
                <div className="article-content">
                  <h2>
                    <a href={healthNews[0].url} target="_blank" rel="noopener noreferrer">{healthNews[0].title}</a>
                  </h2>
                  <p>{healthNews[0].description}</p>
                  <button onClick={() => handleSaveArticle(healthNews[0])}>Save</button>
                </div>
              </div>
            </div>
          )}
          {/* Regular News List */}

          <div className='list-and-trending'>
          <div className="news-list-container">
            <h2>MORE NEWS STORIES</h2>
            {healthNews.slice(1).map((article, index) => (
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
    <footer>
      {/* Footer content */}
    </footer>
  </div>
);
}

export default HealthPage;
