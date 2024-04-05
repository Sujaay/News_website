import React, { useState, useEffect } from 'react';
import NewsItem from '../components/NewsItem';
import { getNews } from '../utils/api'; // assuming you have a function to fetch news from your API

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews(); // fetch news from API
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Latest News</h2>
      {news.map((article, index) => (
        <NewsItem key={index} article={article} />
      ))}
    </div>
  );
};

export default Home;
