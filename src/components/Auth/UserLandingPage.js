import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css';
import axios from 'axios';
import ViewBooks from '../Books/BookList';

const UserLandingPage = () => {

  

  //console.log('useAuth'+useAuth.user);
  // State for user data (you'd usually fetch this from an API)
  const [user, setUser] = useState({
    Name: 'John Doe',
    Email: 'john.doe@example.com',
    booksListed: 5,
    booksExchanged: 2,
    booksRequested: 3,
  });

  // Simulate fetching user data from an API
  useEffect(() => {
     // Example of setting new user data (you could use an API here)
     const token = localStorage.getItem('token');
    // In a real app, fetch user data from the backend here   
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);

        setUser({
          Name:response.data.Name,
          Email: response.data.Email,
          booksListed: 5,
          booksExchanged: 2,
          booksRequested: 3,
        });

        //console.log(response.data); // This is your user detail object
      } catch (error) {
        console.error('Error fetching user details', error);
      }
      
    };
    
      fetchUserData();
  
  }, []);

  return (
    <div className="user-landing-container">
      <header className="user-hero-section">
        <h1>Welcome back, {user.Name}!</h1>
        <p>Your Book Exchange Dashboard</p>
        <section className="user-actions">
        <div className="action-buttons">
          <Link to="/add-book" className="action-button">Add New Book</Link>
          <Link to="/exchanges" className="action-button">My Exchanges</Link>
        </div>
      </section>
        
        
      </header>

      

      
      <ViewBooks/>
      
    </div>
  );
};

export default UserLandingPage;
