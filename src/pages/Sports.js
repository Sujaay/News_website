


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getSportsNews } from '../utils/SportsNewsapi';
// import './Sports.css';

// function SportsPage() {
//   const [sportsNews, setSportsNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSportsNews = async () => {
//       try {
//         const data = await getSportsNews();
//         setSportsNews(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching sports news:', error);
//         setLoading(false);
//       }
//     };

//     fetchSportsNews();
//   }, []);

//   // Filter out news articles without images
//   const newsWithImages = sportsNews.filter(article => article.urlToImage);

//   // Fallback image URL
//   const fallbackImageUrl = 'https://via.placeholder.com/150'; // Placeholder image URL

//   return (
//     <div className="sports-page">
//       <header>
//         <h1>Sports News</h1>
//         <nav>
//           <ul>
//             {/* Add more navigation links if needed */}
//           </ul>
//         </nav>
//       </header>
//       <main>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul className="news-list">
//             {/* Render first news with larger size */}
//             {newsWithImages.length > 0 && (
//               <li className="news-item big-news">
//                 <div className="article-container">
//                   <img src={newsWithImages[0].urlToImage || fallbackImageUrl} alt={newsWithImages[0].title} className="article-image" />
//                   <div className="article-content">
//                     <h2>
//                       <a href={newsWithImages[0].url} target="_blank" rel="noopener noreferrer">{newsWithImages[0].title}</a>
//                     </h2>
//                     <p>{newsWithImages[0].description}</p>
//                   </div>
//                 </div>
//               </li>
//             )}
//             {/* Render rest of the news */}
//             {newsWithImages.slice(1).map((article, index) => (
//               <li key={index} className="news-item regular-news">
//                 <div className="article-container">
//                   <img src={article.urlToImage || fallbackImageUrl} alt={article.title} className="article-image" />
//                   <div className="article-content">
//                     <h2>
//                       <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
//                     </h2>
//                     <p>{article.description}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </main>
//       <footer>
//         {/* Footer content */}
//       </footer>
//     </div>
//   );
// }

// export default SportsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSportsNews } from '../utils/SportsNewsapi';
import './Sports.css';
import { getTrendingSportsNews } from '../utils/trendingSportsapi';

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

  return (
    <div className="sports-page">
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
