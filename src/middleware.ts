import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth0 } from './app/api/auth/[auth0]/route';

export async function middleware(request: NextRequest) {
  // Let Auth0 handle the auth routes
  const authResponse = await auth0.middleware(request);
  
  // Don't interfere with auth routes
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authResponse;
  }
  
  return authResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
