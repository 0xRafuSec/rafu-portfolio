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

// Blocked email addresses - prevent using owner's emails
const BLOCKED_EMAILS = [
  'rafay.arshad1@outlook.com',
  'rafay.arshad1@gmail.com',
  'muhammad.rafayali@outlook.com'
];

// Rate limiting store (in-memory, consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const emailCooldownMap = new Map<string, number>(); // Track last submission time per email
const recentSubmissions = new Map<string, { message: string; timestamp: number }[]>(); // Track recent submissions for duplicate detection

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP
const EMAIL_COOLDOWN = 5 * 60 * 1000; // 5 minutes between submissions from same email
const DUPLICATE_CHECK_WINDOW = 15 * 60 * 1000; // 15 minutes to check for duplicates
const MAX_DUPLICATE_SUBMISSIONS = 2; // Max 2 similar submissions in window

// Common disposable email domains (partial list - expand as needed)
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
  'throwaway.email', 'temp-mail.org', 'getnada.com', 'mohmal.com',
  'fakeinbox.com', 'yopmail.com', 'sharklasers.com', 'grr.la',
  'getairmail.com', 'mintemail.com', 'maildrop.cc', 'meltmail.com'
];

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function checkEmailCooldown(email: string): { allowed: boolean; waitTime?: number } {
  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();
  const lastSubmission = emailCooldownMap.get(normalizedEmail);

  if (!lastSubmission || now - lastSubmission >= EMAIL_COOLDOWN) {
    emailCooldownMap.set(normalizedEmail, now);
    return { allowed: true };
  }

  const waitTime = Math.ceil((EMAIL_COOLDOWN - (now - lastSubmission)) / 1000 / 60); // minutes
  return { allowed: false, waitTime };
}

function checkDuplicateSubmission(email: string, message: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedMessage = message.toLowerCase().trim().replace(/\s+/g, ' '); // Normalize whitespace
  const now = Date.now();

  // Get recent submissions for this email
  const recent = recentSubmissions.get(normalizedEmail) || [];

  // Remove old submissions outside the window
  const validRecent = recent.filter(sub => now - sub.timestamp < DUPLICATE_CHECK_WINDOW);

  // Check for similar messages (simple similarity check - same normalized content)
  const similarCount = validRecent.filter(sub => {
    const normalizedSubMessage = sub.message.toLowerCase().trim().replace(/\s+/g, ' ');
    // Check if messages are very similar (exact match)
    if (normalizedSubMessage === normalizedMessage) return true;
    
    // For longer messages, check if one is contained in the other (with some threshold)
    const longer = normalizedMessage.length > normalizedSubMessage.length ? normalizedMessage : normalizedSubMessage;
    const shorter = normalizedMessage.length > normalizedSubMessage.length ? normalizedSubMessage : normalizedMessage;
    if (longer.includes(shorter) && shorter.length > 50) return true; // Substring match for messages > 50 chars
    
    return false;
  }).length;

  // If we already have too many similar submissions, block this one
  if (similarCount >= MAX_DUPLICATE_SUBMISSIONS) {
    return true; // Block duplicate
  }

  // Add current submission to history
  validRecent.push({ message: normalizedMessage, timestamp: now });
  recentSubmissions.set(normalizedEmail, validRecent);

  return false; // Allow submission
}

function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_EMAIL_DOMAINS.some(disposable => domain.includes(disposable));
}

function validateContent(message: string): { valid: boolean; reason?: string } {
  const normalized = message.toLowerCase();

  // Check for excessive URLs (more than 3)
  const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const urls = message.match(urlPattern) || [];
  if (urls.length > 3) {
    return { valid: false, reason: 'Too many URLs in message (maximum 3 allowed)' };
  }

  // Check for spam patterns (all caps, excessive punctuation)
  const capsRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  if (capsRatio > 0.7 && message.length > 20) {
    return { valid: false, reason: 'Message contains excessive capitalization' };
  }

  // Check for repeated characters (e.g., "aaaaaaa")
  if (/(.)\1{4,}/.test(message)) {
    return { valid: false, reason: 'Message contains suspicious patterns' };
  }

  // Check for excessive punctuation
  const punctuationRatio = (message.match(/[!?.]{2,}/g) || []).length / message.length;
  if (punctuationRatio > 0.1) {
    return { valid: false, reason: 'Message contains excessive punctuation' };
  }

  // Check for common spam keywords (basic check)
  const spamKeywords = ['click here', 'limited time', 'act now', 'urgent', 'winner', 'congratulations'];
  const spamKeywordCount = spamKeywords.filter(keyword => normalized.includes(keyword)).length;
  if (spamKeywordCount >= 3 && urls.length > 0) {
    return { valid: false, reason: 'Message appears to be spam' };
  }

  return { valid: true };
}

function isEmailBlocked(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  return BLOCKED_EMAILS.some(blocked => blocked.toLowerCase() === normalizedEmail);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, website } = body; // website is honeypot field

    // Honeypot check - if website field is filled, it's likely a bot
    if (website && website.trim().length > 0) {
      console.log('Bot detected via honeypot field');
      return NextResponse.json(
        { success: true, message: 'Message sent successfully' }, // Fake success to confuse bots
        { status: 200 }
      );
    }

    // Validate input exists
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate input types and trim
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedMessage = String(message).trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email is blocked
    if (isEmailBlocked(trimmedEmail)) {
      return NextResponse.json(
        { error: 'This email address cannot be used for contact form submissions.' },
        { status: 403 }
      );
    }

    // Check if disposable email
    if (isDisposableEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Disposable email addresses are not allowed.' },
        { status: 403 }
      );
    }

    // Check email cooldown (prevent duplicate submissions from same email)
    const cooldownCheck = checkEmailCooldown(trimmedEmail);
    if (!cooldownCheck.allowed) {
      return NextResponse.json(
        { error: `Please wait ${cooldownCheck.waitTime} minute(s) before submitting again.` },
        { status: 429 }
      );
    }

    // Check for duplicate submissions
    if (checkDuplicateSubmission(trimmedEmail, trimmedMessage)) {
      return NextResponse.json(
        { error: 'Duplicate submission detected. Please wait before submitting a similar message.' },
        { status: 429 }
      );
    }

    // Validate content (spam patterns, URLs, etc.)
    const contentValidation = validateContent(trimmedMessage);
    if (!contentValidation.valid) {
      return NextResponse.json(
        { error: contentValidation.reason || 'Message content validation failed' },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters' },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        { error: 'Email must be less than 254 characters' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Log for debugging (sanitized, no sensitive data in production)
    console.log('Contact Form Submission:', {
      name: trimmedName.substring(0, 20) + (trimmedName.length > 20 ? '...' : ''),
      email: trimmedEmail.substring(0, 20) + '...',
      messageLength: trimmedMessage.length,
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 15) + '...',
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
    
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>');
    
    try {
      const { data, error } = await resend.emails.send({
        from: '0xRafuSec <onboarding@resend.dev>', // Test email - verify your domain in Resend for production
        to: ['rafay.arshad1@gmail.com'],
        replyTo: trimmedEmail, // So you can reply directly to the sender
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

