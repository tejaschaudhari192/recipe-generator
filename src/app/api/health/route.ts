// app/api/health/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(): Promise<Response> {
  try {
    await prisma.$queryRawUnsafe('SELECT 1');
    return NextResponse.json({ connected: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database connection failed:', error.message);

      return NextResponse.json(
        { connected: false, error: error.message },
        { status: 500 }
      );
    }

    console.error('Unknown error during DB check:', error);

    return NextResponse.json(
      { connected: false, error: 'Unknown error occurred' },
      { status: 500 }
    );
  }
}
