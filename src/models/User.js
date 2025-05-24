import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['visitor', 'investor', 'farmer', 'market_buyer', 'admin'],
    default: 'visitor',
  },
  password: {
    type: String,
    required: true,
  },
  country: String,
  communicationPreferences: {
    whatsapp: Boolean,
    email: Boolean,
    phone: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
    default: null,
  },
  emailVerificationExpires: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
