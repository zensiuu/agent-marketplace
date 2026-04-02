import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This is a protected endpoint',
    note: 'Auth0 integration pending - add AUTH0 env variables to enable'
  });
}
