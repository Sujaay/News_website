import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Category from './pages/Category'; // Make sure this import is correct
import NotFound from './pages/NotFound'; // Make sure this import is correct

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:categoryName" component={Category} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
