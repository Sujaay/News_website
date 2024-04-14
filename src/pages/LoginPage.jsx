import React, { useState } from 'react';
import './LoginPage.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirmation

  const handleSubmit = async (e) => { // Made async for potential API calls
    e.preventDefault();

    if (isLogin) {
      // Handle login logic here (e.g., call an API to authenticate)
      console.log('Login with email:', email, 'password:', password);
    } else {
      // Handle registration logic here (e.g., call an API to create user)
      if (password !== confirmPassword) {
        alert('Passwords do not match!'); // Simple error handling
        return; // Prevent further processing if passwords don't match
      }
      console.log('Register with email:', email, 'password:', password);
    }

    // Reset form fields after submission (optional)
    // setEmail('');
    // setPassword('');
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
        { // Add confirmation field only during registration
          !isLogin && (
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.preventDefault(e.target.value))}
                required
              />
            </div>
          )
        }
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
