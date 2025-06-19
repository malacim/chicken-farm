import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { default as Farm } from '@/models/Farm';

export async function GET() {
  await connectDB();
  const farms = await Farm.find({});
  return NextResponse.json(farms);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, description, location } = body || {};

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'حقل الاسم مطلوب' }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json({ error: 'حقل الوصف مطلوب' }, { status: 400 });
    }

    if (!location || (typeof location !== 'string' && typeof location !== 'object')) {
      return NextResponse.json({ error: 'حقل الموقع مطلوب' }, { status: 400 });
    }

    const locationObj = typeof location === 'string' ? { city: location } : location;

    const newFarm = await Farm.create({
      name: name.trim(),
      description: description.trim(),
      location: locationObj,
    });

    return NextResponse.json(newFarm, { status: 201 });
  } catch (error: any) {
    console.error('Create farm error', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 });
  }
}