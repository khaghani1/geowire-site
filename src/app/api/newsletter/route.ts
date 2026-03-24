import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    // TODO: Connect to Supabase
    console.log('Newsletter signup:', email);
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
