import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await sendEmail(body);
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
