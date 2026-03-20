/**
 * ==============================================================================
 * MYLAW.COM - HOME LANDING PAGE
 * ==============================================================================
 * PURPOSE: The main entry point to convert visitors into clients or advocates.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="fade-in">
      
      {/* ------------------------------------------------------------------
        HERO SECTION (Dark Theme)
        ------------------------------------------------------------------ */}
      <section className="bg-dark text-white position-relative overflow-hidden" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
        {/* Background Decorative Elements */}
        <div className="position-absolute top-0 end-0 opacity-10 translate-middle-y me-n5 mt-5">
          <i className="fa-solid fa-gavel" style={{ fontSize: '30rem' }}></i>
        </div>
        
        <div className="container position-relative z-index-1">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary bg-opacity-25 text-primary border border-primary px-3 py-2 rounded-pill mb-3 fw-bold tracking-wide">
                INDIA'S PREMIER LEGAL NETWORK
              </span>
              <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                Expert Legal Counsel,<br/>Just a Click Away.
              </h1>
              <p className="lead text-white-50 mb-5 pe-lg-4">
                Post your legal requirement securely and get proposals from Bar-Council verified advocates in minutes. Finding the right lawyer has never been this easy.
              </p>
              
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/auth/signup?role=client" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                  Find a Lawyer <i className="fa-solid fa-arrow-right ms-2"></i>
                </Link>
                <Link to="/auth/signup?role=advocate" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-bold">
                  Join as Advocate
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6 d-none d-lg-block">
              {/* Hero Graphic / Abstract UI Representation */}
              <div className="bg-white bg-opacity-10 p-4 rounded-4 border border-secondary shadow-lg backdrop-blur">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="bg-success rounded-circle" style={{width: '12px', height: '12px'}}></div>
                  <span className="text-white-50 small fw-bold">Live Activity Feed</span>
                </div>
                
                <div className="bg-dark rounded-3 p-3 mb-3 border border-secondary d-flex align-items-start gap-3 shadow-sm">
                  <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '40px', height: '40px'}}>P</div>
                  <div>
                    <h6 className="mb-1 text-white fw-bold">Property Dispute in Delhi</h6>
                    <p className="text-white-50 small mb-2">Looking for a real estate lawyer for a partition suit...</p>
                    <span className="badge bg-success bg-opacity-25 text-success border border-success">3 Proposals Received</span>
                  </div>
                </div>

                <div className="bg-dark rounded-3 p-3 border border-secondary d-flex align-items-start gap-3 shadow-sm opacity-75">
                  <div className="bg-info text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '40px', height: '40px'}}>C</div>
                  <div>
                    <h6 className="mb-1 text-white fw-bold">Corporate Vendor Agreement</h6>
                    <p className="text-white-50 small mb-2">Need an IP lawyer to draft a SaaS vendor contract...</p>
                    <span className="badge bg-success bg-opacity-25 text-success border border-success">1 Proposal Received</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
        HOW IT WORKS SECTION
        ------------------------------------------------------------------ */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">How Mylaw Works</h2>
            <p className="text-muted">A streamlined process for clients and advocates.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="bg-white p-5 rounded-4 shadow-sm h-100 border border-light">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                  <i className="fa-solid fa-pen-to-square fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">1. Post a Case</h4>
                <p className="text-muted small">Describe your legal issue securely. Your identity remains protected until you choose to reveal it.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="bg-white p-5 rounded-4 shadow-sm h-100 border border-light position-relative">
                <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                  <i className="fa-solid fa-gavel fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">2. Get Proposals</h4>
                <p className="text-muted small">Verified advocates review your case and submit customized proposals and fee structures.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="bg-white p-5 rounded-4 shadow-sm h-100 border border-light">
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '80px', height: '80px'}}>
                  <i className="fa-solid fa-handshake fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">3. Hire & Connect</h4>
                <p className="text-muted small">Compare profiles, read reviews, and hire the best lawyer for your specific needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
        STATISTICS SECTION
        ------------------------------------------------------------------ */}
      <section className="py-5 border-top border-bottom">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <h2 className="fw-bold text-primary display-5 mb-1">10k+</h2>
              <p className="text-muted fw-bold text-uppercase small">Verified Advocates</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold text-primary display-5 mb-1">50k+</h2>
              <p className="text-muted fw-bold text-uppercase small">Cases Posted</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold text-primary display-5 mb-1">98%</h2>
              <p className="text-muted fw-bold text-uppercase small">Client Satisfaction</p>
            </div>
            <div className="col-6 col-md-3">
              <h2 className="fw-bold text-primary display-5 mb-1">24/7</h2>
              <p className="text-muted fw-bold text-uppercase small">Platform Support</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;