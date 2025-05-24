import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

// Define a Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // 'dozen', 'chick', 'hen', etc.
  available: { type: Number, required: true, default: 0 },
  image: { type: String, default: '' },
}, { timestamps: true });

// Virtual for farm details
ProductSchema.virtual('farm', {
  ref: 'Farm',
  localField: 'farmId',
  foreignField: '_id',
  justOne: true
});

// Set virtuals to be included in JSON output
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function GET() {
  await connectDB();

  try {
    // For demo, we'll populate with mock data if no products exist
    let products = await Product.find({}).populate('farm', 'name location');

    if (products.length === 0) {
      // If no products exist, create some mock products
      const Farm = mongoose.models.Farm;

      if (Farm) {
        const farms = await Farm.find({});

        if (farms.length > 0) {
          const mockProducts = [
            {
              name: 'بيض طازج',
              farmId: farms[0]._id,
              price: 50,
              unit: 'dozen',
              available: 120,
              image: '🥚'
            },
            {
              name: 'كتاكيت صغيرة',
              farmId: farms.length > 1 ? farms[1]._id : farms[0]._id,
              price: 25,
              unit: 'chick',
              available: 200,
              image: '🐣'
            },
            {
              name: 'دجاج بياض',
              farmId: farms.length > 2 ? farms[2]._id : farms[0]._id,
              price: 150,
              unit: 'hen',
              available: 45,
              image: '🐔'
            }
          ];

          await Product.insertMany(mockProducts);
          products = await Product.find({}).populate('farm', 'name location');
        }
      }

      // If we still have no products or no farms, return mock data directly
      if (products.length === 0) {
        return NextResponse.json([
          {
            id: 1,
            name: 'بيض طازج',
            farm: { name: 'Green Valley Farm' },
            price: 50,
            unit: 'dozen',
            available: 120,
            image: '🥚'
          },
          {
            id: 2,
            name: 'كتاكيت صغيرة',
            farm: { name: 'Sunny Acres' },
            price: 25,
            unit: 'chick',
            available: 200,
            image: '🐣'
          },
          {
            id: 3,
            name: 'دجاج بياض',
            farm: { name: 'Mountain View Farm' },
            price: 150,
            unit: 'hen',
            available: 45,
            image: '🐔'
          }
        ]);
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();
    const product = new Product(data);
    await product.save();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
