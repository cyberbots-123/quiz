
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { assets } from '../../assets/asstes';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateUsername = (value) => {
    if (value.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
      return 'Username can only contain letters, numbers, and spaces';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }
    return '';
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    const error = validateUsername(value);
    setUsernameError(error);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setEmailError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameError || emailError || !username || !email) {
      console.log('Validation errors exist. Cannot submit form.');
      return;
    }

    // Check if the user is Admin
    if (username === 'Admin' && email === 'cyberbots.yogesh@gmail.com') {
      console.log('Admin login detected, navigating to Admin Panel.');
      navigate('/admin'); // Navigate to the admin panel
      return;
    }

    const requestBody = { username, email };

    try {
      console.log('Sending request to API...');
      const response = await fetch(
        isLogin ? 'http://quizapi.cyberbots.in/api/auth/login' : 'http://quizapi.cyberbots.in/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('API error response:', errorData);
        setUsernameError(errorData.message || 'Failed to process the request');
      } else {
        console.log('Request succeeded, navigating to /quiz');
        navigate(`/quiz?username=${username}&email=${email}`); // Pass username and email as query parameters
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setUsernameError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <img src={assets.Logo} alt="Company Logo" />
      </div>
      <div className="form-section">
        <h2>{isLogin ? 'Login to Quiz' : 'Sign Up for Quiz'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={!!usernameError || !!emailError}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-message">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="toggle-link"
            onClick={() => {
              setIsLogin(!isLogin);
              setUsername('');
              setEmail('');
              setUsernameError('');
              setEmailError('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
