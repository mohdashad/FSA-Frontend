// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Home = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalExchanges: 0,
    activeUsers: 0,
  });

  // Simulate fetching stats (this would typically come from an API)
  useEffect(() => {
    // Fake API call to get statistics
    const fetchStats = () => {
      setStats({
        totalBooks: 120, // Example data
        totalExchanges: 75,
        activeUsers: 45,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to the Book Exchange Platform</h1>
        <p>Trade, Share, and Discover New Books</p>
        <Link to="/books" className="cta-button">Browse Books</Link>
      </header>

      {/* Statistics Section */}
      <section className="statistics">
        <h2>Platform Statistics</h2>
        <div className="stats">
          <div className="stat-item">
            <h3>{stats.totalBooks}</h3>
            <p>Books Available</p>
          </div>
          <div className="stat-item">
            <h3>{stats.totalExchanges}</h3>
            <p>Exchanges Made</p>
          </div>
          <div className="stat-item">
            <h3>{stats.activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>
      </section>

      {/* Book Categories Section */}
      <section className="categories">
        <h2>Popular Book Categories</h2>
        <div className="category-list">
          <div className="category-item">
            <h3>Fiction</h3>
            <Link to="/books?category=fiction" className="category-link">Browse Fiction</Link>
          </div>
          <div className="category-item">
            <h3>Non-Fiction</h3>
            <Link to="/books?category=non-fiction" className="category-link">Browse Non-Fiction</Link>
          </div>
          <div className="category-item">
            <h3>Science Fiction</h3>
            <Link to="/books?category=science-fiction" className="category-link">Browse Sci-Fi</Link>
          </div>
          <div className="category-item">
            <h3>Biographies</h3>
            <Link to="/books?category=biographies" className="category-link">Browse Biographies</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="call-to-action">
        <h2>Ready to Exchange?</h2>
        <p>Sign up today and start exchanging books with other book lovers!</p>
        <Link to="/register" className="cta-button">Sign Up</Link>
      </section>
    </div>
  );
};

export default Home;
