import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:8999/api/verify-code', { email, code });
      localStorage.setItem('resetCode', code);
      navigate('/reset-password');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong.');
    }
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleSubmit}>
        <label>6-Digit Code:</label>
        <input
          type="text"
          maxLength="6"
          pattern="\d{6}"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default VerifyCode;
