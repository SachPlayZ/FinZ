"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { UserSchema } from '@/app/_models/schema';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

async function posthandler(req) {
    await connectToDatabase();
    
    let body;
    
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    
    const { email, password } = body;
    
    if (!email || !password) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }
    
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    
        const isValid = await compare(password, user.password);
        if (!isValid) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '4320h' });
        

        return NextResponse.json({ message: 'User logged in successfully', token: token }, { status: 200 });
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ message: 'Error logging in user' }, { status: 500 });
    }
    }

export { posthandler as POST };