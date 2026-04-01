import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ companies: [] });
}

export async function POST() {
  return NextResponse.json({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  }, { status: 201 });
}
