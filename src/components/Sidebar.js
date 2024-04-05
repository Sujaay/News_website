import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/business">Business</Link></li>
          <li><Link to="/category/technology">Technology</Link></li>
          <li><Link to="/category/sports">Sports</Link></li>
          {/* Add more category links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
