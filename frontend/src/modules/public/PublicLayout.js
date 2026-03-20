/**
 * ==============================================================================
 * MYLAW.COM - PUBLIC LAYOUT
 * ==============================================================================
 * PURPOSE: Wrapper for all unauthenticated marketing pages.
 * FEATURES: Responsive Navbar and Global Footer.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

// LAZY LOAD SUB-PAGES
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

/**
 * ==============================================================================
 * COMPONENT: GLOBAL NAVBAR
 * ==============================================================================
 */
const PublicNavbar = () => {
  const location = useLocation();
  const isTransparent = location.pathname === '/'; // Make navbar transparent on home hero

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${isTransparent ? 'bg-dark navbar-dark py-3' : 'bg-white navbar-light shadow-sm py-2 border-bottom'}`}>
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className={`rounded p-1 d-flex align-items-center justify-content-center ${isTransparent ? 'bg-white text-dark' : 'bg-primary text-white'}`} style={{width: '32px', height: '32px'}}>
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <span className={`fw-bold h5 mb-0 ${isTransparent ? 'text-white' : 'text-primary'}`}>Mylaw.com</span>
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#publicNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="publicNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-medium gap-lg-3 align-items-lg-center">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About Us</Link>
            </li>
            
            {/* Auth Buttons */}
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <Link to="/auth/login" className={`btn w-100 ${isTransparent ? 'btn-outline-light' : 'btn-outline-primary'} rounded-pill px-4 fw-bold`}>
                Log In
              </Link>
            </li>
            <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
              <Link to="/auth/signup" className="btn btn-primary w-100 rounded-pill px-4 fw-bold text-white border-0 shadow-sm" style={{ background: 'linear-gradient(45deg, #0d6efd, #0b5ed7)' }}>
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

/**
 * ==============================================================================
 * COMPONENT: GLOBAL FOOTER
 * ==============================================================================
 */
const PublicFooter = () => (
  <footer className="bg-dark text-white pt-5 pb-3">
    <div className="container">
      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <i className="fa-solid fa-scale-balanced text-primary"></i> Mylaw.com
          </h5>
          <p className="small text-white-50 pe-lg-4">
            Bridging the gap between citizens and top-tier legal professionals across India. Fast, secure, and transparent.
          </p>
        </div>
        <div className="col-6 col-lg-2">
          <h6 className="fw-bold mb-3">Platform</h6>
          <ul className="list-unstyled space-y-2 small">
            <li><Link to="/" className="text-white-50 text-decoration-none hover-text-white">Home</Link></li>
            <li><Link to="/about" className="text-white-50 text-decoration-none hover-text-white">About Us</Link></li>
            <li><Link to="/auth/signup?role=advocate" className="text-white-50 text-decoration-none hover-text-white">For Advocates</Link></li>
          </ul>
        </div>
        <div className="col-6 col-lg-2">
          <h6 className="fw-bold mb-3">Legal</h6>
          <ul className="list-unstyled space-y-2 small">
            <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Terms of Service</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none hover-text-white">Trust & Safety</a></li>
          </ul>
        </div>
        <div className="col-lg-4">
          <h6 className="fw-bold mb-3">Stay Updated</h6>
          <div className="input-group mb-3 shadow-sm">
            <input type="email" className="form-control border-0 bg-secondary bg-opacity-25 text-white" placeholder="Email address" />
            <button className="btn btn-primary fw-bold px-3" type="button">Subscribe</button>
          </div>
          <div className="d-flex gap-3 mt-4">
            <a href="#" className="text-white-50 hover-text-white"><i className="fa-brands fa-linkedin fa-lg"></i></a>
            <a href="#" className="text-white-50 hover-text-white"><i className="fa-brands fa-twitter fa-lg"></i></a>
            <a href="#" className="text-white-50 hover-text-white"><i className="fa-brands fa-instagram fa-lg"></i></a>
          </div>
        </div>
      </div>
      <div className="text-center border-top border-secondary pt-3 small text-white-50">
        &copy; {new Date().getFullYear()} Mylaw.com Platform. All rights reserved.
      </div>
    </div>
  </footer>
);

/**
 * ==============================================================================
 * MAIN LAYOUT EXPORT
 * ==============================================================================
 */
const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <PublicNavbar />
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-grow-1">
        <Suspense fallback={
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <PublicFooter />
    </div>
  );
};

export default PublicLayout;