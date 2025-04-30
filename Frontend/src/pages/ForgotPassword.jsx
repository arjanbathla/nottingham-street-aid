import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:8999/api/request-reset', { email });
      localStorage.setItem('resetEmail', email); // Store email for next steps
      navigate('/verify-code');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Code</button>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
