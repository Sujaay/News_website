import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './pages/Home';
import Category from './pages/Category'; // Make sure this import is correct
import NotFound from './pages/NotFound'; // Make sure this import is correct
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Navbar/>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
