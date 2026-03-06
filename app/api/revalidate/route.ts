import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('x-revalidate-token');
    if (token !== process.env.REVALIDATE_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { tags } = await req.json();
    if (!Array.isArray(tags)) return NextResponse.json({ error: 'Invalid tags' }, { status: 400 });

    tags.forEach(tag => revalidateTag(tag));
    return NextResponse.json({ revalidated: true, tags });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}