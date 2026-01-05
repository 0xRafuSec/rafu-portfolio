import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Have I Been Pwned (HIBP) Pwned Passwords API
// Free tier: https://api.pwnedpasswords.com/range/{prefix} (no API key needed)
// Paid tier: Higher rate limits with API key (optional)
// Get API key: https://haveibeenpwned.com/API/Key (subscription-based)
//
// Setup (optional for higher rate limits):
// 1. Visit https://haveibeenpwned.com/API/Key
// 2. Purchase subscription for API key (optional - free tier works fine)
// 3. Add to .env: HIBP_API_KEY=your_api_key_here

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Hash password with SHA-1 (HIBP uses SHA-1)
    const sha1Hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    
    // Split hash: first 5 chars (prefix) and rest (suffix)
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);

    try {
      // Build request URL
      const apiUrl = `https://api.pwnedpasswords.com/range/${prefix}`;
      
      // Optional: Add API key header if available (for paid tier)
      const headers: HeadersInit = {
        'User-Agent': 'rafu-portfolio-password-checker',
      };
      
      const apiKey = process.env.HIBP_API_KEY;
      if (apiKey) {
        headers['hibp-api-key'] = apiKey;
      }

      // Fetch from HIBP (k-anonymity model - only sends first 5 chars of hash)
      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        // If rate limited or error, return unknown status
        if (response.status === 429) {
          return NextResponse.json(
            { breached: false, count: 0, error: 'Rate limited. Please try again later.' },
            { status: 429 }
          );
        }
        throw new Error(`HIBP API error: ${response.status}`);
      }

      const data = await response.text();
      
      // Parse response: each line is "SUFFIX:COUNT"
      const hashes = data.split('\n');
      
      // Check if our hash suffix is in the results
      for (const line of hashes) {
        const [hashSuffix, countStr] = line.split(':');
        if (hashSuffix === suffix) {
          const count = parseInt(countStr.trim(), 10);
          return NextResponse.json({
            breached: true,
            count: count,
            message: `This password has been found in ${count.toLocaleString()} data breaches.`
          });
        }
      }

      // Password not found in breaches
      return NextResponse.json({
        breached: false,
        count: 0,
        message: 'Password not found in known data breaches.'
      });

    } catch (error: any) {
      console.error('HIBP API error:', error);
      // On error, return unknown (don't fail the password check, just skip breach detection)
      return NextResponse.json({
        breached: false,
        count: 0,
        error: 'Unable to check password breaches. Please try again.'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Password check error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

