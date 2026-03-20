/**
 * ==============================================================================
 * MYLAW.COM - ABOUT US PAGE
 * ==============================================================================
 * PURPOSE: Marketing page detailing the company mission and founding team.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="bg-dark text-white py-5 text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-3">Democratizing Legal Access</h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
            Mylaw.com was founded on a simple principle: finding the right legal representation shouldn't be as stressful as the legal problem itself.
          </p>
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold text-dark mb-4">Our Mission</h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We are bridging the gap between everyday citizens and top-tier legal professionals across India. By leveraging advanced technology, we provide a transparent, secure, and highly efficient marketplace where clients can post their requirements and advocates can find cases that match their expertise.
              </p>
              <ul className="list-unstyled mt-4 space-y-2 text-secondary">
                <li><i className="fa-solid fa-circle-check text-primary me-2"></i> Verified, Bar-Council registered advocates.</li>
                <li><i className="fa-solid fa-circle-check text-primary me-2"></i> Transparent matching algorithms.</li>
                <li><i className="fa-solid fa-circle-check text-primary me-2"></i> Secure end-to-end communication.</li>
              </ul>
            </div>
            <div className="col-lg-6 text-center">
              {/* Decorative Icon Grid */}
              <div className="row g-3">
                <div className="col-6"><div className="bg-white p-4 rounded shadow-sm"><i className="fa-solid fa-scale-balanced fa-3x text-primary mb-3"></i><h6 className="fw-bold">Justice</h6></div></div>
                <div className="col-6"><div className="bg-white p-4 rounded shadow-sm mt-4"><i className="fa-solid fa-handshake fa-3x text-warning mb-3"></i><h6 className="fw-bold">Trust</h6></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP TEAM SECTION (Where your pictures go!) */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Meet the Founders</h2>
            <p className="text-muted">The visionaries behind Mylaw.com</p>
          </div>

          <div className="row g-5 justify-content-center">
            
            {/* CEO Profile */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="position-relative mb-4 mx-auto" style={{ width: '200px', height: '200px' }}>
                {/* IMAGE INSTRUCTION: 
                  Replace the placeholder div below with this standard img tag once your image is in the public folder:
                  <img src="/images/team/ceo.jpg" alt="CEO" className="rounded-circle shadow w-100 h-100 object-fit-cover border border-4 border-white" />
                */}
                <div className="bg-secondary rounded-circle shadow w-100 h-100 d-flex align-items-center justify-content-center text-white border border-4 border-white">
                  <i className="fa-solid fa-user-tie fa-4x"></i>
                </div>
              </div>
              <h4 className="fw-bold mb-1">Your Name</h4>
              <p className="text-primary fw-bold small text-uppercase letter-spacing-1">Founder & CEO</p>
              <p className="text-muted small px-3">
                Driving the strategic vision of Mylaw, ensuring technology serves justice effectively and transparently.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <a href="#" className="btn btn-sm btn-light text-secondary rounded-circle"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#" className="btn btn-sm btn-light text-secondary rounded-circle"><i className="fa-brands fa-twitter"></i></a>
              </div>
            </div>

            {/* Co-Founder Profile 1 */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="position-relative mb-4 mx-auto" style={{ width: '200px', height: '200px' }}>
                {/* <img src="/images/team/cofounder1.jpg" alt="Co-Founder" className="rounded-circle shadow w-100 h-100 object-fit-cover border border-4 border-white" /> */}
                <div className="bg-secondary bg-opacity-75 rounded-circle shadow w-100 h-100 d-flex align-items-center justify-content-center text-white border border-4 border-white">
                  <i className="fa-solid fa-user fa-4x"></i>
                </div>
              </div>
              <h4 className="fw-bold mb-1">Co-Founder Name</h4>
              <p className="text-primary fw-bold small text-uppercase letter-spacing-1">Co-Founder & CTO</p>
              <p className="text-muted small px-3">
                Architecting the secure, microservices-based infrastructure that powers the Mylaw platform.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <a href="#" className="btn btn-sm btn-light text-secondary rounded-circle"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>

            {/* Co-Founder Profile 2 (If applicable) */}
            <div className="col-md-6 col-lg-4 text-center">
              <div className="position-relative mb-4 mx-auto" style={{ width: '200px', height: '200px' }}>
                {/* <img src="/images/team/cofounder2.jpg" alt="Co-Founder" className="rounded-circle shadow w-100 h-100 object-fit-cover border border-4 border-white" /> */}
                <div className="bg-secondary bg-opacity-50 rounded-circle shadow w-100 h-100 d-flex align-items-center justify-content-center text-white border border-4 border-white">
                  <i className="fa-solid fa-user fa-4x"></i>
                </div>
              </div>
              <h4 className="fw-bold mb-1">Co-Founder Name</h4>
              <p className="text-primary fw-bold small text-uppercase letter-spacing-1">Co-Founder & COO</p>
              <p className="text-muted small px-3">
                Managing legal onboarding, KYC compliance, and day-to-day platform operations.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <a href="#" className="btn btn-sm btn-light text-secondary rounded-circle"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="bg-primary text-white py-5 text-center">
        <div className="container py-4">
          <h3 className="fw-bold mb-3">Ready to join the revolution?</h3>
          <p className="mb-4 text-white-50">Whether you need legal help or want to grow your practice, Mylaw is your destination.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/auth/signup?role=client" className="btn btn-light text-primary fw-bold px-4 py-2 rounded-pill">Find a Lawyer</Link>
            <Link to="/auth/signup?role=advocate" className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill">Join as Advocate</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;