/**
 * ==============================================================================
 * MYLAW.COM - CLIENT FEED DASHBOARD
 * ==============================================================================
 * PURPOSE: The main landing area for logged-in Clients.
 * FEATURES:
 * 1. "Post Requirement" Widget (To hire lawyers).
 * 2. "Advocate Feed" (To see who is active/winning cases).
 * 3. Real-time updates (Simulated).
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- MOCK DATA (Simulating Backend Response) ---
const MOCK_ADVOCATES = [
  {
    id: 1,
    name: "Adv. Rajesh Sharma",
    specialization: "Criminal Law",
    experience: "15 Years",
    court: "Supreme Court of India",
    recentActivity: "Just won a landmark bail hearing for a high-profile corporate client.",
    likes: 124,
    verified: true,
    avatarColor: "#0f172a" // Navy
  },
  {
    id: 2,
    name: "Adv. Priya Desai",
    specialization: "Family & Divorce",
    experience: "8 Years",
    court: "Delhi High Court",
    recentActivity: "Shared a new article: 'Understanding Alimony Rights in 2026'.",
    likes: 89,
    verified: true,
    avatarColor: "#c4a962" // Gold
  },
  {
    id: 3,
    name: "Adv. Ankit Mehra",
    specialization: "Corporate Property",
    experience: "12 Years",
    court: "Mumbai High Court",
    recentActivity: "Successfully closed a ₹50Cr merger dispute settlement.",
    likes: 210,
    verified: false,
    avatarColor: "#ef4444" // Red
  }
];

/**
 * ==============================================================================
 * COMPONENT: POST REQUIREMENT WIDGET
 * ==============================================================================
 */
const PostRequirementWidget = ({ onPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPost(text);
    setText('');
  };

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border border-light">
      <div className="d-flex gap-3">
        <div className="bg-secondary rounded-circle text-white d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '48px', height: '48px'}}>
          R
        </div>
        <div className="flex-grow-1">
          <form onSubmit={handleSubmit}>
            <textarea
              className="form-control border-0 bg-light p-3 mb-3"
              rows="2"
              placeholder="Describe your legal issue here... (e.g. 'Need a lawyer for property registration in Hyderabad')"
              style={{ resize: 'none', borderRadius: '12px' }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-light btn-sm text-secondary rounded-pill"><i className="fa-solid fa-image me-1"></i> Document</button>
                <button type="button" className="btn btn-light btn-sm text-secondary rounded-pill"><i className="fa-solid fa-location-dot me-1"></i> Location</button>
              </div>
              <button type="submit" className="btn btn-primary px-4 rounded-pill fw-bold" disabled={!text.trim()}>
                Post Requirement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * COMPONENT: ADVOCATE CARD
 * ==============================================================================
 */
const AdvocateCard = ({ advocate }) => (
  <div className="feed-card bg-white p-4 rounded-3 shadow-sm mb-3 border border-light">
    {/* Header */}
    <div className="d-flex justify-content-between align-items-start mb-3">
      <div className="d-flex gap-3">
        <div 
          className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" 
          style={{width: '48px', height: '48px', backgroundColor: advocate.avatarColor}}
        >
          {advocate.name.charAt(4)}
        </div>
        <div>
          <h6 className="mb-0 fw-bold text-dark">
            {advocate.name} 
            {advocate.verified && <i className="fa-solid fa-circle-check text-primary ms-1 small" title="Verified Advocate"></i>}
          </h6>
          <small className="text-muted" style={{fontSize: '0.75rem'}}>
            {advocate.specialization} • {advocate.court}
          </small>
        </div>
      </div>
      <button className="btn btn-outline-primary btn-sm rounded-pill px-3">
        <i className="fa-solid fa-user-plus me-1"></i> Connect
      </button>
    </div>

    {/* Content */}
    <p className="text-secondary mb-3" style={{fontSize: '0.95rem'}}>
      {advocate.recentActivity}
    </p>

    {/* Stats/Actions */}
    <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
      <div className="d-flex gap-4">
        <button className="btn btn-link text-decoration-none text-muted p-0 small">
          <i className="fa-regular fa-thumbs-up me-1"></i> {advocate.likes} Likes
        </button>
        <button className="btn btn-link text-decoration-none text-muted p-0 small">
          <i className="fa-regular fa-comment me-1"></i> Comment
        </button>
      </div>
      <small className="text-muted" style={{fontSize: '0.7rem'}}>2 hours ago</small>
    </div>
  </div>
);

/**
 * ==============================================================================
 * MAIN PAGE COMPONENT
 * ==============================================================================
 */
const ClientFeed = () => {
  const [userPosts, setUserPosts] = useState([]);

  // Handler for posting new requirements
  const handleNewPost = (text) => {
    const newPost = {
      id: Date.now(),
      text: text,
      timestamp: 'Just now',
      status: 'Pending Review'
    };
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        
        {/* LEFT COLUMN: Main Feed (66%) */}
        <div className="col-lg-8">
          
          {/* 1. Post Widget */}
          <PostRequirementWidget onPost={handleNewPost} />

          {/* 2. User's Own Posts (If any) */}
          {userPosts.map(post => (
            <div key={post.id} className="bg-primary bg-opacity-10 p-4 rounded-3 mb-4 border border-primary">
              <div className="d-flex justify-content-between mb-2">
                <span className="badge bg-primary">Your Requirement</span>
                <small className="text-muted">{post.timestamp}</small>
              </div>
              <p className="mb-0 fw-medium text-dark">{post.text}</p>
              <div className="mt-2 small text-primary">
                <i className="fa-solid fa-clock me-1"></i> Status: {post.status}
              </div>
            </div>
          ))}

          {/* 3. Advocate Activity Feed */}
          <h6 className="text-muted fw-bold text-uppercase small mb-3">Top Advocates in Your Area</h6>
          {MOCK_ADVOCATES.map(adv => (
            <AdvocateCard key={adv.id} advocate={adv} />
          ))}
        </div>

        {/* RIGHT COLUMN: Sidebar Widgets (33%) */}
        <div className="col-lg-4 d-none d-lg-block">
          
          {/* Widget 1: Case Status */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4 border border-light">
            <h6 className="fw-bold mb-3">Active Cases</h6>
            <div className="text-center py-4 text-muted bg-light rounded border border-dashed">
              <i className="fa-solid fa-folder-open fa-2x mb-2 text-secondary"></i>
              <p className="small mb-0">No active cases found.</p>
              <Link to="/client/search" className="btn btn-link btn-sm">Find a lawyer to start</Link>
            </div>
          </div>

          {/* Widget 2: Suggested Lawyers */}
          <div className="bg-white p-4 rounded-3 shadow-sm border border-light">
            <h6 className="fw-bold mb-3">Suggested for You</h6>
            <ul className="list-unstyled mb-0 space-y-3">
              <li className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-2">
                   <div className="bg-warning rounded-circle" style={{width: '32px', height: '32px'}}></div>
                   <div>
                     <p className="mb-0 small fw-bold">Adv. S. Gupta</p>
                     <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>High Court</small>
                   </div>
                </div>
                <button className="btn btn-sm btn-outline-dark rounded-circle"><i className="fa-solid fa-plus"></i></button>
              </li>
              <li className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                   <div className="bg-info rounded-circle" style={{width: '32px', height: '32px'}}></div>
                   <div>
                     <p className="mb-0 small fw-bold">Adv. M. Khan</p>
                     <small className="text-muted d-block" style={{fontSize: '0.7rem'}}>District Court</small>
                   </div>
                </div>
                <button className="btn btn-sm btn-outline-dark rounded-circle"><i className="fa-solid fa-plus"></i></button>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ClientFeed;