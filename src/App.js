import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
// import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
// import Category from './pages/Category'; // Make sure this import is correct
import NotFound from './pages/NotFound'; // Make sure this import is correct
import SportsPage from './pages/Sports';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <div className="container">
          <Sidebar/>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<Home />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
