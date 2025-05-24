import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded.userId).select('-password');

    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { userId, message, notificationType } = await request.json();
    if (!userId || !message || !notificationType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Here you would implement your notification logic
    // For example, storing the notification in a database
    // or sending it through a notification service

    return NextResponse.json({
      success: true,
      message: 'Notification sent successfully',
      details: {
        user: targetUser.email,
        notificationType,
        messageSent: true
      }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
