// middleware.ts (letakkan di root project, sejajar dengan app/)
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Kalau sudah login dan akses /login → redirect ke /admin/beranda
    if (req.nextUrl.pathname === '/login' && req.nextauth.token) {
      return NextResponse.redirect(new URL('/admin/beranda', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        // Halaman /admin/* wajib login
        if (pathname.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
