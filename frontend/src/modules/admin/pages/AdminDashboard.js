/**
 * ==============================================================================
 * MYLAW.COM - ADMIN DASHBOARD (OPERATIONS)
 * ==============================================================================
 * PURPOSE: The central control panel for platform administrators.
 * FEATURES:
 * 1. High-level platform KPIs.
 * 2. Pending KYC / Verification Table.
 * 3. System Health & DevOps monitoring widget.
 */

import React, { useState } from 'react';

// --- MOCK DATA ---
const INITIAL_KYC_REQUESTS = [
  {
    id: 'REQ-8091',
    name: 'Adv. Suresh Patel',
    type: 'Advocate Verification',
    submittedAt: '10 mins ago',
    documents: 'Bar ID, Aadhar',
    status: 'pending'
  },
  {
    id: 'REQ-8092',
    name: 'M/S Legal Associates',
    type: 'Law Firm Onboarding',
    submittedAt: '2 hours ago',
    documents: 'Firm Reg, GSTIN',
    status: 'pending'
  },
  {
    id: 'REQ-8093',
    name: 'Ravi R.',
    type: 'Client Identity Check',
    submittedAt: '1 day ago',
    documents: 'PAN Card',
    status: 'pending'
  }
];

/**
 * ==============================================================================
 * COMPONENT: STAT CARD (Admin Theme)
 * ==============================================================================
 */
const AdminStatCard = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white p-4 rounded shadow-sm border-start border-4 mb-4" style={{ borderColor: `var(--bs-${color})` }}>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="text-muted text-uppercase fw-bold mb-0" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>{title}</h6>
      <i className={`fa-solid ${icon} text-${color} fa-lg opacity-75`}></i>
    </div>
    <h3 className="fw-bold mb-1 text-dark">{value}</h3>
    <small className="text-muted fw-medium" style={{fontSize: '0.8rem'}}>{subtext}</small>
  </div>
);

/**
 * ==============================================================================
 * MAIN PAGE COMPONENT
 * ==============================================================================
 */
const AdminDashboard = () => {
  const [kycRequests, setKycRequests] = useState(INITIAL_KYC_REQUESTS);

  // Handlers for KYC Actions
  const handleAction = (id, action) => {
    setKycRequests(kycRequests.filter(req => req.id !== id));
    // In a real app, this would trigger an Axios call to the backend
    console.log(`Action [${action}] executed for request ID: ${id}`);
  };

  return (
    <div className="container-fluid py-4 px-lg-4 bg-light min-vh-100">
      
      {/* ------------------------------------------------------------------
        TOP ROW: PLATFORM KPIs
        ------------------------------------------------------------------ */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Platform Overview</h4>
          <p className="text-muted small mb-0">Monitor network health and pending approvals.</p>
        </div>
        <button className="btn btn-dark btn-sm rounded shadow-sm">
          <i className="fa-solid fa-download me-2"></i> Export Report
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-xl-3">
          <AdminStatCard title="Total Users" value="24,592" subtext="+142 this week" icon="fa-users" color="primary" />
        </div>
        <div className="col-md-6 col-xl-3">
          <AdminStatCard title="Active Disputes" value="1,843" subtext="89 requiring mediation" icon="fa-scale-unbalanced" color="warning" />
        </div>
        <div className="col-md-6 col-xl-3">
          <AdminStatCard title="Pending KYC" value={kycRequests.length.toString()} subtext="Requires immediate action" icon="fa-id-card-clip" color="danger" />
        </div>
        <div className="col-md-6 col-xl-3">
          <AdminStatCard title="Monthly Revenue" value="₹18.4L" subtext="Platform commissions" icon="fa-indian-rupee-sign" color="success" />
        </div>
      </div>

      <div className="row g-4 mt-1">
        
        {/* ------------------------------------------------------------------
          LEFT COLUMN: ACTION QUEUE (66%)
          ------------------------------------------------------------------ */}
        <div className="col-lg-8">
          <div className="bg-white rounded shadow-sm border border-light p-4 h-100">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="fw-bold mb-0 text-dark">Pending Verification Queue</h6>
              <span className="badge bg-danger rounded-pill px-3 py-2">{kycRequests.length} Tasks</span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="small text-uppercase text-muted fw-bold">ID</th>
                    <th className="small text-uppercase text-muted fw-bold">Entity Name</th>
                    <th className="small text-uppercase text-muted fw-bold">Type</th>
                    <th className="small text-uppercase text-muted fw-bold">Submitted</th>
                    <th className="small text-uppercase text-muted fw-bold text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kycRequests.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        <i className="fa-solid fa-check-circle fa-2x mb-2 text-success opacity-50"></i>
                        <p className="mb-0 fw-bold">All caught up!</p>
                        <small>No pending verification requests.</small>
                      </td>
                    </tr>
                  ) : (
                    kycRequests.map((req) => (
                      <tr key={req.id}>
                        <td className="small fw-bold text-secondary">{req.id}</td>
                        <td className="fw-bold text-dark">{req.name}</td>
                        <td><span className="badge bg-light text-dark border">{req.type}</span></td>
                        <td className="small text-muted">{req.submittedAt}</td>
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-success shadow-sm me-2" 
                            onClick={() => handleAction(req.id, 'Approve')}
                            title="Approve"
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger shadow-sm" 
                            onClick={() => handleAction(req.id, 'Reject')}
                            title="Reject"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------------
          RIGHT COLUMN: SYSTEM HEALTH (33%)
          ------------------------------------------------------------------ */}
        <div className="col-lg-4">
          <div className="bg-dark text-white rounded shadow-sm p-4 h-100 position-relative overflow-hidden">
            <i className="fa-solid fa-server fa-4x position-absolute opacity-10" style={{bottom: '-10px', right: '-10px'}}></i>
            
            <h6 className="fw-bold mb-4 text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-heart-pulse text-danger"></i> System Health
            </h6>
            
            <div className="mb-4">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-white-50">API Latency</span>
                <span className="text-success fw-bold">42ms</span>
              </div>
              <div className="progress bg-secondary" style={{height: '6px'}}>
                <div className="progress-bar bg-success" style={{width: '15%'}}></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-white-50">Database Load (MySQL)</span>
                <span className="text-warning fw-bold">68%</span>
              </div>
              <div className="progress bg-secondary" style={{height: '6px'}}>
                <div className="progress-bar bg-warning" style={{width: '68%'}}></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between small mb-1">
                <span className="text-white-50">Storage Allocation</span>
                <span className="text-white fw-bold">4.2 TB / 10 TB</span>
              </div>
              <div className="progress bg-secondary" style={{height: '6px'}}>
                <div className="progress-bar bg-primary" style={{width: '42%'}}></div>
              </div>
            </div>

            <div className="mt-5 p-3 bg-white bg-opacity-10 rounded border border-secondary">
              <h6 className="small fw-bold mb-1"><i className="fa-solid fa-shield-halved text-success me-2"></i>Security Status</h6>
              <p className="small text-white-50 mb-0" style={{fontSize: '0.75rem'}}>All automated backups completed. No active threat vectors detected in the last 24 hours.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;