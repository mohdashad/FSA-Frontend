// src/components/Register.js
import React, { useState } from 'react';
//import api from '../../api'; // Import the axios instance
import logo from '../../images/Logo.PNG'; // with import
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [message, setMessage] = useState(null)
  const [userData, setUserData] = useState({
    name:'',
    email: '',
    password: '',
    street:'',
    city:'',
    state:''


  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', userData);
      console.log('Book added:', response.data);
      // Clear form or redirect after successful submission
      setMessage('Registered successfully!');
      
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div class="register-container">
      <div className='wrapper'>
        <Link to="/">
        <img src={logo} alt='Logo'/>
        </Link>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Name"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          
          <input
            type="Street"
            name="street"
            placeholder="Street"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
          <input
            type="City"
            name="city"
            placeholder="City"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
          <input
            type="State"
            name="state"
            placeholder="State"
            //value={bookData.title}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            //value={bookData.title}
            onChange={handleChange}
            required
          />         
          <button type="submit">Register</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
