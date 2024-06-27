import { NextResponse } from "next/server";

async function gethandler(req) {
    const url = new URL(req.url);
    
    console.log('Query:', url.searchParams.get('hello'));
    return NextResponse.json({ message: 'Hello from the test route', query: req.query});
}

export {
    gethandler as GET
};