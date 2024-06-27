"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { UserSchema } from '@/app/_models/schema';
import { TransferSchema, CashBalanceSchema, BankBalanceSchema } from '@/app/_models/schema';

const CashBalance = mongoose.models.CashBalance || mongoose.model('CashBalance', CashBalanceSchema);
const BankBalance = mongoose.models.BankBalance || mongoose.model('BankBalance', BankBalanceSchema);


async function posthandler(req) {
    await connectToDatabase();
    
    let body;
    
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    
    const { user, from, to, amount, date, description, tags } = body;

    if (!user || !from || !to || !amount || !date) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const Transfer = mongoose.models.Transfer || mongoose.model('Transfer', TransferSchema);

    try {
        const transfer = new Transfer({ user, from, to, amount, date, description, tags});
        await transfer.save();
        const CashBalance = await CashBalance.findOne({ user: user });
        const BankBalance = await BankBalance.findOne({ user: user });
        if (from === 'cash') {
            CashBalance.balance = CashBalance.balance - amount;
            BankBalance.balance = BankBalance.balance + amount;
        } else {
            BankBalance.balance = BankBalance.balance - amount;
            CashBalance.balance = CashBalance.balance + amount;
        }
        await BankBalance.save();
        await CashBalance.save();
        return NextResponse.json({ message: 'Transfer created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating transfer:', error);
        return NextResponse.json({ message: 'Error creating transfer' }, { status: 500 });
    }
}

async function gethandler(req) {
    await connectToDatabase();
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const transfers = await Transfer.find({ user: id });
        return NextResponse.json({ transfers });
    } catch (error) {
        console.error('Error fetching transfers:', error);
        return NextResponse.json({ message: 'Error fetching transfers' }, { status: 500 });
    }
}

export {
    posthandler as POST,
    gethandler as GET
};
