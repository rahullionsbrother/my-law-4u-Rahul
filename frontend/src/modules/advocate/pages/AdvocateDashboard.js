/**
 * ==============================================================================
 * MYLAW.COM - ADVOCATE DASHBOARD (LEAD FEED)
 * ==============================================================================
 * PURPOSE: The central hub for Advocates to find new clients and track KPIs.
 * FEATURES:
 * 1. KPI Metrics (Top Row).
 * 2. Client Requirement Feed (Middle).
 * 3. Interactive "Send Proposal" workflow.
 * 4. Upcoming Hearings Widget (Right Sidebar).
 */

import React, { useState } from 'react';

// --- MOCK DATA: Simulating the Database of Client Posts ---
const INITIAL_LEADS = [
  {
    id: 101,
    clientAlias: "Citizen_Hyd_882",
    category: "Property Dispute",
    location: "Hyderabad High Court",
    urgency: "High",
    description: "Looking for an experienced advocate to handle an ancestral property partition suit. The opposite party has filed for an injunction. Need immediate representation.",
    postedTime: "15 mins ago",
    matchScore: "98%",
    status: "open" // open | applied
  },
  {
    id: 102,
    clientAlias: "Priya D.",
    category: "Family Law",
    location: "Secunderabad Family Court",
    urgency: "Medium",
    description: "Need consultation regarding mutual consent divorce procedures and child custody agreements. Prefer a lawyer with 10+ years of experience.",
    postedTime: "2 hours ago",
    matchScore: "85%",
    status: "open"
  },
  {
    id: 103,
    clientAlias: "TechCorp India Pvt Ltd",
    category: "Corporate & IP",
    location: "Virtual / Arbitration",
    urgency: "High",
    description: "We have a vendor breach of contract issue (₹50L value). Looking to send a strong legal notice and initiate arbitration proceedings if necessary.",
    postedTime: "5 hours ago",
    matchScore: "72%",
    status: "open"
  }
];

/**
 * ==============================================================================
 * COMPONENT: KPI STAT CARD
 * ==============================================================================
 */
const StatCard = ({ title, value, trend, icon, color }) => (
  <div className="bg-white p-4 rounded-3 shadow-sm border border-light h-100">
    <div className="d-flex justify-content-between align-items-start mb-2">
      <div className={`bg-${color} bg-opacity-10 text-${color} p-2 rounded`} style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <i className={`fa-solid ${icon} fa-lg`}></i>
      </div>
      {trend && (
        <span className={`badge bg-${trend > 0 ? 'success' : 'danger'} bg-opacity-10 text-${trend > 0 ? 'success' : 'danger'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <h3 className="fw-bold mb-1 mt-3 text-dark">{value}</h3>
    <small className="text-muted fw-medium text-uppercase" style={{fontSize: '0.75rem'}}>{title}</small>
  </div>
);

/**
 * ==============================================================================
 * MAIN PAGE COMPONENT
 * ==============================================================================
 */
const AdvocateDashboard = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);

  // Handler for sending a proposal to a client
  const handleApply = (leadId) => {
    // Update the state to reflect that the advocate has applied
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: 'applied' } : lead
    ));
  };

  return (
    <div className="container-fluid py-4 px-lg-4">
      
      {/* ------------------------------------------------------------------
        TOP ROW: KPI METRICS
        ------------------------------------------------------------------ */}
      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-xl-3">
          <StatCard title="New Leads Today" value="14" trend={12} icon="fa-satellite-dish" color="primary" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard title="Active Cases" value="8" trend={0} icon="fa-briefcase" color="warning" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard title="Profile Views" value="245" trend={34} icon="fa-eye" color="info" />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard title="Monthly Earnings" value="₹1.2L" trend={5} icon="fa-indian-rupee-sign" color="success" />
        </div>
      </div>

      <div className="row g-4">
        
        {/* ------------------------------------------------------------------
          LEFT COLUMN: CLIENT LEAD FEED (66%)
          ------------------------------------------------------------------ */}
        <div className="col-lg-8">
          
          {/* Feed Header with Filters */}
          <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm border border-light">
            <h5 className="mb-0 fw-bold"><i className="fa-solid fa-list-ul me-2 text-warning"></i> Client Requirements</h5>
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm border-secondary bg-light" style={{width: 'auto'}}>
                <option>Sort by: Match Score</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Urgency</option>
              </select>
              <button className="btn btn-sm btn-outline-dark"><i className="fa-solid fa-filter"></i></button>
            </div>
          </div>

          {/* The Feed */}
          {leads.map((lead) => (
            <div key={lead.id} className="feed-card bg-white p-4 rounded-3 shadow-sm mb-3 border border-light position-relative overflow-hidden">
              
              {/* Urgency Ribbon */}
              {lead.urgency === 'High' && (
                <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 small fw-bold" style={{borderBottomLeftRadius: '8px'}}>
                  Urgent
                </div>
              )}

              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-dark text-warning">{lead.category}</span>
                    <span className="badge bg-light text-secondary border"><i className="fa-solid fa-location-dot me-1"></i>{lead.location}</span>
                  </div>
                  <small className="text-muted fw-bold">Posted by {lead.clientAlias} • {lead.postedTime}</small>
                </div>
                
                {/* Match Score Badge */}
                <div className="text-end mt-2 mt-md-0">
                  <div className="text-success fw-bold h5 mb-0">{lead.matchScore}</div>
                  <small className="text-muted" style={{fontSize: '0.7rem'}}>Match</small>
                </div>
              </div>

              <p className="text-dark mb-4" style={{fontSize: '0.95rem', lineHeight: '1.6'}}>
                "{lead.description}"
              </p>

              <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
                <div className="d-flex gap-3">
                  <button className="btn btn-sm btn-light text-secondary rounded-pill px-3">
                    <i className="fa-regular fa-bookmark"></i> Save
                  </button>
                  <button className="btn btn-sm btn-light text-secondary rounded-pill px-3">
                    <i className="fa-regular fa-message"></i> Request Clarification
                  </button>
                </div>
                
                {/* Dynamic Apply Button */}
                {lead.status === 'open' ? (
                  <button 
                    onClick={() => handleApply(lead.id)}
                    className="btn btn-sm btn-primary fw-bold px-4 rounded-pill shadow-sm transition-all"
                  >
                    Send Proposal <i className="fa-solid fa-paper-plane ms-1"></i>
                  </button>
                ) : (
                  <button className="btn btn-sm btn-success fw-bold px-4 rounded-pill disabled" disabled>
                    <i className="fa-solid fa-check me-1"></i> Proposal Sent
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>

        {/* ------------------------------------------------------------------
          RIGHT COLUMN: WIDGETS (33%)
          ------------------------------------------------------------------ */}
        <div className="col-lg-4 d-none d-lg-block">
          
          {/* Widget 1: Profile Completeness */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border border-light">
            <h6 className="fw-bold mb-3 text-dark">Profile Strength</h6>
            <div className="progress mb-2" style={{height: '8px'}}>
              <div className="progress-bar bg-warning" role="progressbar" style={{width: '75%'}}></div>
            </div>
            <p className="small text-muted mb-3">Your profile is 75% complete. Add your Bar Council Certificate to reach 100% and get a Verified Badge.</p>
            <button className="btn btn-outline-dark btn-sm w-100 rounded-pill">Upload Certificate</button>
          </div>

          {/* Widget 2: Upcoming Hearings */}
          <div className="bg-dark text-white p-4 rounded-3 shadow-lg position-relative overflow-hidden">
            {/* Background Icon Decoration */}
            <i className="fa-solid fa-gavel fa-4x position-absolute opacity-10" style={{bottom: '-10px', right: '-10px'}}></i>
            
            <h6 className="fw-bold mb-4 text-warning"><i className="fa-regular fa-calendar me-2"></i>Upcoming Hearings</h6>
            
            <div className="border-start border-warning border-2 ps-3 mb-3">
              <h6 className="small fw-bold mb-1">State vs. Ravi Tech</h6>
              <p className="small text-white-50 mb-0">Court Room 4A • Tomorrow, 10:30 AM</p>
            </div>
            
            <div className="border-start border-secondary border-2 ps-3">
              <h6 className="small fw-bold mb-1">Sharma Partition Suit</h6>
              <p className="small text-white-50 mb-0">Virtual Hearing • 24th Feb, 2:00 PM</p>
            </div>

            <button className="btn btn-link text-warning text-decoration-none small p-0 mt-3 fw-bold">View Full Calendar <i className="fa-solid fa-arrow-right ms-1"></i></button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdvocateDashboard;