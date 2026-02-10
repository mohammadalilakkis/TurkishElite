import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const authenticate = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    console.log('Request path:', req.path);
    
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      console.log('No token found in authorization header');
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log('JWT_SECRET used for verification (first 20 chars):', JWT_SECRET.substring(0, 20));
    console.log('JWT_SECRET length:', JWT_SECRET.length);
    console.log('Token received (first 50 chars):', token.substring(0, 50));
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token decoded successfully, userId:', decoded.userId);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('User not found for userId:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User authenticated:', user.email, 'Role:', user.role);
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error details:', {
      name: error.name,
      message: error.message,
      JWT_SECRET_length: JWT_SECRET.length,
      JWT_SECRET_preview: JWT_SECRET.substring(0, 20)
    });
    if (error.name === 'JsonWebTokenError') {
      console.error('JWT Error - Token might be signed with different secret');
      return res.status(401).json({ 
        message: 'Invalid token. Please log out and log back in.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    res.status(401).json({ 
      message: 'Authentication failed', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
