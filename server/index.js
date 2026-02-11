import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tourRoutes from './routes/tours.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contacts.js';
import authRoutes from './routes/auth.js';
import cityRoutes from './routes/cities.js';
import medicalOptionRoutes from './routes/medicalOptions.js';
import { authenticate, isAdmin } from './middleware/auth.js';
import Booking from './models/Booking.js';
import Contact from './models/Contact.js';
import Tour from './models/Tour.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/medical-options', medicalOptionRoutes);

// Analytics route (admin only)
app.get('/api/analytics', authenticate, isAdmin, async (req, res) => {
  try {
    // Ensure MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not ready. Please try again.' });
    }

    const [
      totalBookings,
      totalContacts,
      totalTours,
      pendingBookings,
      newContacts,
      recentBookings,
      recentContacts
    ] = await Promise.all([
      Booking.countDocuments().catch(() => 0),
      Contact.countDocuments().catch(() => 0),
      Tour.countDocuments().catch(() => 0),
      Booking.countDocuments({ status: 'pending' }).catch(() => 0),
      Contact.countDocuments({ status: 'new' }).catch(() => 0),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate('tourId').lean().catch(() => []),
      Contact.find().sort({ createdAt: -1 }).limit(5).lean().catch(() => [])
    ]);

    // Calculate revenue (sum of all confirmed bookings)
    const confirmedBookings = await Booking.find({ status: 'confirmed' }).lean().catch(() => []);
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]).catch(() => []);

    res.json({
      overview: {
        totalBookings: totalBookings ?? 0,
        totalContacts: totalContacts ?? 0,
        totalTours: totalTours ?? 0,
        pendingBookings: pendingBookings ?? 0,
        newContacts: newContacts ?? 0,
        totalRevenue
      },
      bookingsByStatus,
      recentBookings: recentBookings ?? [],
      recentContacts: recentContacts ?? []
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: error.message || 'Failed to load analytics' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Start server after MongoDB connects
async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/turkish-elite-tourism');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    if (error.message?.includes('whitelist')) {
      console.error('   → Add your IP at: https://cloud.mongodb.com → Network Access → Add IP (or use 0.0.0.0/0 for dev)');
    }
    console.error('   Server will start but API routes may fail.');
  }
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Kill the process or use a different PORT in .env`);
      process.exit(1);
    }
    throw err;
  });
}
start();
