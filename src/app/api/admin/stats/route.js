import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User, Investment, InsuranceFund } from '@/models';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect db
    await connectDB();

    // Ensure admin
    const adminUser = await User.findById(decoded.userId).select('role');
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Aggregate stats
    const [totalInvestors, activeInvestors, activeFarmers, activeInvestments, completedInvestments] = await Promise.all([
      User.countDocuments({ role: 'investor' }),
      User.countDocuments({ role: 'investor', isActive: true }),
      User.countDocuments({ role: 'farmer', isActive: true }),
      Investment.countDocuments({ status: 'active' }),
      Investment.countDocuments({ status: 'completed' }),
    ]);

    // Insurance fund total
    const insuranceAgg = await InsuranceFund.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const insuranceFund = insuranceAgg[0]?.total || 0;

    // Emergency alerts (pending claims) - count InsuranceClaim pending
    const { InsuranceClaim } = await import('@/models/InsuranceFund');
    const emergencyAlerts = await InsuranceClaim.countDocuments({ status: 'pending' });

    return NextResponse.json({
      totalInvestors,
      activeInvestors,
      activeFarmers,
      activeInvestments,
      completedInvestments,
      insuranceFund,
      emergencyAlerts,
    });
  } catch (error) {
    console.error('Admin stats error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
