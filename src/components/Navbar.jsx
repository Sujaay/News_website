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
              <Link to="business" className="nav-link">Business</Link>
            </li>
            <li className="nav-item">
              <Link to="tech" className="nav-link">Technology</Link>
            </li>
            <li className="nav-item">
              <Link to="/sports" className="nav-link">Sports</Link>
            </li>
            <li className="nav-item">
              <Link to="/health" className="nav-link">Health</Link>
            </li>
            <li className="nav-item">
              <Link to="/science" className="nav-link">Science</Link>
            </li>
            <li className='nav-item'>
              <Link to="/entertainment" className="nav-link">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link to="/saved" className="nav-link">Favourites</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
