import React, { useState, useEffect } from 'react';
import { eventsAPI, boothsAPI } from '../services/api';
import '../styles/Events.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getAll();
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    try {
      const data = await boothsAPI.getByEvent(event._id);
      setBooths(data.booths);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="events-container">
      <h1>🎯 Upcoming Career Fairs</h1>

      <div className="events-grid">
        {events.map((event) => (
          <div
            key={event._id}
            className="event-card"
            onClick={() => handleEventClick(event)}
          >
            <h3>{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <p className="event-date">
              📅 {new Date(event.startDate).toLocaleDateString()}
            </p>
            <p className="event-location">📍 {event.location}</p>
            <button className="view-btn">View Booths →</button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="event-details">
          <h2>{selectedEvent.title} - Company Booths</h2>
          <div className="booths-grid">
            {booths.map((booth) => (
              <div key={booth._id} className="booth-card">
                <h4>{booth.company?.name}</h4>
                <p>{booth.title}</p>
                <p className="booth-description">{booth.description}</p>
                {booth.jobRoles && (
                  <div className="job-roles">
                    <h5>Open Positions:</h5>
                    <ul>
                      {booth.jobRoles.map((role, idx) => (
                        <li key={idx}>{role.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button className="chat-btn">💬 Chat with Recruiter</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
