import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-auto py-3">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} News Website. All rights reserved.</p>
        <p>Designed and developed with ❤️ by Shaurya, Sujay, Tanvi</p>
      </div>
    </footer>
  );
};

export default Footer;
