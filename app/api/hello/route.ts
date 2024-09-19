import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest) {
  const response = { message: 'Hello, World!' };
  return NextResponse.json(response, { status: 200 });
}
