/**
 * ==============================================================================
 * MYLAW.COM - SIGNUP PAGE
 * ==============================================================================
 * PURPOSE: Handles registration for both Clients and Advocates.
 * LOGIC: Reads the URL query param '?role=' to determine the user type, 
 * and pushes data to the real Node.js/PostgreSQL backend.
 */

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient'; // Import the axios client

const Signup = () => {
  // 1. HOOKS
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 2. STATE
  // Detect role from URL, default to 'client' if missing
  const initialRole = searchParams.get('role') === 'advocate' ? 'advocate' : 'client';
  
  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    barCouncilId: '', // Only for Advocates
    practiceArea: '', // Only for Advocates (Note: Not currently saved in DB schema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Added to display API errors

  // 3. HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setErrorMessage(''); // Clear errors on tab switch
    // Update URL without reloading
    navigate(`/auth/signup?role=${newRole}`, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Our Postgres DB requires first and last name separately. 
    // We split the fullName string here before sending.
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'User';

    try {
      // 1. Execute the real API call to the Node.js backend
      const response = await apiClient.post('/auth/register', {
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        password: formData.password,
        role: role,
        // Only send barCouncilId if the user is an advocate
        ...(role === 'advocate' && { barCouncilId: formData.barCouncilId })
      });

      // 2. Save the JWT Token and User data to LocalStorage
      localStorage.setItem('mylaw_token', response.data.token);
      localStorage.setItem('mylaw_user', JSON.stringify(response.data.user));

      // 3. Route to the correct dashboard based on role
      navigate(role === 'advocate' ? '/advocate/dashboard' : '/client/dashboard');

    } catch (error) {
      // Catch backend errors (like "Email already in use") and show them to the user
      setErrorMessage(
        error.response?.data?.error || 'Failed to connect to the server. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 4. RENDER
  return (
    <div className="auth-form-container fade-in">
      
      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Create Account</h2>
        <p className="text-muted">
          Join Mylaw.com as a <span className="text-primary fw-bold text-uppercase">{role}</span>
        </p>
      </div>

      {/* ROLE TOGGLE (Tabs) */}
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group w-100" role="group">
          <button 
            type="button" 
            className={`btn ${role === 'client' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleRoleSwitch('client')}
          >
            <i className="fa-solid fa-user me-2"></i> Client
          </button>
          <button 
            type="button" 
            className={`btn ${role === 'advocate' ? 'btn-warning text-dark' : 'btn-outline-secondary'}`}
            onClick={() => handleRoleSwitch('advocate')}
          >
            <i className="fa-solid fa-scale-balanced me-2"></i> Advocate
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE ALERT */}
      {errorMessage && (
        <div className="alert alert-danger py-2 small fw-bold text-center animate-slide-down">
          <i className="fa-solid fa-circle-exclamation me-2"></i>
          {errorMessage}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label small fw-bold text-secondary">Full Name</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><i className="fa-solid fa-user text-muted"></i></span>
            <input 
              type="text" 
              className="form-control" 
              name="fullName"
              placeholder="e.g. Rajesh Kumar" 
              required 
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label small fw-bold text-secondary">Email Address</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><i className="fa-solid fa-envelope text-muted"></i></span>
            <input 
              type="email" 
              className="form-control" 
              name="email"
              placeholder="name@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ADVOCATE SPECIFIC FIELDS */}
        {role === 'advocate' && (
          <div className="p-3 bg-light border rounded mb-3 animate-slide-down">
            <h6 className="small fw-bold text-warning text-uppercase mb-3">Professional Details</h6>
            
            {/* Bar Council ID */}
            <div className="mb-3">
              <label className="form-label small">Bar Council ID</label>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                name="barCouncilId"
                placeholder="e.g. MAH/1234/2020" 
                required 
                value={formData.barCouncilId}
                onChange={handleChange}
              />
            </div>

            {/* Practice Area */}
            <div className="mb-3">
              <label className="form-label small">Primary Practice Area</label>
              <select className="form-select form-select-sm" name="practiceArea" value={formData.practiceArea} onChange={handleChange}>
                <option value="">Select Area...</option>
                <option value="criminal">Criminal Law</option>
                <option value="civil">Civil Litigation</option>
                <option value="corporate">Corporate Law</option>
                <option value="family">Family & Divorce</option>
              </select>
            </div>
          </div>
        )}

        {/* Password */}
        <div className="mb-4">
          <label className="form-label small fw-bold text-secondary">Password</label>
          <div className="input-group">
            <span className="input-group-text bg-white"><i className="fa-solid fa-lock text-muted"></i></span>
            <input 
              type="password" 
              className="form-control" 
              name="password"
              placeholder="Min. 8 characters" 
              required 
              minLength="8"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-grid mb-4">
          <button type="submit" className={`btn btn-lg ${role === 'advocate' ? 'btn-warning text-dark' : 'btn-primary'}`} disabled={isLoading}>
            {isLoading ? (
              <span><span className="spinner-border spinner-border-sm me-2"></span>Creating Account...</span>
            ) : (
              <span>Create {role === 'advocate' ? 'Advocate' : 'Client'} Account</span>
            )}
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="small text-muted">
            Already have an account? <Link to="/auth/login" className="fw-bold text-decoration-none">Sign In</Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Signup;