import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Setting } from '@/models/Setting';
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
  const settingsArr = await Setting.find({});
  const settings = {};
  settingsArr.forEach((s) => { settings[s.key] = s.value; });
  return NextResponse.json({ settings });
}

export async function POST(request) {
  const userId = await authenticate(request);
  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const body = await request.json(); // { key, value }
  const { key, value } = body;
  let setting = await Setting.findOne({ key });
  if (setting) {
    setting.value = value;
    await setting.save();
  } else {
    await Setting.create({ key, value });
  }
  return NextResponse.json({ success: true });
}
