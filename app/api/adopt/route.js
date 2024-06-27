"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { UserSchema } from '@/app/_models/schema';
import { AdoptSchema } from '@/app/_models/schema';


async function posthandler(req) {
    await connectToDatabase();
    
    let body;
    
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    
    const { parentId, childEmail } = body;

    if (!parentId || !childEmail) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const Adopt = mongoose.models.Adopt || mongoose.model('Adopt', AdoptSchema);
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    try {
        const child = await User.findOne({ email: childEmail });
        if (!child) {
            return NextResponse.json({ message: 'Child not found' }, { status: 400 });
        }
        const childId = child._id;
        if (!await Adopt.findOne({ parentId, childId })) {
            const adoptRequest = new Adopt({ parentId, childId });
            await adoptRequest.save();
            return NextResponse.json({ message: 'Adoption request created successfully' }, { status: 201 });
        }
        else {
            return NextResponse.json({ message: 'Adoption request already exists' }, { status: 400 });
        }
    }
    catch (error) {
        console.error('Error creating adoption request:', error);
        return NextResponse.json({ message: 'Error creating adoption request' }, { status: 500 });
    }
}

async function gethandler(req) {
    await connectToDatabase();
    const Adopt = mongoose.models.Adopt || mongoose.model('Adopt', AdoptSchema);
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const adoptRequests = await Adopt.find({ childId: id });
        return NextResponse.json({ adoptRequests });
    } catch (error) {
        console.error('Error fetching adoption requests:', error);
        return NextResponse.json({ message: 'Error fetching adoption requests' }, { status: 500 });
    }
}

export {
    posthandler as POST,
    gethandler as GET
};