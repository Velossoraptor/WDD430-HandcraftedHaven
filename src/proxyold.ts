import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Protect seller routes
  if (request.nextUrl.pathname.startsWith('/seller')) {
    if (!token || token.role !== 'seller') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect customer-specific routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token || token.role !== 'customer') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/seller/:path*', '/dashboard/:path*'],
};