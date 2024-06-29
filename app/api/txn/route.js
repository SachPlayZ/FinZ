import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { TransactionSchema, CashBalanceSchema, BankBalanceSchema } from "@/app/_models/schema";
import { verifyToken } from "@/app/_middleware/auth";

const Transaction = mongoose.models.Transactions || mongoose.model('Transactions', TransactionSchema);
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

    const { token, amount, category, mode, type, description, date, tags } = body;
    if (!token || !amount || !category || !mode || !type || !date) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const user = verifyToken(token);
    if (!user) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    try {
        const transaction = new Transaction({ user, amount, category, mode, type, description, date, tags });
        await transaction.save();
        if (type === 'expense') {
            const cashBalance = await CashBalance.findOne({ user });
            const bankBalance = await BankBalance.findOne({ user });
            if (mode === 'cash') {
                cashBalance.balance = Number(cashBalance.balance) - Number(amount);
                await cashBalance.save();
            } else {
                bankBalance.balance = Number(bankBalance.balance) - Number(amount);
                await bankBalance.save();
            }
        }
        else {
            const cashBalance = await CashBalance.findOne({ user });
            const bankBalance = await BankBalance.findOne({ user });
            if (mode === 'cash') {
                cashBalance.balance = Number(cashBalance.balance) + Number(amount);
                await cashBalance.save();
            } else {
                bankBalance.balance = Number(bankBalance.balance) + Number(amount);
                await bankBalance.save();
            }
        }
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
