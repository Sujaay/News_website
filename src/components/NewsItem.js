import React from 'react';

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;

  return (
    <div className="news-item">
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-item-link">
        <div className="news-item-image">
          {urlToImage && <img src={urlToImage} alt={title} />}
        </div>
        <div className="news-item-content">
          <h3 className="news-item-title">{title}</h3>
          <p className="news-item-description">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default NewsItem;
