# Troubleshooting Guide

## Login/Registration Errors

### Error: "Login failed. Please check your credentials"

**Possible Causes & Solutions:**

#### 1. Backend Server Not Running
**Check:**
- Open terminal and verify backend is running
- You should see: `🚀 Server running on http://localhost:5000`
- You should see: `✅ Connected to MongoDB`

**Solution:**
```bash
# Make sure you're in the project directory
cd c:\Users\acer\Desktop\tourist

# Start the server
npm run dev
# OR separately:
npm run dev:server
```

#### 2. MongoDB Not Running
**Check:**
- MongoDB service should be running
- Check connection string in `.env` file

**Solution:**
```bash
# Windows: Check if MongoDB service is running
# Open Services (services.msc) and look for MongoDB

# Or start MongoDB manually if installed locally
mongod
```

#### 3. Admin User Not Created
**Check:**
- Try to register a new user first
- If registration works but login doesn't, admin might not exist

**Solution:**
```bash
# Create admin user
npm run seed:admin

# Default credentials:
# Email: admin@turkishelite.com
# Password: admin123
```

#### 4. Dependencies Not Installed
**Check:**
- Look for `node_modules` folder
- Check if `bcryptjs` and `jsonwebtoken` are installed

**Solution:**
```bash
npm install
```

#### 5. Port Conflicts
**Check:**
- Port 5000 might be in use
- Port 5173 (Vite) might be in use

**Solution:**
```bash
# Change PORT in .env file
PORT=5001

# Or kill the process using the port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### 6. CORS Issues
**Check:**
- Browser console for CORS errors
- Verify CLIENT_URL in `.env` matches your frontend URL

**Solution:**
- Make sure `.env` has: `CLIENT_URL=http://localhost:5173`
- Restart backend server after changing `.env`

### Error: "Cannot connect to server"

**Solution:**
1. Check if backend is running: `http://localhost:5000/api/health`
2. Should return: `{"status":"OK","message":"Server is running"}`
3. If not, start backend: `npm run dev:server`

### Error: "User already exists" (Registration)

**Solution:**
- User with that email already exists
- Try logging in instead
- Or use a different email

### Error: "Invalid credentials"

**Possible Causes:**
1. Wrong email or password
2. User doesn't exist (need to register first)
3. Password was changed but you're using old password

**Solution:**
1. Try registering a new user first
2. Or create admin: `npm run seed:admin`
3. Use exact credentials: `admin@turkishelite.com` / `admin123`

## Quick Fix Checklist

1. ✅ **Install dependencies:**
   ```bash
   npm install
   ```

2. ✅ **Start MongoDB:**
   - Make sure MongoDB is running
   - Check `.env` for correct connection string

3. ✅ **Create admin user:**
   ```bash
   npm run seed:admin
   ```

4. ✅ **Start backend server:**
   ```bash
   npm run dev:server
   ```
   Should see: `🚀 Server running on http://localhost:5000`

5. ✅ **Start frontend (in another terminal):**
   ```bash
   npm run dev:client
   ```
   Should see: `Local: http://localhost:5173/`

6. ✅ **Test backend health:**
   - Open browser: `http://localhost:5000/api/health`
   - Should return JSON with status OK

7. ✅ **Try login:**
   - Email: `admin@turkishelite.com`
   - Password: `admin123`

## Debug Steps

### Check Backend Logs
Look at the terminal where backend is running. You should see:
- Login attempts logged
- User found/not found messages
- Password match results

### Check Browser Console
Open browser DevTools (F12) and check:
- Network tab: See if API calls are being made
- Console tab: Look for error messages
- Check if requests are going to correct URL

### Test API Directly
Use Postman or curl to test:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@turkishelite.com","password":"admin123"}'
```

## Common Issues

### Issue: "bcryptjs module not found"
**Solution:**
```bash
npm install bcryptjs jsonwebtoken
```

### Issue: "MongoDB connection error"
**Solution:**
- Check MongoDB is running
- Verify connection string in `.env`
- Try: `mongodb://localhost:27017/turkish-elite-tourism`

### Issue: Frontend can't connect to backend
**Solution:**
- Check `VITE_API_URL` in `.env` (or defaults to `http://localhost:5000/api`)
- Make sure backend is running on port 5000
- Check CORS settings in `server/index.js`

## Still Having Issues?

1. Check all terminal windows for error messages
2. Verify MongoDB is running and accessible
3. Make sure both frontend and backend are running
4. Try clearing browser cache and localStorage
5. Check `.env` file has correct values
6. Restart everything: Stop all processes, then start fresh
