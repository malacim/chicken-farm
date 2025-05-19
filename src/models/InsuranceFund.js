import mongoose from 'mongoose';

const insuranceFundSchema = new mongoose.Schema({
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contributorType: {
    type: String,
    enum: ['investor', 'farmer', 'platform'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  contributionType: {
    type: String,
    enum: ['initial', 'investment_based', 'profit_based', 'platform_monthly'],
    required: true,
  },
  relatedInvestment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const insuranceClaimSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  claimType: {
    type: String,
    enum: ['disease', 'natural_disaster', 'other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  evidence: {
    photos: [String],
    videos: [String],
    veterinaryCertificate: String,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvedAmount: Number,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const InsuranceFund = mongoose.models.InsuranceFund || mongoose.model('InsuranceFund', insuranceFundSchema);
export const InsuranceClaim = mongoose.models.InsuranceClaim || mongoose.model('InsuranceClaim', insuranceClaimSchema);
