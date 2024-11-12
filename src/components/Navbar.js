import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext'

const Navbar = () => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };


  return (
    
      <nav>
        <div className='wrapper'>
        <h2>Book Exchange Platform</h2>
          
        

        {!isAuthenticated ? (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>
          </ul>
        ) : (
          <ul>        
              
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/exchanges">Book Exchange</Link>
              </li> 
              
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/notification">Notification</Link>
              </li>
              <li>
                <span href="#" className="logout" onClick={handleLogout}>Logout</span>
              </li>
          </ul>
        )}
      </div>   
    </nav>
    
  );
};

export default Navbar;
