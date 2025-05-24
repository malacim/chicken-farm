import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'not logged in' }, { status: 200 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    await connectDB();

    const user = await User.findById(decoded.userId).select('-password -emailVerificationToken -emailVerificationExpires');

    if (!user) {
      return NextResponse.json({ message: 'not logged in' }, { status: 200 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json({ message: 'not logged in' }, { status: 200 });
  }
}

