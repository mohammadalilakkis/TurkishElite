# MongoDB Setup Guide

## Error: `connect ECONNREFUSED ::1:27017`

This means MongoDB is not running on your computer. You have two options:

## Option 1: Use MongoDB Atlas (Cloud - Recommended for Beginners)

MongoDB Atlas is free and doesn't require local installation.

### Steps:

1. **Create Free Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or your choice)
   - Password: Create a strong password (save it!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist Your IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env File:**
   - Open `.env` file
   - Replace `MONGODB_URI` with your connection string
   - Replace `<username>` and `<password>` with your actual credentials
   - Example:
     ```
     MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/turkish-elite-tourism?retryWrites=true&w=majority
     ```

7. **Try Again:**
   ```bash
   npm run seed:admin
   ```

## Option 2: Install MongoDB Locally

### Windows Installation:

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows version
   - Download MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install as Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional)

3. **Start MongoDB Service:**
   - Open Services (Win+R → `services.msc`)
   - Find "MongoDB" service
   - Right-click → Start (if not running)
   - Set Startup Type to "Automatic"

4. **Verify Installation:**
   ```bash
   mongod --version
   ```

5. **Test Connection:**
   ```bash
   mongosh
   ```
   If this works, MongoDB is running!

6. **Try Seed Again:**
   ```bash
   npm run seed:admin
   ```

## Option 3: Use Docker (If You Have Docker)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then try:
```bash
npm run seed:admin
```

## Quick Test

After setting up MongoDB (any option), test the connection:

```bash
# Test if MongoDB is accessible
mongosh
# Or if using Atlas, test connection string works
```

Then run:
```bash
npm run seed:admin
```

## Troubleshooting

### If MongoDB Atlas connection fails:
- Check username/password are correct
- Verify IP is whitelisted
- Make sure connection string includes database name: `turkish-elite-tourism`

### If Local MongoDB fails:
- Check if service is running: `services.msc`
- Try starting manually: `net start MongoDB`
- Check if port 27017 is available
- Verify installation path

### Connection String Format:

**Local:**
```
mongodb://localhost:27017/turkish-elite-tourism
```

**Atlas:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/turkish-elite-tourism?retryWrites=true&w=majority
```

## Recommended: Use MongoDB Atlas

For development, MongoDB Atlas is easier:
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works immediately
- ✅ Accessible from anywhere
- ✅ No local service management
