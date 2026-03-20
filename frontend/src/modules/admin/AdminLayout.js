/**
 * ==============================================================================
 * MYLAW.COM - SECURE ADMIN PORTAL LAYOUT
 * ==============================================================================
 * ARCHITECTURE: Internal Operations Dashboard
 * FEATURES:
 * 1. Distinctive "Admin" Sidebar (Using danger/red accents for high privilege).
 * 2. KYC & Compliance Badges.
 * 3. Protected routing gateway.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// LAZY LOAD SUB-PAGES
// We will create 'AdminDashboard' next.
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

/**
 * ==============================================================================
 * COMPONENT: ADMIN SIDEBAR (High-Privilege Theme)
 * ==============================================================================
 */
const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { label: 'Platform Overview', icon: 'fa-chart-pie', path: '/admin/dashboard' },
    { label: 'KYC Approvals', icon: 'fa-id-card-clip', path: '/admin/kyc', badge: '14 Pending' },
    { label: 'User Management', icon: 'fa-users-gear', path: '/admin/users' },
    { label: 'Dispute Resolution', icon: 'fa-scale-unbalanced', path: '/admin/disputes', badge: '2' },
    { label: 'Financial Logs', icon: 'fa-file-invoice-dollar', path: '/admin/finance' },
    { label: 'System Health', icon: 'fa-server', path: '/admin/system' },
  ];

  return (
    <div className="d-none d-lg-flex flex-column bg-white border-end h-100 position-fixed shadow-sm" 
         style={{ width: 'var(--sidebar-width)', top: 0, left: 0, zIndex: 1020 }}>
      
      {/* BRAND HEADER - Danger/Red accent to denote Admin rights */}
      <div className="d-flex align-items-center gap-3 px-4" style={{ height: 'var(--header-height)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="bg-danger text-white rounded p-1 d-flex align-items-center justify-content-center shadow-sm" style={{width: '32px', height: '32px'}}>
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <span className="fw-bold text-dark h6 mb-0 d-block">Mylaw Ops</span>
          <span className="text-danger fw-bold" style={{fontSize: '0.65rem', letterSpacing: '1px'}}>SUPER ADMIN</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="py-4 px-3 flex-grow-1 overflow-auto">
        <small className="text-uppercase text-muted fw-bold px-3" style={{fontSize: '0.75rem'}}>Control Panel</small>
        <ul className="mt-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link 
                to={item.path} 
                className={`d-flex align-items-center justify-content-between px-3 py-2 rounded text-decoration-none transition-all ${
                  isActive(item.path) 
                    ? 'bg-danger bg-opacity-10 text-danger fw-bold' 
                    : 'text-secondary hover-bg-light'
                }`}
              >
                <div className="d-flex align-items-center gap-3">
                  <i className={`fa-solid ${item.icon} ${isActive(item.path) ? 'text-danger' : 'text-muted'}`} style={{width: '20px'}}></i>
                  <span className="small">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`badge rounded-pill ${isActive(item.path) ? 'bg-danger text-white' : 'bg-warning text-dark'}`} style={{fontSize: '0.65rem'}}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* USER FOOTER */}
      <div className="p-3 border-top bg-light">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-dark rounded flex-shrink-0 d-flex align-items-center justify-content-center text-white fw-bold" style={{width: '40px', height: '40px'}}>
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div className="flex-grow-1 overflow-hidden" style={{lineHeight: '1.2'}}>
            <h6 className="mb-0 small fw-bold text-dark text-truncate">System Admin</h6>
            <div className="d-flex align-items-center gap-1 mt-1">
                <span className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></span>
                <small className="text-muted" style={{fontSize: '0.7rem'}}>Status: Online</small>
            </div>
          </div>
          <Link to="/auth/login" className="text-muted hover-text-danger"><i className="fa-solid fa-power-off"></i></Link>
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
  <nav className="navbar fixed-top bg-white border-bottom d-lg-none px-3 shadow-sm" style={{ height: '60px' }}>
    <div className="d-flex align-items-center justify-content-between w-100">
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light border btn-sm"><i className="fa-solid fa-bars"></i></button>
        <span className="fw-bold text-danger"><i className="fa-solid fa-shield-halved me-1"></i> Ops</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <i className="fa-solid fa-bell text-muted"></i>
        <div className="bg-dark rounded text-white d-flex align-items-center justify-content-center fw-bold" style={{width: '30px', height: '30px'}}>
          <i className="fa-solid fa-user-tie fa-sm"></i>
        </div>
      </div>
    </div>
  </nav>
);

/**
 * ==============================================================================
 * MAIN LAYOUT EXPORT
 * ==============================================================================
 */
const AdminLayout = () => {
  return (
    <div className="d-flex bg-page min-vh-100">
      
      {/* 1. SIDEBAR (Fixed Left, Admin Theme) */}
      <AdminSidebar />

      {/* 2. MOBILE HEADER */}
      <MobileHeader />

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-grow-1" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <div className="d-lg-none" style={{ height: '60px' }}></div>
        
        {/* Render the Sub-Page */}
        <Suspense fallback={
          <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="spinner-border text-danger mb-3"></div>
            <p className="text-muted fw-bold">Loading Secure Module...</p>
          </div>
        }>
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>

    </div>
  );
};

export default AdminLayout;