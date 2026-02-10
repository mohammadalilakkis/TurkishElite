# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update MongoDB URI if needed
```

### 3. Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running
- Default connection: `mongodb://localhost:27017/turkish-elite-tourism`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### 4. Seed Database (Optional)
```bash
npm run seed
```
This adds sample tours to your database.

### 5. Start Development Server
```bash
npm run dev
```

This starts both frontend (http://localhost:5173) and backend (http://localhost:5000).

## Verify Installation

1. Open http://localhost:5173 in your browser
2. You should see the Turkish Elite Tourism website
3. Try clicking "Book Now" on a tour
4. Try submitting the contact form

## Common Issues

### Port 5000 already in use
- Change `PORT` in `.env` to another port (e.g., 5001)
- Update `CLIENT_URL` if needed

### MongoDB connection failed
- Check if MongoDB is running: `mongosh` or check MongoDB service
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas: Check IP whitelist and credentials

### CORS errors
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Default should be `http://localhost:5173`

### Frontend not connecting to backend
- Check that backend is running on port 5000
- Check browser console for errors
- Verify `VITE_API_URL` in `.env` (or it defaults to `http://localhost:5000/api`)

## Next Steps

- Customize tours in `server/seed.js` or add via API
- Modify components in `src/app/components/`
- Add authentication if needed
- Deploy to production (Vercel, Netlify, Heroku, etc.)
