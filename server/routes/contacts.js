import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('interest').isIn(['tourist', 'medical', 'both']).withMessage('Valid interest type is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
];

// Create contact inquiry
router.post('/', validateContact, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact(req.body);
    await contact.save();
    
    res.status(201).json({ 
      message: 'Thank you for your inquiry! We will get back to you soon.',
      contact 
    });
  } catch (error) {
    console.error('Contact create error:', error);
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message || 'Failed to save contact' });
  }
});

// Get all contacts (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
