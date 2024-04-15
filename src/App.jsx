import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound'; 
import SportsPage from './pages/Sports/Sports';
import SavedArticlesPage from './pages/Favourite';
import TechnologyPage from './pages/Technology/Technology';
import SciencePage from './pages/Science/Science';
import BusinessPage from './pages/Business/Business';
import HealthPage from './pages/Health/Health';
import EntertainmentPage from './pages/Entertainment/Entertainment';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Assume login logic here
    setLoggedIn(true);
    // Save to localStorage
    localStorage.setItem('loggedIn', true);
  };

  const handleLogout = () => {
    // Assume logout logic here
    setLoggedIn(false);
    // Remove from localStorage
    localStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    // Load loggedIn state from localStorage
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/tech" element={<TechnologyPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/register" element={<Register />} />
        {/* Pass handleLogin function to LoginPage */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* Use loggedIn state to conditionally render SavedArticlesPage */}
        <Route path="/saved" element={loggedIn ? <SavedArticlesPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
