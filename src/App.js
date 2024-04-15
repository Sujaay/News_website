import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Routes
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
import { useState } from 'react';
import Register from './pages/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
            <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/tech" element={< TechnologyPage/>} />
            <Route path="/science" element={< SciencePage/>} />
            <Route path="/health" element={< HealthPage/>} />
            <Route path="/entertainment" element={< EntertainmentPage/>} />
            <Route path="/business" element={< BusinessPage/>} />
            {/* <Route path="/saved" element={<SavedArticlesPage />} /> */}
            {/* <Route path='/loginPage' element={<LoginPage />} /> */}
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={< Register/>} />
    

        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/saved" element={loggedIn ? <SavedArticlesPage /> : <Navigate to="/login" />} />

          </Routes>
    </Router>
  );
};

export default App;

