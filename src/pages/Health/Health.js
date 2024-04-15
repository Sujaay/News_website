import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHealthNews } from '../../utils/Health/HealthNewsapi';
import { getTrendingHealthNews } from '../../utils/Health/trendingHealthapi';
import './Health.css';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

function HealthPage() {
  const [data, setData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHealthNews();
        const filteredData = response.filter(article => article.urlToImage && !article.source.name.includes('Google') && !article.source.name.includes('Cricbuzz'));
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health news:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getTrendingHealthNews();
        setTrending(response.slice(0, 10));
      } catch (error) {
        console.error('Error fetching trending health news:', error);
      }
    };

    fetchTrending();
  }, []);

  const handleSaveArticle = async article => {
    try {
      await axios.post('http://localhost:5000/api/articles/save', article);
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    <div className="health-page">
      <header>
        <h1>HEALTH NEWS</h1>
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
            {data.length > 0 && (
              <div className="big-news">
                <div className="article-container">
                  <img src={data[0].urlToImage} alt={data[0].title} className="article-image" />
                  <div className="article-content">
                    <h2>
                      <a href={data[0].url} target="_blank" rel="noopener noreferrer">{data[0].title}</a>
                    </h2>
                    <p>{data[0].description}</p>
                    <button onClick={() => handleSaveArticle(data[0])}>Save</button>
                  </div>
                </div>
              </div>
            )}
            <div className='list-and-trending'>
              <div className="news-list-container">
                <h2>MORE NEWS STORIES</h2>
                {data.slice(1).map((article, index) => (
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
                  {trending.map((article, index) => (
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

export default HealthPage;

