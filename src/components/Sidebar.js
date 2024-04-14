import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="business">Business</Link></li>
          <li><Link to="tech">Technology</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/science">Science</Link></li>
          <li><Link to="/health">Health</Link></li>
          <li><Link to="/entertainment">Entertainment</Link></li>
          <li><Link to="/saved">Favourites</Link></li>
       
          {/* Add more category links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
