import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

  const token = await getToken({
    req,
    // secret: process.env.NEXTAUTH_SECRET as string,
    // cookieName: "__Secure-authjs.session-token",
    secureCookie : true,
  });


  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('error', 'ranking');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ranking', '/blackhole'],
};
