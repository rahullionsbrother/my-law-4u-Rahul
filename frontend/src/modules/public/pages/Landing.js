/**
 * ==============================================================================
 * MYLAW.COM - LANDING PAGE
 * ==============================================================================
 * STRATEGY: 
 * 1. Immediate Segmentation (Client vs Advocate).
 * 2. "Social Proof" via Mock Feeds.
 * 3. High-Conversion CTA Buttons.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../App.css'; // Import global variables

const Landing = () => {
  return (
    <div className="landing-page overflow-hidden">
      
      {/* ========================================
          SECTION 1: THE DUAL HERO (Split Screen)
          ======================================== */}
      <section className="hero-section d-flex flex-column flex-lg-row align-items-stretch min-vh-100">
        
        {/* LEFT SPLIT: FOR CLIENTS (Citizens) */}
        <div className="hero-split client-split flex-grow-1 d-flex flex-column justify-content-center p-5 position-relative" 
             style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}>
          
          <div className="content-wrapper position-relative z-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill fw-bold">
              <i className="fa-solid fa-user-shield me-2"></i> For Citizens
            </span>
            
            <h1 className="display-4 fw-bold text-dark mb-4">
              Find Justice.<br />
              <span className="text-primary">Not Just a Lawyer.</span>
            </h1>
            
            <p className="lead text-secondary mb-5">
              Post your case requirements anonymously on our secure feed. 
              Get proposals from top High Court advocates instantly.
            </p>
            
            <div className="d-flex gap-3">
              <Link to="/auth/signup?role=client" className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg">
                Find a Lawyer
              </Link>
              <Link to="/how-it-works" className="btn btn-outline-dark btn-lg px-4 rounded-circle">
                <i className="fa-solid fa-play"></i>
              </Link>
            </div>
            
            {/* MOCK FEED CARD (Visual Teaser) */}
            <div className="mt-5 p-4 bg-white rounded-4 shadow-sm border border-light">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-success rounded-circle p-1" style={{width: '12px', height: '12px'}}></div>
                <small className="text-muted fw-bold text-uppercase">Live Feed Activity</small>
              </div>
              
              {/* Fake Feed Item 1 */}
              <div className="d-flex gap-3 mb-3">
                <div className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    <i className="fa-solid fa-user text-secondary"></i>
                </div>
                <div>
                  <p className="mb-0 small fw-bold">Ravi R. posted a requirement</p>
                  <small className="text-muted" style={{fontSize: '0.75rem'}}>Property Dispute • Hyderabad • 2 mins ago</small>
                </div>
              </div>

               {/* Fake Feed Item 2 */}
               <div className="d-flex gap-3">
                <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                    <i className="fa-solid fa-scale-balanced text-primary"></i>
                </div>
                <div>
                  <p className="mb-0 small fw-bold">Adv. Sharma accepted the case</p>
                  <small className="text-muted" style={{fontSize: '0.75rem'}}>Civil Law • Connected via Chat</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SPLIT: FOR ADVOCATES */}
        <div className="hero-split advocate-split flex-grow-1 d-flex flex-column justify-content-center p-5 bg-dark text-white position-relative">
          
          <div className="content-wrapper position-relative z-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <span className="badge bg-warning bg-opacity-25 text-warning mb-3 px-3 py-2 rounded-pill fw-bold">
              <i className="fa-solid fa-gavel me-2"></i> For Advocates
            </span>
            
            <h1 className="display-4 fw-bold mb-4">
              Grow Your Practice.<br />
              <span className="text-warning">Build Your Legacy.</span>
            </h1>
            
            <p className="lead text-white-50 mb-5">
              Access a live feed of verified clients. Showcase your case victories. 
              Manage your entire practice—from hearings to payments—in one dashboard.
            </p>
            
            <div className="d-flex gap-3">
              <Link to="/auth/signup?role=advocate" className="btn btn-warning btn-lg px-5 rounded-pill shadow-lg text-dark fw-bold">
                Join as Advocate
              </Link>
            </div>

            {/* LIVE STATS (Social Proof) */}
            <div className="row mt-5 g-3">
              <div className="col-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-secondary backdrop-blur">
                  <h3 className="fw-bold text-white mb-0">12,400+</h3>
                  <small className="text-white-50">Active Clients</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 rounded-3 bg-white bg-opacity-10 border border-secondary backdrop-blur">
                  <h3 className="fw-bold text-white mb-0">₹4.2 Cr</h3>
                  <small className="text-white-50">Fees Processed</small>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================
          SECTION 2: WHY SOCIAL LAW?
          ======================================== */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Not Just a Directory. <span className="text-primary">A Legal Network.</span></h2>
            <p className="lead text-secondary">Connect, Follow, and Resolve. The first social platform dedicated to Indian Law.</p>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* Feature 1: The Feed */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift transition-all">
                <div className="card-body text-center p-4">
                  <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
                    <i className="fa-solid fa-rss fa-2x"></i>
                  </div>
                  <h4 className="fw-bold">Smart Feeds</h4>
                  <p className="text-secondary small">
                    <strong>Clients:</strong> See real-time updates from top lawyers. <br/>
                    <strong>Advocates:</strong> See new case requirements instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Profiles */}
            <div className="col-md-4">
              <div className="card border-0 shadow-lg h-100 bg-primary text-white transform-scale-105">
                <div className="card-body text-center p-5">
                  <div className="icon-box bg-white text-primary rounded-circle p-3 d-inline-block mb-3">
                    <i className="fa-solid fa-id-card fa-2x"></i>
                  </div>
                  <h4 className="fw-bold">Verified Profiles</h4>
                  <p className="text-white-50 small">
                    Check win rates, read client reviews, and view specialized practice areas before you connect.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Chat */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift transition-all">
                <div className="card-body text-center p-4">
                  <div className="icon-box bg-success bg-opacity-10 text-success rounded-circle p-3 d-inline-block mb-3">
                    <i className="fa-regular fa-comments fa-2x"></i>
                  </div>
                  <h4 className="fw-bold">Direct Connect</h4>
                  <p className="text-secondary small">
                    Send connection requests. Chat securely. Share documents without leaving the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;