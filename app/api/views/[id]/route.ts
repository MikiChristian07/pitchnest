import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write-client';

interface Params {
  params: { id: string };
}

export async function POST(req: Request, { params }: Params): Promise<NextResponse> {
  const { id } = params;

  try {
    await writeClient.patch(id)
    .inc({ views: 1 })
    .commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
