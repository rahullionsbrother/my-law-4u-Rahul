/**
 * ==============================================================================
 * MYLAW.COM - LOGIN PAGE
 * ==============================================================================
 * PURPOSE: Authenticate users via the live Node.js/PostgreSQL backend and 
 * redirect them to their specific portal based on their database role.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient'; // Import our API client

const Login = () => {
  // 1. HOOKS
  const navigate = useNavigate();

  // 2. STATE
  const [role, setRole] = useState('client'); // UI Default
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 3. HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Send credentials to the Node.js backend
      const response = await apiClient.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 2. Save the secure JWT token and user profile to LocalStorage
      localStorage.setItem('mylaw_token', response.data.token);
      localStorage.setItem('mylaw_user', JSON.stringify(response.data.user));

      // 3. Smart Redirection: Use the role strictly from the database response
      const userRole = response.data.user.role;
      
      if (userRole === 'client') {
        navigate('/client/dashboard');
      } else if (userRole === 'advocate') {
        navigate('/advocate/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/'); // Fallback
      }

    } catch (err) {
      // 4. Catch and display backend errors (e.g., "Invalid email or password")
      setError(
        err.response?.data?.error || 'Unable to connect to the authentication server.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container fade-in">
      
      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Welcome Back</h2>
        <p className="text-muted">
          Secure access to your <span className="text-primary fw-bold text-uppercase">{role}</span> portal.
        </p>
      </div>

      {/* ROLE SWITCHER */}
      <div className="bg-white p-1 rounded-pill border mb-4 d-flex">
        <button 
          type="button" 
          className={`btn rounded-pill flex-grow-1 ${role === 'client' ? 'btn-primary shadow-sm' : 'btn-white text-muted'}`}
          onClick={() => setRole('client')}
        >
          Client
        </button>
        <button 
          type="button" 
          className={`btn rounded-pill flex-grow-1 ${role === 'advocate' ? 'btn-warning text-dark shadow-sm' : 'btn-white text-muted'}`}
          onClick={() => setRole('advocate')}
        >
          Advocate
        </button>
      </div>

      {/* ERROR MESSAGE (Hidden unless needed) */}
      {error && (
        <div className="alert alert-danger p-2 small text-center animate-slide-down">
          <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
        </div>
      )}

      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit}>
        
        {/* Email */}
        <div className="form-floating mb-3">
          <input 
            type="email" 
            className="form-control" 
            id="loginEmail" 
            name="email"
            value={formData.email}
            placeholder="name@example.com"
            required
            onChange={handleChange}
          />
          <label htmlFor="loginEmail">Email Address</label>
        </div>

        {/* Password */}
        <div className="form-floating mb-3">
          <input 
            type="password" 
            className="form-control" 
            id="loginPassword" 
            name="password"
            value={formData.password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <label htmlFor="loginPassword">Password</label>
        </div>

        {/* Utilities: Remember Me & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label small text-secondary" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#" className="small text-decoration-none text-primary">Reset password?</a>
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-4">
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
            {isLoading ? (
              <span><span className="spinner-border spinner-border-sm me-2"></span>Authenticating...</span>
            ) : (
              <span>Sign In to our Dashboard <i className="fa-solid fa-arrow-right ms-2"></i></span>
            )}
          </button>
        </div>

      </form>

      {/* FOOTER */}
      <div className="text-center mt-4 pt-3 border-top">
        <p className="small text-muted mb-0">
          Don't have an account? <Link to="/auth/signup" className="fw-bold text-decoration-none">Register Now</Link>
        </p>
      </div>

    </div>
  );
};

export default Login;