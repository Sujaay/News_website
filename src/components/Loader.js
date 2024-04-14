import React from 'react';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <div className="loader-text">{text}</div>
    </div>
  );
};

export default Loader;
