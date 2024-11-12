// src/components/Login.js
import React, { useState } from 'react';
import './styles/style.css'; // We'll create this CSS file next
import logo from './images/LOGO.PNG'; // with import

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  //const logo = require('./logo.jpeg'); // with require

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send login request to the backend
    console.log('Login attempt', credentials);
  };

  return (
    <div className="login-container">
      
      <h2>Welcome to Book Exchange Hello</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
