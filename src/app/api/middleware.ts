import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const protectedPaths = [
    '/api/agents',
    '/api/companies',
    '/api/marketplace/purchase',
  ];

  const pathname = new URL(request.url).pathname;
  
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));
  
  if (isProtected) {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/agents/:path*',
    '/api/companies/:path*',
    '/api/marketplace/purchase/:path*',
  ],
};
