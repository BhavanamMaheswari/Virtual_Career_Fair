# ⚡ Quick Start Checklist

## 🚀 First Time Setup (30 minutes)

### Pre-requisites Check
- [ ] Node.js installed (v18+)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] Git installed
- [ ] VS Code or preferred editor

### Backend Setup
```bash
# Terminal 1
cd server
[ ] npm install
[ ] Copy .env.example to .env
[ ] Update .env with your settings
[ ] npm run dev
[ ] ✅ Backend running on http://localhost:5000
```

### Frontend Setup
```bash
# Terminal 2
cd virtual-career-fair-frontend
[ ] npm install
[ ] npm start
[ ] ✅ Frontend running on http://localhost:3000
```

---

## ✅ After Installation Verification

### Backend Checks
- [ ] MongoDB connected
- [ ] Server running on port 5000
- [ ] Socket.io initialized
- [ ] No errors in console

### Frontend Checks
- [ ] App loads at localhost:3000
- [ ] Navigation bar visible
- [ ] Home page displays correctly
- [ ] No console errors

### API Checks
```bash
# Test in Postman or browser
[ ] GET http://localhost:5000/api/health returns 200
[ ] Health check shows "Server is running"
```

---

## 🔐 Create Test Accounts

### Admin Account
1. [ ] Go to Register page
2. [ ] Fill in details
3. [ ] Select "Admin" role
4. [ ] Click Register
5. [ ] Save credentials for testing

### Company Account
1. [ ] Register with "Company" role
2. [ ] Login and verify
3. [ ] Save credentials

### Student Account
1. [ ] Register with "Student" role
2. [ ] Login and verify
3. [ ] Save credentials

---

## 🧪 Test Basic Features

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Logout works
- [ ] Token stored in localStorage
- [ ] Auto-login on page refresh

### Events (Admin)
- [ ] Create new event
- [ ] View all events
- [ ] Update event details
- [ ] Event appears for students

### Student Features
- [ ] View events
- [ ] Register for event
- [ ] Upload resume (PDF)
- [ ] View profile

### Chat
- [ ] Send message between users
- [ ] Receive message in real-time
- [ ] See conversation history
- [ ] Typing indicator works

---

## 📚 Documentation Review

- [ ] Read README.md
- [ ] Review API_DOCUMENTATION.md
- [ ] Check SETUP_GUIDE.md for any issues
- [ ] Bookmark FEATURES_CHECKLIST.md for roadmap

---

## 🎯 Common First Steps

### If Backend Fails
- [ ] Check if port 5000 is free
- [ ] Verify MongoDB is running
- [ ] Check .env file has correct values
- [ ] Review SETUP_GUIDE.md

### If Frontend Fails
- [ ] Check if port 3000 is free
- [ ] Clear browser cache
- [ ] Delete node_modules and npm install again
- [ ] Check console for errors

### If Chat Doesn't Work
- [ ] Verify Socket.io is connected in console
- [ ] Check backend is running
- [ ] Ensure FRONTEND_URL in backend .env is correct
- [ ] Check browser console for errors

---

## 🔧 Useful Commands

### Backend
```bash
cd server
npm run dev        # Start with auto-reload
npm start          # Start normally
npm install        # Install dependencies
```

### Frontend
```bash
cd virtual-career-fair-frontend
npm start          # Start dev server
npm run build      # Create production build
npm install        # Install dependencies
```

### Database
```bash
mongo              # Enter MongoDB shell (if local)
show dbs           # Show all databases
use virtual-career-fair  # Select database
db.users.find()    # View users
```

---

## 💡 Tips & Tricks

1. **Auto-save:** Use Ctrl+S to save files for nodemon to pick up changes
2. **Console:** Check browser and terminal console for errors
3. **Network Tab:** Use browser DevTools Network tab to see API calls
4. **Postman:** Test API endpoints independently
5. **MongoDB Compass:** Visual MongoDB client for data inspection
6. **Hot Reload:** Frontend auto-reloads, backend reloads with nodemon

---

## 📊 Feature Quick Reference

### Available Now
- ✅ User authentication (3 roles)
- ✅ Event management
- ✅ Company booths
- ✅ Resume upload
- ✅ Real-time chat
- ✅ Role-based access

### Coming Soon (Phase 2)
- ⏳ Admin analytics dashboard
- ⏳ Email notifications
- ⏳ Advanced search
- ⏳ Video calls
- ⏳ Payment system

---

## 🚨 Troubleshooting Quick Guide

| Problem | Solution |
|---------|----------|
| Port already in use | Kill process or use different port |
| MongoDB connection fails | Check MONGODB_URI in .env |
| API calls fail | Ensure backend is running on :5000 |
| Chat not working | Check Socket.io console logs |
| Frontend won't load | Check if port 3000 is free |
| Login fails | Verify user exists in database |
| Resume upload fails | Check file is PDF and < 5MB |
| Build fails | Clear node_modules and reinstall |

---

## 🎓 Learning Path

### Day 1: Setup & Explore
- [ ] Complete setup
- [ ] Create test accounts
- [ ] Explore UI
- [ ] Read README.md

### Day 2: Understanding Code
- [ ] Review API routes
- [ ] Check authentication flow
- [ ] Understand database schema
- [ ] Read API_DOCUMENTATION.md

### Day 3: Customization
- [ ] Modify styling
- [ ] Add custom features
- [ ] Test thoroughly
- [ ] Plan Phase 2 features

### Day 4: Deployment
- [ ] Prepare for production
- [ ] Set up error tracking
- [ ] Configure environment
- [ ] Deploy to server

---

## 📋 File Locations Quick Reference

| What | Location |
|------|----------|
| Backend config | `server/.env` |
| Database schemas | `server/models/index.js` |
| API routes | `server/routes/*.js` |
| Main auth | `server/middleware/auth.js` |
| Frontend auth | `src/context/AuthContext.js` |
| API client | `src/services/api.js` |
| Chat service | `src/services/socketService.js` |
| Global styles | `src/App.css` |
| Documentation | Root folder *.md files |

---

## ✨ Success Indicators

You'll know it's working when:

✅ Backend console shows "Connected to MongoDB"
✅ Frontend shows home page without errors
✅ Can register and login successfully
✅ Chat sends and receives messages in real-time
✅ Can upload and manage resumes
✅ Navigation changes based on user role
✅ No console errors in browser or terminal

---

## 🎉 You're All Set!

If all checks passed above, you're ready to:
1. Customize the platform
2. Add new features
3. Deploy to production
4. Start using the platform

---

## 📞 Need Help?

1. **Documentation:** Check *.md files in root
2. **Code Comments:** Read inline code documentation
3. **Error Messages:** Read console output carefully
4. **SETUP_GUIDE.md:** Detailed troubleshooting section

---

## 🚀 Ready to Launch!

Your Virtual Career Fair platform is now ready for:
- Local testing
- Development
- Customization
- Production deployment

**Let's get started! 🎯**

---

Last Updated: February 28, 2024
Project Version: 1.0.0
Status: ✅ Ready to Use
