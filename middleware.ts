import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('hublang_token')?.value;

  if (pathname === '/' && token) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  if (pathname === '/' || pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  if (token && token.length > 0) {
    return NextResponse.next();
  }

  const url = new URL('/', request.url);
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/:path*',
    '/drd',
    '/drd/:path*',
    '/penerimaan',
    '/penerimaan/:path*',
  ],
};
