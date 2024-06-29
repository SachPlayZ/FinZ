import { BankBalanceSchema, CashBalanceSchema, UserSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "../../_middleware/mongodb";
import { verifyToken } from "@/app/_middleware/auth";
import mongoose from "mongoose";

async function posthandler(req) {
    await connectToDatabase();
    const token = req.headers.get('Authorization');
    console.log('token', token)
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = await verifyToken(token);
    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const CashBalance = mongoose.models.CashBalance || mongoose.model('CashBalance', CashBalanceSchema);
    const BankBalance = mongoose.models.BankBalance || mongoose.model('BankBalance', BankBalanceSchema);
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const cashBalance = await CashBalance.findOne({ user: id });
    const bankBalance = await BankBalance.findOne({ user: id });
    const user = await User.findById(id);

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const cb = cashBalance.balance;
    const bb = bankBalance.balance;
    const username = user.name;

    return NextResponse.json({ cBalance: cb, bBalance: bb, name: username }, { status: 200 });
}

export { posthandler as POST };
