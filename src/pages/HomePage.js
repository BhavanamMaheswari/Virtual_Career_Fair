import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero">
        <h1>🎯 Virtual Career Fair Platform</h1>
        <p className="subtitle">
          Connect with top companies and advance your career from anywhere
        </p>

        {!isAuthenticated ? (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        ) : (
          <div className="hero-buttons">
            {user?.role === 'student' && (
              <Link to="/student/events" className="btn btn-primary">
                Explore Career Fairs
              </Link>
            )}
            {user?.role === 'company' && (
              <Link to="/company/booths" className="btn btn-primary">
                Manage Your Booth
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="btn btn-primary">
                Admin Dashboard
              </Link>
            )}
            <Link to="/chat" className="btn btn-secondary">
              Start Chatting
            </Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">💼</span>
            <h3>Company Booths</h3>
            <p>Create and customize virtual booths to connect with job seekers</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <h3>Real-Time Networking</h3>
            <p>Live chat with recruiters and students instantly</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📄</span>
            <h3>Resume Management</h3>
            <p>Upload and share your resume with recruiters easily</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Analytics Dashboard</h3>
            <p>Track visitor interactions and engagement metrics</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Bookmark Companies</h3>
            <p>Save your favorite companies for later follow-up</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔐</span>
            <h3>Secure Platform</h3>
            <p>Role-based access control and secure data handling</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Register</h4>
            <p>Create your account as a student, company, or admin</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h4>Join Events</h4>
            <p>Browse upcoming career fairs and register</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h4>Connect</h4>
            <p>Visit booths and chat with recruiters in real-time</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h4>Succeed</h4>
            <p>Land your dream job through our platform</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Transform Your Career?</h2>
        {!isAuthenticated ? (
          <Link to="/register" className="btn btn-large">
            Start Now
          </Link>
        ) : (
          <p>Welcome back, {user?.firstName}!</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
