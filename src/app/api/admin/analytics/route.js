import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Investment } from '@/models';
import { InsuranceClaim } from '@/models/InsuranceFund';
import jwt from 'jsonwebtoken';
import { startOfMonth, subMonths, format } from 'date-fns';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect db
    await connectDB();

    // Only admin allowed – we rely on stats route validation but replicate quickly
    const { User } = await import('@/models');
    const adminUser = await User.findById(decoded.userId).select('role');
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Generate last 6 months labels
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push({
        label: format(date, 'MMM', { locale: undefined }),
        start: startOfMonth(date),
        end: startOfMonth(subMonths(date, -1)),
      });
    }

    // Aggregate investments per month
    const monthlyInvestments = [];
    const monthlyProfits = [];
    for (const m of months) {
      const invs = await Investment.aggregate([
        {
          $match: {
            createdAt: { $gte: m.start, $lt: m.end },
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            profit: { $sum: '$currentProfit' },
          },
        },
      ]);
      monthlyInvestments.push(invs[0]?.count || 0);
      monthlyProfits.push(parseFloat(invs[0]?.profit?.toFixed(2)) || 0);
    }

    // Distribution by type
    const distributionAgg = await Investment.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ]);
    const distribution = {
      BaidCash: distributionAgg.find(d => d._id === 'BaidCash')?.count || 0,
      KtiCash: distributionAgg.find(d => d._id === 'KtiCash')?.count || 0,
    };

    // Latest 3 alerts (InsuranceClaim)
    const alerts = await InsuranceClaim.find({})
      .populate({ path: 'farm', populate: { path: 'farmer', select: 'fullName role' } })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const formattedAlerts = alerts.map((a) => ({
      type: a.claimType,
      userName: a.farm?.farmer?.fullName || '---',
      userRole: a.farm?.farmer?.role || 'farmer',
      date: a.createdAt,
      status: a.status,
    }));

    return NextResponse.json({
      monthly: {
        labels: months.map(m => m.label),
        investments: monthlyInvestments,
        profits: monthlyProfits,
      },
      distribution,
      alerts: formattedAlerts,
    });
  } catch (error) {
    console.error('Admin analytics error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
