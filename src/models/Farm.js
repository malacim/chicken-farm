import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    city: String,
    province: String,
    village: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  flockInformation: {
    poultryTypes: [{
      type: String,
      enum: ['laying_hens', 'chicks'],
    }],
    currentPoultryCount: Number,
    availableSections: Number,
    vaccinationStatus: {
      type: String,
      enum: ['up_to_date', 'pending', 'overdue'],
    },
    azollaPlantAvailable: Boolean,
  },
  documents: {
    personalPhotos: [String], // URLs to photos
    idCardImage: String, // URL to ID card image
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  verificationDetails: {
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verificationDate: Date,
    notes: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Farm || mongoose.model('Farm', farmSchema);
