
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSportsNews } from '../utils/Sports/SportsNewsapi';
import './Sports.css';
import { getTrendingSportsNews } from '../utils/Sports/trendingSportsapi';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SportsPage() {
  const [sportsNews, setSportsNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const data = await getSportsNews();
        // Filter out articles from Google News and Cricbuzz
        const filteredNews = data.filter(article => !isFromGoogleNews(article) && !isFromCricbuzz(article) && hasImage(article));
        setSportsNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports news:', error);
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  // Function to check if the article is from Google News
  const isFromGoogleNews = (article) => {
    return article.source.name.toLowerCase().includes('google');
  };

  // Function to check if the article is from Cricbuzz
  const isFromCricbuzz = (article) => {
    return article.source.name.toLowerCase().includes('cricbuzz');
  };

  const hasImage = (article) => {
    return !!article.urlToImage; // Returns true if urlToImage is not null or undefined
  };

  // Fetch trending news
  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        // Fetch trending news from API
        const data = await getTrendingSportsNews(); // Replace getTrendingNews() with your actual API call function
        const trendingData = data.slice(0, 10);
        setTrendingNews(trendingData);
        
      } catch (error) {
        console.error('Error fetching trending news:', error);
      }
    };

    fetchTrendingNews();
  }, []);


  const [saved, setSaved] = useState(false); // State to track if article is saved

  const handleSaveArticle = async (articleData) => {
    try {
      // Send a POST request to save the article
      await axios.post('http://localhost:5000/api/articles/save', articleData);
      setSaved(true); // Set saved state to true
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

 


  return (
    <div className="sports-page">
      <Navbar/>
      <header>
        <h1 >SPORTS NEWS</h1>
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
            {sportsNews.length > 0 && (
              <div className="big-news">
                <div className="article-container">
                  <img src={sportsNews[0].urlToImage} alt={sportsNews[0].title} className="article-image" />
                  <div className="article-content">
                    <h2>
                      <a href={sportsNews[0].url} target="_blank" rel="noopener noreferrer">{sportsNews[0].title}</a>
                    </h2>
                    <p>{sportsNews[0].description}</p>
                    <button onClick={() => handleSaveArticle(sportsNews[0])}>Save</button>
                  </div>
                </div>
              </div>
            )}
            {/* Regular News List */}

            <div className='list-and-trending'>
            <div className="news-list-container">
              <h2>MORE NEWS STORIES</h2>
              {sportsNews.slice(1).map((article, index) => (
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

export default SportsPage;
