const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Events API
export const eventsAPI = {
  getAll: () => apiCall('/events'),
  getById: (id) => apiCall(`/events/${id}`),
  create: (eventData) =>
    apiCall('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  update: (id, eventData) =>
    apiCall(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),
  register: (eventId) =>
    apiCall(`/events/${eventId}/register`, {
      method: 'POST',
    }),
};

// Companies API
export const companiesAPI = {
  getAll: () => apiCall('/companies'),
  getById: (id) => apiCall(`/companies/${id}`),
  register: (companyData) =>
    apiCall('/companies', {
      method: 'POST',
      body: JSON.stringify(companyData),
    }),
  update: (id, companyData) =>
    apiCall(`/companies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
    }),
  approve: (id) =>
    apiCall(`/companies/${id}/approve`, {
      method: 'PATCH',
    }),
};

// Booths API
export const boothsAPI = {
  getByEvent: (eventId) => apiCall(`/booths/event/${eventId}`),
  getById: (id) => apiCall(`/booths/${id}`),
  create: (boothData) =>
    apiCall('/booths', {
      method: 'POST',
      body: JSON.stringify(boothData),
    }),
  update: (id, boothData) =>
    apiCall(`/booths/${id}`, {
      method: 'PUT',
      body: JSON.stringify(boothData),
    }),
  recordVisitor: (boothId) =>
    apiCall(`/booths/${boothId}/visitor`, {
      method: 'POST',
    }),
  getMyBooths: () => apiCall('/booths/company/my-booths'),
};

// Resumes API
export const resumesAPI = {
  upload: (formData) =>
    fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error('Resume upload failed');
      return res.json();
    }),
  getStudentResume: (studentId) => apiCall(`/resumes/student/${studentId}`),
  delete: (id) =>
    apiCall(`/resumes/${id}`, {
      method: 'DELETE',
    }),
};

// Chat API
export const chatAPI = {
  sendMessage: (receiverId, message) =>
    apiCall('/chat/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, message }),
    }),
  getMessages: (userId) => apiCall(`/chat/messages/${userId}`),
  getConversations: () => apiCall('/chat/conversations'),
  markAsRead: (messageId) =>
    apiCall(`/chat/${messageId}/read`, {
      method: 'PATCH',
    }),
};
