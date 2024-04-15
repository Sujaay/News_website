// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';


// const Register = ({ onRegister }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
//     onRegister(response.data);
//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status code outside of 2xx range
//       console.error('Registration failed:', error.response.data);
//       setError('Registration failed: ' + error.response.data.error);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error('No response received:', error.request);
//       setError('Registration failed: No response received');
//     } else {
//       // Something else happened while setting up the request
//       console.error('Error setting up request:', error.message);
//       setError('Registration failed: ' + error.message);
//     }
//   }
// };


//   return (
//     <div>
//       <h2>Register</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       <p>Already have an account? <Link to="/login">Login</Link></p>
//     </div>
//   );
// };

// export default Register;
// import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(response.data); // Assuming you want to log the response
      // Handle successful registration, such as redirecting to login page
      setRegistered(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };


  if (registered) {
    // Redirect to login page after successful registration and alert message
    alert('Registration successful! Please login.');
    window.location.href = '/login';
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
