import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { MarketProduct, Order } from '@/models/MarketProduct';
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
  const [available, soldOut, hidden] = await Promise.all([
    MarketProduct.countDocuments({ status: 'available' }),
    MarketProduct.countDocuments({ status: 'sold_out' }),
    MarketProduct.countDocuments({ status: 'hidden' }),
  ]);
  const [pendingOrders, confirmedOrders, shippedOrders] = await Promise.all([
    Order.countDocuments({ status: 'pending' }),
    Order.countDocuments({ status: 'confirmed' }),
    Order.countDocuments({ status: 'shipped' }),
  ]);
  const recentOrders = await Order.find({}).populate('buyer', 'fullName').populate('product', 'name').sort({ createdAt: -1 }).limit(5).lean();
  return NextResponse.json({
    products: { available, soldOut, hidden },
    orders: { pendingOrders, confirmedOrders, shippedOrders, recentOrders },
  });
}
