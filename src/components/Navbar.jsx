import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">News Website</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/business" className="nav-link">Business</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/technology" className="nav-link">Technology</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/sports" className="nav-link">Sports</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/health" className="nav-link">Health</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/sports" className="nav-link">Sports</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/sports" className="nav-link">Sports</Link>
            </li>
            <li className="nav-item">
              <Link to="/category/sports" className="nav-link">Sports</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
