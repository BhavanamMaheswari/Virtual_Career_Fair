import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎯 Virtual Career Fair
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-links">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/events" className="nav-links">
                      Manage Events
                    </Link>
                  </li>
                </>
              )}

              {user?.role === 'company' && (
                <>
                  <li className="nav-item">
                    <Link to="/company/dashboard" className="nav-links">
                      Company Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/company/booths" className="nav-links">
                      My Booths
                    </Link>
                  </li>
                </>
              )}

              {user?.role === 'student' && (
                <>
                  <li className="nav-item">
                    <Link to="/student/events" className="nav-links">
                      Events
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/student/profile" className="nav-links">
                      Profile
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link to="/chat" className="nav-links">
                  💬 Chat
                </Link>
              </li>

              <li className="nav-item">
                <span className="user-info">Hello, {user?.firstName}</span>
              </li>

              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
