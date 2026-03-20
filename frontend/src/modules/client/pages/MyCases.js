/**
 * ==============================================================================
 * MYLAW.COM - CLIENT: MY CASES (PLACEHOLDER)
 * ==============================================================================
 */
import React from 'react';
import { Link } from 'react-router-dom';

const MyCases = () => {
  return (
    <div className="container py-5 text-center fade-in">
      <div className="bg-white p-5 rounded-4 shadow-sm border border-light mx-auto" style={{ maxWidth: '600px' }}>
        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
          <i className="fa-solid fa-folder-open fa-2x"></i>
        </div>
        
        <h2 className="fw-bold text-dark mb-3">No Active Cases</h2>
        <p className="text-muted mb-4">
          You don't have any ongoing legal matters. When you hire an advocate from the feed, your case documents, hearings, and progress will appear here.
        </p>
        
        <Link to="/client/dashboard" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">
          <i className="fa-solid fa-magnifying-glass me-2"></i> Browse Advocates
        </Link>
      </div>
    </div>
  );
};

export default MyCases;