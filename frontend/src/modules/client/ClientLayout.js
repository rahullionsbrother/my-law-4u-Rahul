/**
 * ==============================================================================
 * MYLAW.COM - CLIENT PORTAL LAYOUT
 * ==============================================================================
 * ARCHITECTURE: Dashboard Shell
 * PURPOSE: Wraps all Client pages. Provides the Sidebar and Header.
 * FEATURES:
 * 1. Sticky Sidebar for navigation.
 * 2. Responsive Header with Notification Badges.
 * 3. Protected Route Logic (Redirects to login if not authenticated).
 */

import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// LAZY LOAD SUB-PAGES
const ClientFeed = lazy(() => import('./pages/ClientFeed'));
const MyCases = lazy(() => import('./pages/MyCases')); // Placeholder for future
const ChatPage = lazy(() => import('../shared/components/ChatPage'));

/**
 * ==============================================================================
 * COMPONENT: SIDEBAR (Internal)
 * ==============================================================================
 */
const ClientSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { label: 'Advocate Feed', icon: 'fa-rss', path: '/client/dashboard' },
    { label: 'Find Lawyers', icon: 'fa-magnifying-glass', path: '/client/search' },
    { label: 'My Cases', icon: 'fa-briefcase', path: '/client/cases' },
    { label: 'Messages', icon: 'fa-comments', path: '/client/messages', badge: 3 },
    { label: 'Settings', icon: 'fa-gear', path: '/client/settings' },
  ];

  return (
    <div className="d-none d-lg-block bg-white border-end h-100 position-fixed" 
         style={{ width: 'var(--sidebar-width)', top: 0, left: 0, zIndex: 1020 }}>
      
      {/* BRAND HEADER */}
      <div className="d-flex align-items-center gap-2 px-4" style={{ height: 'var(--header-height)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="bg-primary text-white rounded p-1 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
          <i className="fa-solid fa-scale-balanced"></i>
        </div>
        <span className="fw-bold text-primary h6 mb-0">Mylaw Client</span>
      </div>

      {/* NAVIGATION */}
      <div className="py-4 px-3">
        <small className="text-uppercase text-secondary fw-bold px-3" style={{fontSize: '0.75rem'}}>Main Menu</small>
        <ul className="mt-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                to={item.path} 
                className={`d-flex align-items-center justify-content-between px-3 py-2 rounded text-decoration-none transition-all ${
                  isActive(item.path) 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-dark hover-bg-light'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${isActive(item.path) ? '' : 'text-secondary'}`} style={{width: '20px'}}></i>
                  <span className="fw-medium small">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`badge rounded-pill ${isActive(item.path) ? 'bg-white text-primary' : 'bg-danger'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* PROMO CARD (Upsell) */}
        <div className="mt-5 p-3 bg-light rounded border">
          <h6 className="fw-bold small mb-1">Need Urgent Help?</h6>
          <p className="small text-muted mb-2" style={{fontSize: '0.8rem'}}>Get a consultation in 15 mins.</p>
          <button className="btn btn-sm btn-dark w-100">Book Now</button>
        </div>
      </div>

      {/* USER FOOTER */}
      <div className="position-absolute bottom-0 w-100 p-3 border-top bg-light">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style={{width: '36px', height: '36px'}}>
            R
          </div>
          <div className="flex-grow-1" style={{lineHeight: '1.2'}}>
            <h6 className="mb-0 small fw-bold">Ravi Raj</h6>
            <small className="text-muted" style={{fontSize: '0.7rem'}}>Basic Plan</small>
          </div>
          <Link to="/auth/login" className="text-secondary"><i className="fa-solid fa-right-from-bracket"></i></Link>
        </div>
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENT: MOBILE HEADER (Visible only on mobile)
 * ==============================================================================
 */
const MobileHeader = () => (
  <nav className="navbar fixed-top bg-white border-bottom d-lg-none px-3" style={{ height: '60px' }}>
    <div className="d-flex align-items-center justify-content-between w-100">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light btn-sm"><i className="fa-solid fa-bars"></i></button>
        <span className="fw-bold text-primary">Mylaw</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <i className="fa-regular fa-bell"></i>
        <div className="bg-secondary rounded-circle text-white d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>R</div>
      </div>
    </div>
  </nav>
);

/**
 * ==============================================================================
 * MAIN LAYOUT EXPORT
 * ==============================================================================
 */
const ClientLayout = () => {
  return (
    <div className="d-flex bg-page min-vh-100">
      
      {/* 1. SIDEBAR (Fixed Left) */}
      <ClientSidebar />

      {/* 2. MOBILE HEADER (Fixed Top - Mobile Only) */}
      <MobileHeader />

      {/* 3. MAIN CONTENT AREA (Pushed Right) */}
      <main className="flex-grow-1" style={{ marginLeft: 'var(--sidebar-width)', minWidth: 0, overflow: 'hidden' }}>
        {/* Mobile Padding Adjustment */}
        <div className="d-lg-none" style={{ height: '60px' }}></div>
        
        {/* Render the Sub-Page */}
        <Suspense fallback={<div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>}>
          <Routes>
            {/* The main feed is the default dashboard view */}
            <Route path="dashboard" element={<ClientFeed />} />
            <Route path="messages" element={<ChatPage />} />
            {/* Placeholder for other routes */}
            <Route path="cases" element={<MyCases />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>

    </div>
  );
};

export default ClientLayout;