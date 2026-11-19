import { NextRequest, NextResponse } from 'next/server';
import { getAllEmailsFromDatabase } from '@/lib/emailDatabase';

// API to get subscriber stats. Protected: send header `x-admin-key: <ADMIN_API_KEY>`.
export async function GET(request: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || request.headers.get('x-admin-key') !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const emails = await getAllEmailsFromDatabase();

    return NextResponse.json({
      total: emails.length,
      emails: emails,
    });
  } catch (error) {
    console.error('Error getting subscriber stats:', error);
    return NextResponse.json(
      { error: 'Failed to get subscriber stats' },
      { status: 500 }
    );
  }
}
