# Contact Form Backend Setup Guide

## Current Status
The contact form is currently set up with a placeholder API route that logs messages to the console. To receive actual emails, you need to integrate an email service.

## 🚀 Recommended for Vercel: Resend (Best Choice!)

**Why Resend?**
- ✅ Native Vercel integration
- ✅ Free tier: 3,000 emails/month
- ✅ Easy setup with Vercel environment variables
- ✅ Modern API, great documentation
- ✅ Works perfectly with Vercel serverless functions

### Quick Setup (5 minutes):

1. **Sign up** at https://resend.com/ (free account)
2. **Get API Key:**
   - Go to API Keys → Create API Key
   - Copy your key
3. **Add to Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your_api_key_here`
   - Make sure to select all environments (Production, Preview, Development)
4. **Install Resend:**
   ```bash
   npm install resend
   ```
5. **Update `app/api/contact/route.ts`:**
   - Uncomment the Resend code (lines with `/* */`)
   - Change the `from` email to your verified domain (or use `onboarding@resend.dev` for testing)
6. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Add Resend email integration"
   git push
   ```

That's it! Messages will now be sent to **rafay.arshad1@outlook.com**

---

## Alternative Options

### Option 1: EmailJS (Easiest - Client-side only)
**Free tier:** 200 emails/month

1. **Sign up** at https://www.emailjs.com/
2. **Add Email Service:**
   - Go to Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
3. **Create Email Template:**
   - Go to Email Templates → Create New Template
   - Use variables: `{{name}}`, `{{email}}`, `{{message}}`
4. **Get your credentials:**
   - Public Key (from Account → General)
   - Service ID (from Email Services)
   - Template ID (from Email Templates)
5. **Install EmailJS:**
   ```bash
   npm install @emailjs/browser
   ```
6. **Update Contact.tsx:**
   ```typescript
   import emailjs from '@emailjs/browser';
   
   // In handleSubmit:
   await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     {
       name,
       email,
       message,
     },
     'YOUR_PUBLIC_KEY'
   );
   ```

### Option 2: Resend (Modern & Professional)
**Free tier:** 3,000 emails/month

1. **Sign up** at https://resend.com/
2. **Get API Key** from dashboard
3. **Install Resend:**
   ```bash
   npm install resend
   ```
4. **Update app/api/contact/route.ts:**
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: 'contact@yourdomain.com',
     to: 'rafay.arshad1@outlook.com',
     subject: `New Contact: ${name}`,
     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
   });
   ```
5. **Add to .env.local:**
   ```
   RESEND_API_KEY=your_api_key_here
   ```

### Option 3: Formspree (No Backend Code Needed)
**Free tier:** 50 submissions/month

1. **Sign up** at https://formspree.io/
2. **Create a form** and get your form endpoint
3. **Update Contact.tsx handleSubmit:**
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, message }),
   });
   ```

### Option 4: Vercel Serverless + Nodemailer
For more control, use Vercel's serverless functions with Nodemailer.

## Where Messages Go Currently

Right now, messages are:
- **Logged to console** (check your terminal/server logs)
- **Not sent via email** (you won't receive them)

## Testing

1. Fill out the contact form
2. Check your browser console (F12) for any errors
3. Check your server terminal for the logged message
4. Once you integrate an email service, messages will be sent to: **rafay.arshad1@outlook.com**

## Security Notes

- Never expose API keys in client-side code
- Use environment variables (`.env.local`) for sensitive data
- Add rate limiting in production
- Consider adding reCAPTCHA to prevent spam

