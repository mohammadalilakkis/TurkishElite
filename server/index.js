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

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/turkish-elite-tourism')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

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
    const [
      totalBookings,
      totalContacts,
      totalTours,
      pendingBookings,
      newContacts,
      recentBookings,
      recentContacts
    ] = await Promise.all([
      Booking.countDocuments(),
      Contact.countDocuments(),
      Tour.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Contact.countDocuments({ status: 'new' }),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate('tourId'),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate revenue (sum of all confirmed bookings)
    const confirmedBookings = await Booking.find({ status: 'confirmed' });
    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

    // Bookings by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      overview: {
        totalBookings,
        totalContacts,
        totalTours,
        pendingBookings,
        newContacts,
        totalRevenue
      },
      bookingsByStatus,
      recentBookings,
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
