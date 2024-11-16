import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId=localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:5000/api/users/password-change', {
                userId,
                oldPassword,
                newPassword,
            });
            setError(false);
            setMessage(response.data.message+ ' Please wait while we we redirecting you to login');
            // Set a 10-second delay before redirecting
            setTimeout(() => {
                logout();
                navigate('/login'); // Change to your target page path
            }, 5000); // 10000 milliseconds = 10 seconds
            
            
        } catch (error) {
            setError(true);
            setMessage(error.response.data.message || "Error updating password");
        }
    };

    return (
        <div>
            <header className="user-hero-section">
                <h1>Change Password</h1>
            </header>
        
        <div className='wrapper'>
         
            { !message || error ? (
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>
            ):(
              <p >{message}</p>
            )}

            { error && <p >{message}</p>}
        </div>
        </div>
        
    );
}

export default ChangePassword;
