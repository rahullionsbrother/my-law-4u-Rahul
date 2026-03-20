/**
 * ==============================================================================
 * MYLAW.COM - AUTHENTICATION LAYOUT
 * ==============================================================================
 * PURPOSE: A shared wrapper for all authentication screens (Login, Signup).
 * DESIGN: Split-screen layout.
 * - Left: High-quality legal imagery/branding.
 * - Right: The interactive form (Login/Signup).
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// Lazy Load the Auth Pages (We will create these next)
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

/**
 * ==============================================================================
 * COMPONENT: AUTH LAYOUT
 * ==============================================================================
 */
const AuthLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-white">
      
      {/* ------------------------------------------------------------------
        LEFT SIDE: BRANDING PANEL (Hidden on mobile)
        ------------------------------------------------------------------
      */}
      <div className="d-none d-lg-flex col-lg-5 flex-column justify-content-between p-5 text-white" 
           style={{ backgroundColor: '#0f172a' }}> {/* Brand Navy Blue */}
        
        {/* Logo Area */}
        <div>
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-white">
            <div className="bg-warning text-dark rounded p-1 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <span className="fw-bold h5 mb-0">Mylaw.com</span>
          </Link>
        </div>

        {/* Marketing Copy */}
        <div className="my-auto">
          <h1 className="display-4 fw-bold mb-4">Justice, <br/>Simplified.</h1>
          <p className="lead text-white-50">
            Join India's largest network of legal professionals and citizens. 
            Automate your practice or find the right counsel in minutes.
          </p>
        </div>

        {/* Footer */}
        <div className="small text-white-50">
          &copy; {new Date().getFullYear()} Mylaw.com Inc. &bull; <a href="#" className="text-white-50">Privacy</a> &bull; <a href="#" className="text-white-50">Terms</a>
        </div>
      </div>

      {/* ------------------------------------------------------------------
        RIGHT SIDE: FORM AREA (Dynamic Content)
        ------------------------------------------------------------------
      */}
      <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center bg-light">
        <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="d-lg-none text-center mb-4">
             <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none text-dark">
                <i className="fa-solid fa-scale-balanced text-primary fa-2x"></i>
                <span className="fw-bold h3 mb-0 text-primary">Mylaw.com</span>
             </Link>
          </div>

          {/* RENDER THE LOGIN OR SIGNUP PAGE HERE */}
          <Suspense fallback={<div className="text-center p-5"><div className="spinner-border text-primary"></div></div>}>
            <Routes>
              {/* Route: /auth/login */}
              <Route path="login" element={<Login />} />
              
              {/* Route: /auth/signup */}
              <Route path="signup" element={<Signup />} />
              
              {/* Default Redirect: Go to Login */}
              <Route path="*" element={<Navigate to="login" replace />} />
            </Routes>
          </Suspense>

        </div>
      </div>

    </div>
  );
};

export default AuthLayout;