import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  
  const data = { title: params.id, "description": 3}

  return NextResponse.json({ data })
}