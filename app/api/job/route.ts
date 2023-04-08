import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  
  const data = [
    {id:1, title: "test 1"},
    {id:2, title: "test 2"}
  ]

  return NextResponse.json({ data })
}