// src/components/Register.js
import React, { useState } from 'react';
//import api from '../../api'; // Import the axios instance
import logo from '../../images/Logo.PNG'; // with import
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [message, setMessage] = useState(null)
  const [userData, setUserData] = useState({
    Name:'',
    Email: '',
    password: '',
    Address:'',
    ProfilePicture:''


  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/', userData);
      console.log('Book added:', response.data);
      // Clear form or redirect after successful submission
      setMessage('Registered successfully!');
      
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="register-container">
      <div className='wrapper'>
        <Link to="/">
        <img src={logo} alt='Logo'/>
        </Link>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="Name"
            placeholder="Name"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="Email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={userData.Password}
            onChange={handleChange}
            required
          />
          <br/>
          <textarea
            name="Address"
            placeholder="Address"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
              <br/>     
          <button type="submit">Register</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
