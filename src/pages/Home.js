import React, { useState, useEffect } from 'react';
import NewsItem from '../components/NewsItem';
import { getNews } from '../utils/api'; // Assuming you have a function to fetch news from your API
import Loader from '../components/Loader'; // Example loader component
import Error from '../components/Error'; // Example error component
import './Home.css'; // Import custom styles for the home page
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  

  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        const data = await getNews(); 
        const filteredNews = data.filter(article => !isFromGoogleNews(article) && !isFromCricbuzz(article) && hasImage(article));
        setNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching science news:', error);
        setLoading(false);
      }
    };

    fetchHomeNews();
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

  

  const handleSaveArticle = async (articleData) => {
    try {
      await axios.post('http://localhost:5000/api/articles/save', articleData);
      // Handle successful save
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };
  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const data = await getNews(); // Fetch news from API
  //       setNews(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <Error message={error} />; 
  // }


  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h2>Latest News</h2>
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className='news-article'>
              <NewsItem article={article} />
              <button onClick={() => handleSaveArticle(article)}>Save</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
  

}
export default Home;
