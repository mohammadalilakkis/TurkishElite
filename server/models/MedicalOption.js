import mongoose from 'mongoose';

const medicalOptionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Heart'
  },
  image: {
    type: String,
    default: ''
  },
  features: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('MedicalOption', medicalOptionSchema);
