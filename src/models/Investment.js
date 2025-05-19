import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['BaidCash', 'KtiCash'],
    required: true,
  },
  package: {
    duration: {
      type: Number,
      required: function() {
        return this.type === 'BaidCash';
      },
    },
    agePackage: {
      type: String,
      enum: ['0-day', '7-day', '21-day'],
      required: function() {
        return this.type === 'KtiCash';
      },
    },
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  profitPercentage: {
    type: Number,
    required: true,
  },
  insuranceFee: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending_payment', 'active', 'completed'],
    default: 'pending_payment',
  },
  startDate: Date,
  endDate: Date,
  currentProfit: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Investment || mongoose.model('Investment', investmentSchema);
