import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './pages/Home';
import NotFound from './pages/NotFound'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SportsPage from './pages/Sports';
import SavedArticlesPage from './pages/Favourite';
import TechnologyPage from './pages/Technology';
import SciencePage from './pages/Science';
import BusinessPage from './pages/Business';
import HealthPage from './pages/Health';
import EntertainmentPage from './pages/Entertainment';
import LoginPage from './pages/LoginPage';

const App = () => {
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
            <Route path="/saved" element={<SavedArticlesPage />} />
            <Route path='/loginPage' element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Router>
  );
};

export default App;

