/**
 * ==============================================================================
 * MYLAW.COM - ENTERPRISE ROOT ROUTER
 * ==============================================================================
 * ARCHITECTURE LEVEL: ADVANCED (MICRO-FRONTEND STYLE)
 * * * This router orchestrates the 5 distinct business domains of the application.
 * * It uses 'React.lazy' for aggressive code-splitting.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Global Application Styles (Theming for the entire app)
import './App.css';

/**
 * ==============================================================================
 * MODULE LAZY LOADING (Domain-Driven Design)
 * ==============================================================================
 * We import the "Layout" file for each module. 
 * These files act as the entry point for their respective sections.
 */

// 1. PUBLIC DOMAIN (Landing, Blog, Features)
// Accessible to everyone. No login required.
const PublicModule = lazy(() => import('./modules/public/PublicLayout'));

// 2. AUTHENTICATION DOMAIN (Login, Signup, Forgot Password)
// Handles the security gateway.
const AuthModule = lazy(() => import('./modules/auth/AuthLayout'));

// 3. CLIENT PORTAL (The "User" Dashboard)
// Protected Route: Only for users with role='CLIENT'.
const ClientModule = lazy(() => import('./modules/client/ClientLayout'));

// 4. ADVOCATE PORTAL (The "Lawyer" Dashboard)
// Protected Route: Only for users with role='ADVOCATE'.
const AdvocateModule = lazy(() => import('./modules/advocate/AdvocateLayout'));

// 5. ADMIN PORTAL (Internal Operations)
// Protected Route: Only for users with role='ADMIN'.
const AdminModule = lazy(() => import('./modules/admin/AdminLayout'));

/**
 * ==============================================================================
 * UTILITY: MODULE LOADER
 * ==============================================================================
 * A professional loading state shown while the specific module is downloading.
 */
const ModuleLoader = () => {
  return (
    <div className="app-loader-container">
      <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
        <span className="visually-hidden">Loading Module...</span>
      </div>
      <p className="mt-3 text-muted fw-bold">Initializing Secure Module...</p>
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENT: 404 NOT FOUND
 * ==============================================================================
 */
const NotFound = () => (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
    <h1 className="display-1 fw-bold text-secondary">404</h1>
    <p className="lead text-dark">The requested legal resource does not exist.</p>
    <a href="/" className="btn btn-primary mt-3">Return to Safety</a>
  </div>
);

/**
 * ==============================================================================
 * MAIN COMPONENT
 * ==============================================================================
 */
function App() {
  // We can use location to trigger analytics events on route change later
  const location = useLocation();

  return (
    <div className="App">
      <Suspense fallback={<ModuleLoader />}>
        <Routes location={location}>
          
          {/* ---------------------------------------------------------------
            ROUTE DEFINITIONS
            ---------------------------------------------------------------
          */}

          {/* 1. PUBLIC LANDING (Root URL) */}
          {/* Matches: /, /about, /contact */}
          <Route path="/*" element={<PublicModule />} />

          {/* 2. AUTHENTICATION */}
          {/* Matches: /auth/login, /auth/signup */}
          <Route path="/auth/*" element={<AuthModule />} />

          {/* 3. CLIENT PORTAL (Protected) */}
          {/* Matches: /client/dashboard, /client/feed */}
          <Route path="/client/*" element={<ClientModule />} />

          {/* 4. ADVOCATE PORTAL (Protected) */}
          {/* Matches: /advocate/dashboard, /advocate/cases */}
          <Route path="/advocate/*" element={<AdvocateModule />} />

          {/* 5. ADMIN PORTAL (Strictly Protected) */}
          {/* Matches: /admin/users, /admin/analytics */}
          <Route path="/admin/*" element={<AdminModule />} />

          {/* Fallback for completely unknown routes */}
          <Route path="/404" element={<NotFound />} />
          
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;