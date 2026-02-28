# 🚀 Virtual Career Fair - Setup & Installation Guide

This guide will walk you through setting up the entire Virtual Career Fair platform locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation
```bash
node --version
npm --version
mongodb --version
git --version
```

---

## Installation Steps

### Step 1: Clone or Setup Project

If you have a Git repository:
```bash
git clone <repository-url>
cd virtual-career-fair
```

Or create the directory structure manually:
```bash
mkdir virtual-career-fair
cd virtual-career-fair
```

---

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd server
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your settings using your favorite editor
# (nano, vim, VS Code, etc.)
```

**Example .env configuration:**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/virtual-career-fair

# JWT Token
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# File Upload Settings
MAX_FILE_SIZE=5242880
```

#### 2.4 Create Required Directories
```bash
# Create directories for uploads
mkdir -p uploads/resumes
```

#### 2.5 (Optional) Create MongoDB Connection
**For Local MongoDB:**
```bash
# Start MongoDB in a separate terminal
mongod
```

**Or use MongoDB Atlas (Cloud):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `MONGODB_URI` in .env

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/virtual-career-fair
```

#### 2.6 Start Backend Server
```bash
# Development mode (with nodemon)
npm run dev

# Or regular start
npm start
```

**Expected output:**
```
Connected to MongoDB
Server running on port 5000
```

✅ Backend is now running on **http://localhost:5000**

---

### Step 3: Frontend Setup

#### 3.1 Open New Terminal and Navigate to Frontend
```bash
# From the root directory
cd virtual-career-fair-frontend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 (Optional) Create Environment File
Create `.env` file in the frontend root (optional):
```env
REACT_APP_API_URL=http://localhost:5000
```

#### 3.4 Install Additional Dependencies (Socket.io)
```bash
npm install socket.io-client@4.7.2
```

#### 3.5 Start Frontend Development Server
```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view virtual-career-fair-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

✅ Frontend is now running on **http://localhost:3000**

---

## Accessing the Application

Open your browser and go to:
```
http://localhost:3000
```

### Test User Accounts

You can create new accounts, but here are some test scenarios:

**Admin:**
- Email: `admin@example.com`
- Password: `Admin@123`
- Role: Admin

**Company:**
- Email: `company@example.com`
- Password: `Company@123`
- Role: Company

**Student:**
- Email: `student@example.com`
- Password: `Student@123`
- Role: Student

---

## Project Structure Overview

```
virtual-career-fair/
│
├── server/
│   ├── models/           # Database schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication, etc.
│   ├── server.js         # Main application file
│   ├── package.json
│   ├── .env              # Environment variables (create this)
│   └── .env.example      # Template for .env
│
└── virtual-career-fair-frontend/
    ├── src/
    │   ├── pages/        # Page components
    │   ├── components/   # Reusable components
    │   ├── context/      # React Context (Auth)
    │   ├── services/     # API and Socket.io services
    │   ├── styles/       # CSS files
    │   └── App.js        # Main app component
    ├── public/           # Static files
    ├── package.json
    └── .env              # Optional environment file
```

---

## Common Issues & Solutions

### Issue: "Port 5000 is already in use"
**Solution:**
```bash
# Find and kill the process using port 5000
# On Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# On macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

### Issue: "MongoDB connection refused"
**Solution:**
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in .env is correct
3. If using MongoDB Atlas, check your IP whitelist

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in backend .env
- Check CORS settings in server.js
- Verify API calls are using correct URL

### Issue: "Cannot find module 'socket.io-client'"
**Solution:**
```bash
cd virtual-career-fair-frontend
npm install socket.io-client@4.7.2
```

### Issue: Build fails with memory error
**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

---

## Development Workflow

### Terminal Layout (Recommended)

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd virtual-career-fair-frontend
npm start
```

### Hot Reload

- **Backend:** Automatically reloads with `npm run dev` (nodemon)
- **Frontend:** Automatically reloads when files change (React Scripts)

---

## Running Without Development Mode

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd virtual-career-fair-frontend
npm run build
serve -s build
```

---

## Database Seeding (Optional)

To populate with test data:

Create `server/seed.js`:
```javascript
const mongoose = require('mongoose');
const { User, Company, Event } = require('./models/index');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await User.deleteMany({});
    await Company.deleteMany({});
    await Event.deleteMany({});
    
    // Create test data
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin'
    });
    
    // Add more seed data...
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
```

Run it:
```bash
node seed.js
```

---

## Testing the API

### Using Postman or Thunder Client

1. **Register a User**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body (JSON):
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "student"
   }
   ```

2. **Login**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Get Current User** (Protected)
   - Method: GET
   - URL: `http://localhost:5000/api/auth/me`
   - Header: `Authorization: Bearer {token_from_login}`

---

## Next Steps

1. ✅ Application is running
2. 📝 Create test accounts
3. 🔍 Explore the UI
4. 📚 Review the API Documentation
5. 🛠️ Start customizing!

---

## Useful Commands

```bash
# Backend
cd server
npm install              # Install dependencies
npm run dev             # Start with nodemon
npm start               # Start normally
npm test                # Run tests (if configured)

# Frontend
cd virtual-career-fair-frontend
npm install             # Install dependencies
npm start               # Start dev server
npm run build           # Create production build
npm test                # Run tests
npm run eject           # Eject from CRA (not recommended)

# Database
mongod                  # Start MongoDB server
mongo                   # Connect to MongoDB CLI
```

---

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Socket.io Documentation](https://socket.io/docs/)
- [JWT Introduction](https://jwt.io/introduction)

---

## Support & Troubleshooting

If you encounter issues:

1. **Check Terminal Output** - Error messages often indicate the problem
2. **Verify Ports** - Ensure ports 3000, 5000 are free
3. **Check .env Files** - Environment variables must be set correctly
4. **Review Logs** - Check MongoDB and server logs
5. **Clear Cache** - Delete `node_modules` and reinstall if needed

---

## Deployment

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md) (optional guide).

---

**Happy Coding! 🎉**

For questions or issues, please check the main README.md or API_DOCUMENTATION.md
