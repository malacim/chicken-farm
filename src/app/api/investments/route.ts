import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple Investment schema for demonstration
const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, required: true },
  amount: Number,
  type: String,
  status: String,
}, { timestamps: true });

const Investment = mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);

export async function GET(req: NextRequest) {
  await connectDB();
  // For demo, fetch all investments; in production, filter by user
  const investments = await Investment.find({});
  return NextResponse.json(investments);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const investment = new Investment(data);
  await investment.save();
  return NextResponse.json({ success: true, investment });
}
