import { getToken, GetTokenParams } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET || ''; // Ensure a fallback value

  // Construct GetTokenParams object with necessary parameters
  const tokenParams: GetTokenParams<false> = {
    req,
    secret,
    salt: 'your_salt_value_here', // Replace with your actual salt value
  };

  const token = await getToken(tokenParams);

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
