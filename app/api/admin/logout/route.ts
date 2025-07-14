import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'admin_session';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: false,
    path: '/',
    expires: new Date(0), // Expira imediatamente
  });
  return response;
} 