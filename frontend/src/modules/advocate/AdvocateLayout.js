/**
 * ==============================================================================
 * MYLAW.COM - ADVOCATE PORTAL LAYOUT
 * ==============================================================================
 * ARCHITECTURE: Dashboard Shell (Provider Side)
 * FEATURES:
 * 1. Dark-Themed Sidebar (Distinct from Client portal).
 * 2. Specialized Navigation (Leads, Hearings, Earnings).
 * 3. Lazy loading for internal routes.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// LAZY LOAD SUB-PAGES
// We will create 'AdvocateDashboard' in the next step.
const AdvocateDashboard = lazy(() => import('./pages/AdvocateDashboard'));
const ChatPage = lazy(() => import('../shared/components/ChatPage'));

/**
 * ==============================================================================
 * COMPONENT: ADVOCATE SIDEBAR (Dark Theme)
 * ==============================================================================
 */
const AdvocateSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { label: 'Lead Feed', icon: 'fa-satellite-dish', path: '/advocate/dashboard', badge: 'New' },
    { label: 'Active Cases', icon: 'fa-briefcase', path: '/advocate/cases' },
    { label: 'Hearing Calendar', icon: 'fa-calendar-days', path: '/advocate/calendar' },
    { label: 'Messages', icon: 'fa-comments', path: '/advocate/messages', badge: '2' },
    { label: 'Earnings', icon: 'fa-indian-rupee-sign', path: '/advocate/earnings' },
    { label: 'Practice Profile', icon: 'fa-id-badge', path: '/advocate/profile' },
  ];

  return (
    <div className="d-none d-lg-flex flex-column bg-dark text-white border-end border-secondary h-100 position-fixed" 
         style={{ width: 'var(--sidebar-width)', top: 0, left: 0, zIndex: 1020 }}>
      
      {/* BRAND HEADER */}
      <div className="d-flex align-items-center gap-3 px-4" style={{ height: 'var(--header-height)', borderBottom: '1px solid #334155' }}>
        <div className="bg-warning text-dark rounded p-1 d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px'}}>
          <i className="fa-solid fa-gavel"></i>
        </div>
        <span className="fw-bold text-white h6 mb-0">Advocate Hub</span>
      </div>

      {/* NAVIGATION */}
      <div className="py-4 px-3 flex-grow-1">
        <small className="text-uppercase text-white-50 fw-bold px-3" style={{fontSize: '0.75rem'}}>Workspace</small>
        <ul className="mt-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                to={item.path} 
                className={`d-flex align-items-center justify-content-between px-3 py-2 rounded text-decoration-none transition-all ${
                  isActive(item.path) 
                    ? 'bg-warning text-dark fw-bold shadow-sm' 
                    : 'text-white-50 hover-bg-secondary'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${isActive(item.path) ? 'text-dark' : ''}`} style={{width: '20px'}}></i>
                  <span className="small">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`badge rounded-pill ${isActive(item.path) ? 'bg-dark text-warning' : 'bg-primary text-white'}`} style={{fontSize: '0.65rem'}}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* USER FOOTER */}
      <div className="p-3 border-top" style={{ borderColor: '#334155' }}>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{width: '40px', height: '40px'}}>
            A
          </div>
          <div className="flex-grow-1" style={{lineHeight: '1.2'}}>
            <h6 className="mb-0 small fw-bold text-white">Adv. Sharma</h6>
            <div className="d-flex align-items-center gap-1 mt-1">
                <i className="fa-solid fa-circle-check text-success" style={{fontSize: '0.6rem'}}></i>
                <small className="text-white-50" style={{fontSize: '0.7rem'}}>Bar: MAH/892/15</small>
            </div>
          </div>
          <Link to="/auth/login" className="text-white-50 hover-text-white"><i className="fa-solid fa-right-from-bracket"></i></Link>
        </div>
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENT: MOBILE HEADER
 * ==============================================================================
 */
const MobileHeader = () => (
  <nav className="navbar fixed-top bg-dark border-bottom border-secondary d-lg-none px-3" style={{ height: '60px' }}>
    <div className="d-flex align-items-center justify-content-between w-100">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-outline-light btn-sm"><i className="fa-solid fa-bars"></i></button>
        <span className="fw-bold text-white">Advocate Hub</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <i className="fa-regular fa-bell text-white"></i>
        <div className="bg-warning rounded-circle text-dark d-flex align-items-center justify-content-center fw-bold" style={{width: '30px', height: '30px'}}>A</div>
      </div>
    </div>
  </nav>
);

/**
 * ==============================================================================
 * MAIN LAYOUT EXPORT
 * ==============================================================================
 */
const AdvocateLayout = () => {
  return (
    <div className="d-flex bg-page min-vh-100">
      
      {/* 1. SIDEBAR (Fixed Left, Dark Theme) */}
      <AdvocateSidebar />

      {/* 2. MOBILE HEADER */}
      <MobileHeader />

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-grow-1" style={{ marginLeft: 'var(--sidebar-width)', minWidth: 0, overflow: 'hidden' }}>
        {/* Mobile Padding Adjustment */}
        <div className="d-lg-none" style={{ height: '60px' }}></div>
        
        {/* Render the Sub-Page */}
        <Suspense fallback={<div className="p-5 text-center"><div className="spinner-border text-warning"></div></div>}>
          <Routes>
            {/* The main dashboard/feed view */}
            <Route path="dashboard" element={<AdvocateDashboard />} />
            <Route path="messages" element={<ChatPage />} />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>

    </div>
  );
};

export default AdvocateLayout;