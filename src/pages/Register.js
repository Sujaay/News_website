import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    onRegister(response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error('Registration failed:', error.response.data);
      setError('Registration failed: ' + error.response.data.error);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      setError('Registration failed: No response received');
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message);
      setError('Registration failed: ' + error.message);
    }
  }
};


  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
