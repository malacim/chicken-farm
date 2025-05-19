import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { TokenBlacklist } from '@/models';

export async function POST(request: Request) {
  try {
    await connectDB();

    // Get the token from the request
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Add the token to the blacklist
    await TokenBlacklist.create({ token });

    // Create response with success message
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
    
    // Clear the HTTP-only cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/', 
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
