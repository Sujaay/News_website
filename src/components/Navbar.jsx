// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
import React, { useEffect } from 'react';
import './Navbar.css'; // Import your CSS file

import { Link } from 'react-router-dom';
const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/business', text: 'Business' },
  { to: '/tech', text: 'Technology' },
  { to: '/sports', text: 'Sports' },
  { to: '/health', text: 'Health' },
  { to: '/science', text: 'Science' },
  { to: '/entertainment', text: 'Entertainment' },
  { to: '/saved', text: 'Favorites' },
  { to: '/login', text: 'Login' },
  // Add more navigation links as needed
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">News Website</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link to={link.to} className="nav-link">{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




  
  
 



