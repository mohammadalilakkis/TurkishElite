
# Turkish Elite Tourism - Full Stack Website

A modern, full-stack tourism website for Turkish Elite Tourism featuring tourist tours, medical tourism, and booking capabilities.

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design built with React and Tailwind CSS
- 🚀 **Full Stack** - Express.js backend with MongoDB database
- 📅 **Booking System** - Complete tour booking functionality
- 📧 **Contact Forms** - Integrated contact form with backend processing
- 🏥 **Medical Tourism** - Dedicated section for medical tourism services
- 🌍 **Tour Management** - Dynamic tour listings with API integration

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Axios for API calls
- Sonner for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- CORS enabled

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd tourist
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/turkish-elite-tourism
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   # On Windows (if MongoDB is installed as a service, it should start automatically)
   # On macOS/Linux:
   mongod
   ```
   
   Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```
   This will populate the database with sample tours.

## Running the Application

### Development Mode (Frontend + Backend)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Run Separately

**Frontend only:**
```bash
npm run dev:client
```

**Backend only:**
```bash
npm run dev:server
```

### Production Build

Build the frontend:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## API Endpoints

### Tours
- `GET /api/tours` - Get all tours (optional query: `?category=tourist`)
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (admin)
- `PUT /api/tours/:id` - Update tour (admin)
- `DELETE /api/tours/:id` - Delete tour (admin)

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get single booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id/status` - Update contact status

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
tourist/
├── server/                 # Backend code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js          # Server entry point
│   └── seed.js           # Database seeder
├── src/                   # Frontend code
│   ├── app/
│   │   ├── components/   # React components
│   │   └── App.tsx       # Main app component
│   ├── services/         # API service layer
│   └── styles/           # CSS files
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/turkish-elite-tourism

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
```

## Usage

1. **Viewing Tours**: Browse available tours on the homepage
2. **Booking a Tour**: Click "Book Now" on any tour card to open the booking dialog
3. **Contact Form**: Fill out the contact form at the bottom of the page
4. **Medical Tourism**: Explore medical tourism services in the dedicated section

## Development

### Adding New Tours

You can add tours through:
1. **API**: `POST /api/tours` with tour data
2. **Database**: Direct MongoDB insertion
3. **Seed Script**: Add to `server/seed.js` and run `npm run seed`

### Customization

- **Styling**: Modify Tailwind classes in component files
- **Components**: All UI components are in `src/app/components/ui/`
- **API**: Backend routes are in `server/routes/`
- **Database Models**: Schema definitions in `server/models/`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB port (default: 27017)

### CORS Errors
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Check backend CORS configuration in `server/index.js`

### Port Already in Use
- Change `PORT` in `.env` to a different port
- Or stop the process using the port

## License

This project is private and proprietary.

## Original Design

Original Figma design: https://www.figma.com/design/V5G4V5wJLYcM2NeaizEKl4/Luxury-Tourist-Company-Website
  