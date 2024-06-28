"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { BudgetSchema } from '@/app/_models/schema';

async function posthandler(req) {
    await connectToDatabase();
    
    let body;
    
    try {
        body = await req.json();
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    
    const { user, category, amount, startDate, endDate } = body;

    if (!user || !category || !amount || !startDate || !endDate) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

    try {
        const budget = new Budget({ user, category, amount, startDate, endDate });
        await budget.save();
        return NextResponse.json({ message: 'Budget created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating budget:', error);
        return NextResponse.json({ message: 'Error creating budget' }, { status: 500 });
    }
}

async function gethandler(req) {
    await connectToDatabase();
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const budgets = await Budget.find({ user: id });
        return NextResponse.json({ budgets });
    } catch (error) {
        console.error('Error fetching budgets:', error);
        return NextResponse.json({ message: 'Error fetching budgets' }, { status: 500 });
    }
}

export {
    posthandler as POST,
    gethandler as GET
};