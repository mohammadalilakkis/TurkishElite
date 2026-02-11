# Quick Start – Fix common errors

## Seed fails with "querySrv ENODATA"

This means DNS can't resolve MongoDB Atlas. Fix:

1. **Use the standard connection string** (not SRV):
   - Atlas → Connect → Drivers → Choose "Drivers" → Copy the **standard** (not SRV) connection string
   - Replace `MONGODB_URI` in `.env` with that string

2. **Or use local MongoDB**: `MONGODB_URI=mongodb://localhost:27017/turkish-elite-tourism`

---

## 1. Whitelist your IP in MongoDB Atlas

If you use MongoDB Atlas, your IP must be allowed:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Your project → **Network Access** → **Add IP Address**
3. For development: add `0.0.0.0/0` (allow all) or add your current IP

## 2. Free port 5000 (if it's in use)

In a terminal:

```powershell
netstat -ano | findstr :5000
```

If a process is using port 5000, note the PID and stop it:

```powershell
taskkill /PID <PID> /F
```

## 3. Start the app

```bash
npm run dev
```

This starts both frontend and backend. Then open: http://localhost:5173

**Or separately:**
- Terminal 1: `npm run dev:server` (backend on port 5000)
- Terminal 2: `npm run dev:client` (frontend on port 5173)

## 4. Verify backend

Open: http://localhost:5000/api/health

You should see: `{"status":"OK","message":"Server is running"}`
