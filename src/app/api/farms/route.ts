import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

const FarmSchema = new mongoose.Schema({
  name: String,
  location: String,
}, { timestamps: true });

const Farm = mongoose.models.Farm || mongoose.model('Farm', FarmSchema);

export async function GET() {
  await connectDB();
  const farms = await Farm.find({});
  return NextResponse.json(farms);
}
