import express from 'express';
import Tour from '../models/Tour.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all tours
router.get('/', async (req, res) => {
  try {
    const { category, isActive } = req.query;
    const query = {};
    
    if (category) {
      // "tourist" section shows both "tourist" and "both" category tours
      if (category === 'tourist') {
        query.category = { $in: ['tourist', 'both'] };
      } else if (category === 'medical') {
        query.category = { $in: ['medical', 'both'] };
      } else {
        query.category = category;
      }
    }
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    } else if (category) {
      // Public requests (with category) only return active tours
      query.isActive = true;
    }
    
    const tours = await Tour.find(query).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create tour (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tour (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete tour (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
