import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
    salt: process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });

  console.log('Token:', token);

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('error', 'ranking');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ranking'],
};
