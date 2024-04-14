import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(''); // Clear any previous error messages

    if (isLogin) {
      // Login logic
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });

        const data = response.data;
        if (data.success) {
          console.log('Login successful!');
          // Handle successful login (e.g., redirect to protected routes)
        } else {
          setErrorMessage(data.error || 'Login failed.'); // Display error message
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setErrorMessage('Network error or unexpected issue.'); // Generic error message
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return; // Prevent further processing if passwords don't match
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
        });

        const data = response.data;
        if (data.success) {
          console.log('Registration successful!');
          // Handle successful registration (e.g., redirect to login page)
          setIsLogin(true); // Switch to login mode after successful registration
        } else {
          setErrorMessage(data.error || 'Registration failed.'); // Display error message
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrorMessage('Network error or unexpected issue.'); // Generic error message
      }
    }
  };

  // Function to handle continue reading button (optional)
  const handleContinueReading = () => {
    // Redirect to the homepage
    window.location.href = '/home';
  };

  // Optional: Fetch user data on successful login (if applicable)
  useEffect(() => {
    const fetchUserData = async () => {
      // Assuming you have a separate API endpoint to fetch user data
      const response = await axios.get('http://localhost:5000/api/auth/user');
      const data = response.data;
      if (data.success) {
        console.log('User data fetched:', data.user);
        // Handle fetched user data (e.g., store in state or context for access)
      }
    };

    // Only fetch user data if logged in
    if (!isLogin) {
      return;
    }

    fetchUserData(); // Call the fetch function on successful login
  }, [isLogin]);

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
      <p>Or</p>
      <button className="btn btn-outline-secondary" onClick={handleContinueReading}>
        Continue Reading Without Login
      </button>
      <button className="btn btn-outline-primary">Login with Google</button>
    </div>
  );
};

export default LoginPage;
