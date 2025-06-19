import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'اسم المزرعة مطلوب'],
    minlength: [1, 'اسم المزرعة لا يمكن أن يكون فارغًا'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'الوصف مطلوب'],
    minlength: [1, 'الوصف لا يمكن أن يكون فارغًا'],
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    personalPhotos: [String],
    idCardImage: String,
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
