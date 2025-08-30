import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ status: 'ok' });
  res.cookies.set('hublang_token', '', {
    path: '/',
    httpOnly: true,
    maxAge: 0,
  });
  return res;
}
