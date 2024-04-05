import React from 'react';

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage } = article;

  return (
    <div className="news-item">
      <img src={urlToImage} alt={title} />
      <div>
        <h3><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NewsItem;
