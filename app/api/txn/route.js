import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { TransactionSchema } from "@/app/_models/schema";

const Transaction = mongoose.models.Transactions || mongoose.model('Transactions', TransactionSchema);

async function posthandler(req) {
    await connectToDatabase();
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }

    const { user, amount, type, description, date } = body;
    if (!user || !amount || !type || !description || !date) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    try {
        const transaction = new Transaction({ user, amount, type, description, date });
        await transaction.save();
        return NextResponse.json({ message: 'Transaction created successfully', transaction }, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json({ message: 'Error creating transaction' }, { status: 500 });
    }
}

async function gethandler(req) {
    await connectToDatabase();
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const transactions = await Transaction.find({ user: id });
        return NextResponse.json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
}

export {
    posthandler as POST,
    gethandler as GET
};
