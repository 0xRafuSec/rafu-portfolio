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
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>', // Test email - verify your domain in Resend for production
        to: ['rafay.arshad1@outlook.com'],
        replyTo: email, // So you can reply directly to the sender
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
        console.error('Resend API error:', JSON.stringify(error, null, 2));
        return NextResponse.json(
          { 
            error: 'Failed to send message', 
            details: error.message || 'Unknown Resend error',
            errorCode: error.name 
          },
          { status: 500 }
        );
      }

      console.log('Email sent successfully:', data);
    } catch (resendError: any) {
      console.error('Resend exception:', resendError);
      return NextResponse.json(
        { 
          error: 'Failed to send message', 
          details: resendError?.message || 'Resend service error',
          errorType: resendError?.name || 'UnknownError'
        },
        { status: 500 }
      );
    }


    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        details: error?.message || 'Unknown error occurred',
        errorType: error?.name || 'Error'
      },
      { status: 500 }
    );
  }
}

