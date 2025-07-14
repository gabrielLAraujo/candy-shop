import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'admin_session';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  
  // Remove o cookie de sessão
  response.cookies.set(SESSION_COOKIE, '', {
    expires: new Date(0),
    path: '/',
  });
  
  return response;
} 