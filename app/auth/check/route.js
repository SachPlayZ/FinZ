"use server";

import { verifyToken } from "@/app/_middleware/auth";
import { NextResponse } from 'next/server';

const check = async (req) => {
  try {
    let body = await req.json();
    const token = body.token;
    console.log("Token:", token);

    const userId = verifyToken(token);
    console.log("User ID:", userId);

    return NextResponse.json({ message: 'Token verified' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Token not verified', error: error.message }, { status: 403 });
  }
};

export { check as POST };
