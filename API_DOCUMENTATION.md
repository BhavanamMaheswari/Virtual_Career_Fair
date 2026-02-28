# API Routes Summary

## Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/me | ✅ | Get current user profile |

---

## Event Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | /api/events | ❌ | - | Get all events |
| GET | /api/events/:id | ❌ | - | Get event by ID |
| POST | /api/events | ✅ | Admin | Create new event |
| PUT | /api/events/:id | ✅ | Admin | Update event |
| POST | /api/events/:eventId/register | ✅ | Student | Register for event |

---

## Company Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | /api/companies | ❌ | - | Get all companies |
| GET | /api/companies/:id | ❌ | - | Get company by ID |
| POST | /api/companies | ✅ | Company | Register company |
| PUT | /api/companies/:id | ✅ | Company | Update company profile |
| PATCH | /api/companies/:id/approve | ✅ | Admin | Approve company |

---

## Booth Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | /api/booths/event/:eventId | ❌ | - | Get booths by event |
| GET | /api/booths/:id | ❌ | - | Get booth by ID |
| POST | /api/booths | ✅ | Company | Create booth |
| PUT | /api/booths/:id | ✅ | Company | Update booth |
| POST | /api/booths/:boothId/visitor | ✅ | Student | Record visitor |
| GET | /api/booths/company/my-booths | ✅ | Company | Get company's booths |

---

## Resume Management

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/resumes | ✅ | Student | Upload resume |
| GET | /api/resumes/student/:studentId | ❌ | - | Get student resume |
| DELETE | /api/resumes/:id | ✅ | Student | Delete resume |

---

## Chat & Messaging

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/chat/send | ✅ | All | Send message |
| GET | /api/chat/messages/:userId | ✅ | All | Get chat history |
| GET | /api/chat/conversations | ✅ | All | Get all conversations |
| PATCH | /api/chat/:messageId/read | ✅ | All | Mark message as read |

---

## Request/Response Examples

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student"
  },
  "token": "eyJhbGc..."
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": { ... },
  "token": "eyJhbGc..."
}
```

### Create Event
```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Tech Career Fair 2024",
  "description": "Meet top tech companies",
  "startDate": "2024-03-15T10:00:00Z",
  "endDate": "2024-03-15T18:00:00Z",
  "location": "Virtual",
  "capacity": 1000
}

Response: 201 Created
{
  "message": "Event created successfully",
  "event": {
    "_id": "...",
    "title": "Tech Career Fair 2024",
    ...
  }
}
```

### Upload Resume
```
POST /api/resumes
Authorization: Bearer {token}
Content-Type: multipart/form-data

Form Data:
  resume: [file]

Response: 201 Created
{
  "message": "Resume uploaded successfully",
  "resume": {
    "_id": "...",
    "fileName": "resume.pdf",
    "filePath": "uploads/resumes/...",
    "fileSize": 245000
  }
}
```

### Send Message
```
POST /api/chat/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "receiverId": "user_id_here",
  "message": "Hi, I'm interested in your Jr Developer position!"
}

Response: 201 Created
{
  "message": "Message sent successfully",
  "chatMessage": {
    "_id": "...",
    "sender": "...",
    "receiver": "...",
    "message": "Hi, I'm interested...",
    "timestamp": "2024-02-28T10:30:00Z"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Event not found"
}
```

### 500 Server Error
```json
{
  "message": "Registration failed",
  "error": "error details"
}
```

---

## Socket.io Events

### Join Chat Room
```javascript
socket.emit('join_room', userId);
```

### Send Message (Real-time)
```javascript
socket.emit('send_message', {
  senderId: "...",
  receiverId: "...",
  message: "Hello!"
});

// Listen for message
socket.on('receive_message', (data) => {
  console.log(data.message);
});
```

### Typing Indicator
```javascript
socket.emit('user_typing', {
  senderId: "...",
  receiverId: "..."
});

socket.on('user_typing', (data) => {
  // Show "User is typing..." indicator
});
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Authentication

All protected endpoints require:
```
Authorization: Bearer {JWT_TOKEN}
```

Token is obtained from login/register endpoints and should be stored in localStorage or sessionStorage on the client.

---

## Rate Limiting

Currently not implemented. Consider adding in production:
- 100 requests per minute per IP
- 10 file uploads per hour per user
- 1000 messages per hour per user
