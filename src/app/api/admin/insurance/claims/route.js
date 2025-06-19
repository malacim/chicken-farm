import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { InsuranceClaim } from '@/models/InsuranceFund';
import jwt from 'jsonwebtoken';

async function authenticate(request) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
}

async function isAdmin(userId) {
  const { User } = await import('@/models');
  const user = await User.findById(userId).select('role');
  return user && user.role === 'admin';
}

export async function GET(request) {
  const userId = await authenticate(request);
  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const claims = await InsuranceClaim.find({}).populate({ path: 'farm', populate: { path: 'farmer', select: 'fullName role' } }).sort({ createdAt: -1 });
  return NextResponse.json({ claims });
}

export async function PATCH(request) {
  const userId = await authenticate(request);
  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const { claimId, status, approvedAmount } = await request.json();
  const claim = await InsuranceClaim.findById(claimId);
  if (!claim) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  claim.status = status;
  if (approvedAmount !== undefined) claim.approvedAmount = approvedAmount;
  claim.reviewedBy = userId;
  claim.reviewDate = new Date();
  await claim.save();

  return NextResponse.json({ success: true, claim });
}
