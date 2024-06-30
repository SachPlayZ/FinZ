"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { TransactionSchema } from '@/app/_models/schema';
import { verifyToken } from '@/app/_middleware/auth';

async function posthandler(req) {
    await connectToDatabase();
    const token = req.headers.get('Authorization');
    
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = await verifyToken(token);
    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
    const transactions = await Transaction.find({ user: id }).exec();

    if (!transactions) {
        return NextResponse.json({ message: 'No transactions found' }, { status: 404 });
    }
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return NextResponse.json(sortedTransactions, { status: 200 });
}

async function gethandler(req) {
    await connectToDatabase();
    const token = req.headers.get('Authorization');
    
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = await verifyToken(token);
    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
    const transactions = await Transaction.find({ user: id }).exec();

    if (!transactions) {
        return NextResponse.json({ message: 'No transactions found' }, { status: 404 });
    }
    const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return NextResponse.json(sortedTransactions, { status: 200 });
}

export { posthandler as POST, gethandler as GET };
