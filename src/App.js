import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound'; 
import SportsPage from './pages/Sports/Sports';
import SavedArticlesPage from './pages/Favourite';
import TechnologyPage from './pages/Technology/Technology';
import SciencePage from './pages/Science/Science';
import BusinessPage from './pages/Business/Business';
import HealthPage from './pages/Health/Health';
import EntertainmentPage from './pages/Entertainment/Entertainment';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import NavbarComponent from './components/Navbar/Navbar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <NavbarComponent loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/tech" element={<TechnologyPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/saved" element={loggedIn ? <SavedArticlesPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
