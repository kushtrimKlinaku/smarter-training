import { NextResponse } from 'next/server';
import { checkCredentials, setAuthCookie, clearAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const isValid = await checkCredentials(username, password);

    if (isValid) {
      await setAuthCookie();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Kredenciale të pasakta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gabim në server' }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ success: true });
}
