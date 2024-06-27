// app/api/checkConnection/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Specify your database name if needed

    return NextResponse.json({ message: 'Connected to DB' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Error connecting to DB' }, { status: 500 });
  }
}
