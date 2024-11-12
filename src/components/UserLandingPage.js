import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios';

const UserLandingPage = () => {

  

  //console.log('useAuth'+useAuth.user);
  // State for user data (you'd usually fetch this from an API)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
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
     
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser({
          name: response.data.name,
          email: 'john.doe@example.com',
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
        <h1>Welcome back, {user.name}!</h1>
        <p>Your Book Exchange Dashboard</p>
      </header>

      <section className="user-actions">
        <div className="action-buttons">
          <Link to="/books" className="action-button">View Books</Link>
          <Link to="/add-book" className="action-button">Add New Book</Link>
          <Link to="/exchanges" className="action-button">My Exchanges</Link>
          <Link to="/edit-profile" className="action-button">Edit Profile</Link>
        </div>
      </section>

      <section className="user-stats">
        <h2>Your Stats</h2>
        <div className="stats">
          <div className="stat-item">
            <h3>{user.booksListed}</h3>
            <p>Books Listed</p>
          </div>
          <div className="stat-item">
            <h3>{user.booksExchanged}</h3>
            <p>Books Exchanged</p>
          </div>
          <div className="stat-item">
            <h3>{user.booksRequested}</h3>
            <p>Books Requested</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default UserLandingPage;
