"use server"

import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/_middleware/auth';

async function posthandler(req) {
    const token = req.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const user = await verifyToken(token);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Authorized', token: user }, { status: 200 });
}

export { posthandler as POST };