import { NextRequest, NextResponse } from 'next/server';

const TOKEN_COOKIE = 'wings_token';

/**
 * Route guard (US-1 / US-3 acceptance criteria):
 * - unauthenticated users hitting /dashboard are sent to /login
 * - authenticated users hitting /login are sent to /dashboard
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
