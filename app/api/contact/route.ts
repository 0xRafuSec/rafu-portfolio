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
    
    // Escape HTML to prevent XSS
    const escapeHtml = (text: string) => {
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };
    
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
    
    try {
      const { data, error } = await resend.emails.send({
        from: '0xRafuSec <onboarding@resend.dev>', // Test email - verify your domain in Resend for production
        to: ['rafay.arshad1@gmail.com'],
        replyTo: email, // So you can reply directly to the sender
        subject: `[0xRafuSec] New Contact: ${safeName}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Courier New', 'Monaco', monospace; background-color: #0a0a0a; color: #e0e0e0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0f0f0f; border: 1px solid #00ff9d; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0, 255, 157, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 30px; border-bottom: 2px solid #00ff9d;">
              <div style="text-align: center;">
                <div style="color: #00ff9d; font-size: 14px; letter-spacing: 3px; margin-bottom: 10px;">╔════════════════════════════════════╗</div>
                <div style="color: #00ff9d; font-size: 18px; font-weight: bold; margin: 10px 0; text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);">
                  &gt;&gt; NEW CONTACT FORM SUBMISSION &lt;&lt;
                </div>
                <div style="color: #00ff9d; font-size: 14px; letter-spacing: 3px;">╚════════════════════════════════════╝</div>
                <div style="color: #666; font-size: 11px; margin-top: 15px; font-family: monospace;">
                  [0xRafuSec] Portfolio Contact System
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <div style="color: #00ff9d; font-size: 12px; margin-bottom: 20px;">
                <span style="color: #666;">$</span> <span style="color: #00ff9d;">contact_form</span>.<span style="color: #00ff9d;">parse</span>(<span style="color: #ff6b6b;">'submission'</span>)
              </div>
              
              <div style="background-color: #0a0a0a; border-left: 3px solid #00ff9d; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <div style="margin-bottom: 15px;">
                  <span style="color: #666; font-size: 11px;">[NAME]</span>
                  <div style="color: #00ff9d; font-size: 16px; font-weight: bold; margin-top: 5px;">${safeName}</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <span style="color: #666; font-size: 11px;">[EMAIL]</span>
                  <div style="color: #00ff9d; font-size: 14px; margin-top: 5px;">
                    <a href="mailto:${safeEmail}" style="color: #00ff9d; text-decoration: none; border-bottom: 1px dotted #00ff9d;">${safeEmail}</a>
                  </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
                  <span style="color: #666; font-size: 11px;">[MESSAGE]</span>
                  <div style="color: #e0e0e0; font-size: 14px; line-height: 1.6; margin-top: 10px; font-family: 'Courier New', monospace;">${safeMessage}</div>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
                <div style="color: #666; font-size: 11px; margin-bottom: 10px;">
                  <span style="color: #00ff9d;">✓</span> Status: <span style="color: #00ff9d;">DELIVERED</span>
                </div>
                <div style="color: #666; font-size: 11px; margin-bottom: 5px;">
                  <span style="color: #00ff9d;">✓</span> Timestamp: <span style="color: #999;">${new Date().toISOString()}</span>
                </div>
                <div style="color: #666; font-size: 11px;">
                  <span style="color: #00ff9d;">✓</span> Source: <span style="color: #999;">rafucybersec.vercel.app</span>
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 20px; border-top: 1px solid #1a1a1a; text-align: center;">
              <div style="color: #666; font-size: 10px; line-height: 1.6;">
                <div style="margin-bottom: 5px;">
                  <span style="color: #00ff9d;">[0xRafuSec]</span> Cyber Security Engineer
                </div>
                <div style="color: #444; font-size: 9px;">
                  This message was sent from the portfolio contact form.<br>
                  Reply directly to this email to respond to ${safeName}.
                </div>
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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

