import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import EventsPage from './pages/EventsPage';
import ChatPage from './pages/ChatPage';
import StudentProfile from './pages/StudentProfile';
import HomePage from './pages/HomePage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route
            path="/student/events"
            element={
              <ProtectedRoute requiredRole="student">
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          {/* Chat Route (All authenticated) */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Coming Soon */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <div className="page-placeholder">Admin Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute requiredRole="admin">
                <div className="page-placeholder">Manage Events (Coming Soon)</div>
              </ProtectedRoute>
            }
          />

          {/* Company Routes - Coming Soon */}
          <Route
            path="/company/dashboard"
            element={
              <ProtectedRoute requiredRole="company">
                <div className="page-placeholder">Company Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/company/booths"
            element={
              <ProtectedRoute requiredRole="company">
                <div className="page-placeholder">My Booths (Coming Soon)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;