import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation for email and password
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    console.log("Login attempt with:", { email, password });

    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password,
      });
      

      const { token } = response.data; // Extract token from response
      if (token) {
        // Store token in localStorage
        localStorage.setItem('token', token);

        // Call the onLogin function to update the login status
        onLogin();

        // Redirect user to the main page (or another route, like /dashboard)
        navigate('/main');
      }
    } catch (err) {
      console.error("Login error:", err);
      // Display error based on the response from the backend
      if (err.response) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('An error occurred during login');
      }
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-sm">
        <h2 className="text-center text-2xl py-4 font-bold">Login to Your Account</h2>

        {error && (
          <div className="error-message text-red-500 text-center mt-4">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:underline"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
