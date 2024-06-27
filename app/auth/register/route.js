// app/auth/register/route.js
"use server"

import { NextResponse } from 'next/server';
import connectToDatabase from '../../_middleware/mongodb';
import mongoose from 'mongoose';
import { UserSchema, BankBalanceSchema, CashBalanceSchema } from '@/app/_models/schema';
import { hash } from 'bcryptjs';

async function posthandler(req) {
  await connectToDatabase();

  let body;

  try {
    body = await req.json();
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  const hashedPassword = await hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const user = new User({ name: username, email, password: hashedPassword });
    await user.save();
    const CashBalance = mongoose.models.CashBalance || mongoose.model('CashBalance', CashBalanceSchema);
    const BankBalance = mongoose.models.BankBalance || mongoose.model('BankBalance', BankBalanceSchema);
    const cashBalance = new CashBalance({ user: user._id, balance: 0 });
    const bankBalance = new BankBalance({ user: user._id, balance: 0 });
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}

// async function gethandler(req) {
//   connectToDatabase();
//   const User = mongoose.models.User || mongoose.model('User', UserSchema);
//   const users = await User.find();
//   return NextResponse.json(users);
// }

export { posthandler as POST};
