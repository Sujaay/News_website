import React, { useState, useEffect } from 'react';
import NewsItem from '../components/NewsItem';
import { getNews } from '../utils/api'; // Assuming you have a function to fetch news from your API
import Loader from '../components/Loader'; // Example loader component
import Error from '../components/Error'; // Example error component
import './Home.css'; // Import custom styles for the home page
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(); // Fetch news from API
        setNews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />; 
  }

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h2>Latest News</h2>
        <div className="news-grid">
          {news.map((article, index) => (
            <NewsItem key={index} article={article} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
