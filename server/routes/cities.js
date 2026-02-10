import express from 'express';
import { body, validationResult } from 'express-validator';
import City from '../models/City.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all cities
router.get('/', async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    const cities = await City.find(query).sort({ createdAt: -1 });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single city
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create city (admin only)
router.post('/', authenticate, isAdmin, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update city (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete city (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
