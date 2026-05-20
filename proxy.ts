import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip Payload CMS routes — Payload handles its own auth
  if (path.startsWith('/cms')) {
    return NextResponse.next();
  }

  // Define routes that require authentication (custom admin only)
  const requireAuth =
    path.startsWith('/admin') &&
    !path.startsWith('/admin/login') &&
    !path.startsWith('/api/auth');

  const token = request.cookies.get('smarter_admin_session')?.value;

  if (requireAuth && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login page while authenticated, redirect to admin dashboard
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match custom /admin routes only — /cms is handled by Payload itself
  matcher: ['/admin/:path*'],
};

