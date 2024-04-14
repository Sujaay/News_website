import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Handle login logic here (e.g., call an API to authenticate)
      console.log('Login with email:', email, 'password:', password);
      // Implement login logic using your backend API (not shown here)
    } else {
      // Handle registration logic here (e.g., call an API to create user)
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.success) {
          console.log('Registration successful!');
          // Handle successful registration (e.g., redirect to login page)
        } else {
          console.error('Registration failed:', data.error);
          // Handle registration error (e.g., display error message)
        }
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle network or other errors
      }
    }

    // Reset form fields after submission (optional)
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleContinueReading = () => {
    // Redirect to the homepage
    window.location.href = '/home'; // Assuming your homepage URL is '/'
  };

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
