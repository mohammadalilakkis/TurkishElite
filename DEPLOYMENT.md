# Free hosting guide

Your app is **Vite/React frontend** + **Node/Express API** + **MongoDB**. You can host it in two places: one app host + database.

---

## Recommended: one app host (2 services total)

| Part   | Service          | Role                                  |
|--------|------------------|----------------------------------------|
| **App** | **Render** (free) | Serves both frontend and API from one URL |
| **DB**  | **MongoDB Atlas** | Database (you already use this)        |

The server is set up so that in production it serves the built React app from the same process. One URL, one deployment.

### 1. MongoDB Atlas

- Use your existing free cluster.
- **Network Access** → Add IP → `0.0.0.0/0` so Render can connect.
- Copy your connection string.

### 2. Render (frontend + backend together)

1. Push code to **GitHub**.
2. [render.com](https://render.com) → **New** → **Web Service** → connect the repo.
3. Settings:
   - **Build command:** `npm install && npm run build`
   - **Start command:** `node server/index.js`
   - **Instance type:** Free
4. **Environment variables:**
   - `MONGODB_URI` = your Atlas connection string
   - `NODE_ENV` = `production`
   - `VITE_API_URL` = `/api` (so the frontend calls the same host; set this so it’s available at build time)
   - `PORT` = leave blank (Render sets it)
5. Deploy. Your app and API will be at the same URL, e.g. `https://your-app.onrender.com`.

No need for `CLIENT_URL` when frontend and backend are on the same origin.

---

## Why not 3 sites?

You don’t have to. The “3 sites” setup (Vercel + Render + Atlas) was:

- **Vercel** = frontend only  
- **Render** = backend only  
- **Atlas** = database  

That split is useful if you want the frontend on a CDN and the API elsewhere. For a single full‑stack app, **one app host + Atlas** is simpler: one deployment, one URL, same free tier.

**Note:** On Render’s free tier the app sleeps after ~15 minutes of no traffic; the first request after that can take 30–60 seconds.
