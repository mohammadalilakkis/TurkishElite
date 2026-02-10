import express from 'express';
import { body, validationResult } from 'express-validator';
import MedicalOption from '../models/MedicalOption.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all medical options
router.get('/', async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    const options = await MedicalOption.find(query).sort({ createdAt: -1 });
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single medical option
router.get('/:id', async (req, res) => {
  try {
    const option = await MedicalOption.findById(req.params.id);
    if (!option) {
      return res.status(404).json({ message: 'Medical option not found' });
    }
    res.json(option);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create medical option (admin only)
router.post('/', authenticate, isAdmin, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const option = new MedicalOption(req.body);
    await option.save();
    res.status(201).json(option);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update medical option (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const option = await MedicalOption.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!option) {
      return res.status(404).json({ message: 'Medical option not found' });
    }
    res.json(option);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete medical option (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const option = await MedicalOption.findByIdAndDelete(req.params.id);
    if (!option) {
      return res.status(404).json({ message: 'Medical option not found' });
    }
    res.json({ message: 'Medical option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
