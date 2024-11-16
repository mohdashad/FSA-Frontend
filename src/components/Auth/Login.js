// src/components/Login.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
//import logo from '../../images/Logo.PNG'; // with import
import LogoSection from './../LogoSection'; // with import from '../../images/Logo.PNG'; // with import


const Login = () => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      //const response={ok:true, token: 'sampleAuthToken', user: { name: 'John Doe' } };
      //const data = response.json();
      console.log('response.token'+JSON.stringify(data));
      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token        
        login(data.user);
        navigate('../../dashboard'); // Redirect to home page
      } else {
        setError(data.msg); // Show error message from API
      }
    } catch (error) {
      setError('Something went wrong. Please try again.'+error.message);
    }
  };

  return (
    <div className="login-container">
      <LogoSection title={'Welcome To Book Exchange Platform'}/>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="password"
          name="Password"
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
      {error && <p className="error-message">{error}</p>}
      <div className='login-links'>
        <Link to="/register">Don't Have Account ?</Link>
        <Link to="/forgot-password">Trouble In Login ?</Link>
        <Link to="/FAQ">Need Help ?</Link>
      </div>
    </div>
  );
};

export default Login;
