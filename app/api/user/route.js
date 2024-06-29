import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import { verifyToken } from '@/app/_middleware/auth';
import { User } from '@/app/_models/schema';

async function postHandler(req) {
    await connectToDatabase();
    const token = req.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = await verifyToken(token);
    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user._id,
            name: user.name,
            email: user.email,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export { postHandler as POST };
