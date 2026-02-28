import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { resumesAPI } from '../services/api';
import '../styles/Profile.css';

const StudentProfile = () => {
  const { user } = useAuth();
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setError('');
    } else {
      setError('Please select a PDF file');
      setResumeFile(null);
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);

      await resumesAPI.upload(formData);
      setMessage('Resume uploaded successfully!');
      setResumeFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>👤 Student Profile</h1>

      <div className="profile-card">
        <div className="profile-info">
          <h2>{user?.firstName} {user?.lastName}</h2>
          <p className="profile-email">📧 {user?.email}</p>
          <p className="profile-role">Role: <strong>{user?.role}</strong></p>
        </div>

        <div className="resume-section">
          <h3>📄 Resume Upload</h3>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleResumeUpload} className="resume-form">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={loading}
            />
            {resumeFile && <p className="file-name">Selected: {resumeFile.name}</p>}
            <button type="submit" disabled={!resumeFile || loading}>
              {loading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </form>
        </div>

        <div className="bookmarks-section">
          <h3>⭐ Bookmarked Companies</h3>
          <p>View companies you've bookmarked during the fair</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
