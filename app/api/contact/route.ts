import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Vercel + Resend Integration (Recommended for Vercel)
// Resend has native Vercel integration and free tier: 3,000 emails/month
// 
// Setup:
// 1. Sign up at https://resend.com/
// 2. Get API key from dashboard
// 3. Add to Vercel: Settings → Environment Variables → RESEND_API_KEY
// 4. Install: npm install resend (already installed)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Log for debugging (remove in production)
    console.log('Contact Form Submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Resend Integration (Best for Vercel)
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set in environment variables');
      // In development, just log the message
      if (process.env.NODE_ENV === 'development') {
        console.log('Would send email:', { name, email, message });
        return NextResponse.json(
          { success: true, message: 'Message logged (RESEND_API_KEY not set)' },
          { status: 200 }
        );
      }
      throw new Error('Email service not configured');
    }

    const resend = new Resend(resendApiKey);
    
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Change to your verified domain
      to: ['rafay.arshad1@outlook.com'],
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your portfolio contact form</small></p>
      `,
    });
    
    if (error) {
      console.error('Resend error:', error);
      throw error;
    }


    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

