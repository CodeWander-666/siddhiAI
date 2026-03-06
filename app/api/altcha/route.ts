import { NextResponse } from 'next/server';
import { createChallenge } from 'altcha-lib';

export async function GET() {
  try {
    const secret = process.env.ALTCHA_SECRET;
    if (!secret) {
      // In development, generate a temporary secret
      if (process.env.NODE_ENV === 'development') {
        const crypto = require('crypto');
        const tempSecret = crypto.randomBytes(32).toString('hex');
        const challenge = await createChallenge({
          hmacKey: tempSecret,
          maxNumber: 100000,
        });
        return NextResponse.json(challenge);
      }
      return NextResponse.json(
        { error: 'ALTCHA_SECRET not configured' },
        { status: 500 }
      );
    }

    const challenge = await createChallenge({
      hmacKey: secret,
      maxNumber: 100000,
    });

    return new NextResponse(JSON.stringify(challenge), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('ALTCHA error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}