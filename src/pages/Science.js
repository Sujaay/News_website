import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTrendingScienceNews } from '../utils/Science/trendingScienceapi';
import { getScienceNews } from '../utils/Science/ScienceNewsapi';
import './Science.css'; // Assuming you have a CSS file for styling

function SciencePage() {
  const [scienceNews, setScienceNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScienceNews = async () => {
      try {
        const data = await getScienceNews();
        // Filter out articles from certain sources or with specific criteria
        const filteredNews = data.filter(article => !isFromGoogleNews(article) && !isFromCricbuzz(article) && hasImage(article));
        setScienceNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching science news:', error);
        setLoading(false);
      }
    };

    fetchScienceNews();
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
    const fetchTrendingScienceNews = async () => {
      try {
        const data = await getTrendingScienceNews(); // Replace with your API call to fetch trending science news
        const trendingData = data.slice(0, 10); // Adjust as needed
        setTrendingNews(trendingData);
      } catch (error) {
        console.error('Error fetching trending science news:', error);
      }
    };

    fetchTrendingScienceNews();
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
    <div className="science-page">
    <header>
      <h1 >SCIENCE NEWS</h1>
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
          {scienceNews.length > 0 && (
            <div className="big-news">
              <div className="article-container">
                <img src={scienceNews[0].urlToImage} alt={scienceNews[0].title} className="article-image" />
                <div className="article-content">
                  <h2>
                    <a href={scienceNews[0].url} target="_blank" rel="noopener noreferrer">{scienceNews[0].title}</a>
                  </h2>
                  <p>{scienceNews[0].description}</p>
                  <button onClick={() => handleSaveArticle(scienceNews[0])}>Save</button>
                </div>
              </div>
            </div>
          )}
          {/* Regular News List */}

          <div className='list-and-trending'>
          <div className="news-list-container">
            <h2>MORE NEWS STORIES</h2>
            {scienceNews.slice(1).map((article, index) => (
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

export default SciencePage;
