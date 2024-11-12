import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Replace with actual API request
    const fakeResetResponse = { success: true };

    if (fakeResetResponse.success) {
      setMessage('A password reset link has been sent to your email.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } else {
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div class="wrapper">
      <form onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
        
        {message && <p>{message}</p>} {/* Display success or error message */}
      </form>
    </div>
  );
};

export default ForgotPassword;
