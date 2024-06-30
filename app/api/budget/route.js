"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { BudgetSchema } from '@/app/_models/schema';
import { verifyToken } from '@/app/_middleware/auth';

async function posthandler(req) {
    await connectToDatabase();
    
    let body;
    
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    
    const { token, amount } = body;

    if (!token || !amount) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }
    
    const user = await verifyToken(token);

    const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

    try {
        const budget = await Budget.findOne({ user });
        if (budget) {
            budget.amount = amount;
            await budget.save();
        }
        else {
            await Budget.create({ user, amount });
        }
        return NextResponse.json({ message: 'Budget created/updated successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating budget:', error);
        return NextResponse.json({ message: 'Error creating budget' }, { status: 500 });
    }
}

async function gethandler(req) {
    await connectToDatabase();
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const id = await verifyToken(token);
        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
        const budget = await Budget.find({ user: id });
        console.log(budget);
        return NextResponse.json({ budget });
    } catch (error) {
        console.error('Error fetching budgets:', error);
        return NextResponse.json({ message: 'Error fetching budgets' }, { status: 500 });
    }
}

export {
    posthandler as POST,
    gethandler as GET
};