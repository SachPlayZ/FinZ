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
    const transactions = await Transaction.find({ user: id, type: 'income' }).exec();
    if (!transactions) {
        return NextResponse.json({ message: 'No transactions found' }, { status: 404 });
    }
    const incomeByCategory = transactions.reduce((acc, txn) => {
      if (!acc[txn.category]) {
        acc[txn.category] = 0;
      }
      acc[txn.category] += txn.amount;
      return acc;
    }, {});

    const formattedResults = Object.entries(incomeByCategory).map(([category, total]) => ({
      category,
      total: total.toFixed(2) 
    }));

    formattedResults.sort((a, b) => b.total - a.total);
    return NextResponse.json(formattedResults, { status: 200 });
}

export { posthandler as POST };