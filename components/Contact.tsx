import React, { useState, useRef } from 'react';
import { MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

const OutlookIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
     <path d="M22 12V7.12607C22 6.53696 21.6163 6.01455 21.053 5.86438L12.9863 3.71328C12.3396 3.54082 11.6604 3.54082 11.0137 3.71328L2.94697 5.86438C2.38374 6.01455 2 6.53696 2 7.12607V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V12Z" stroke="#0078D4" strokeWidth="2"/>
    <path d="M2 7L12 13L22 7" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="14" y="19" fontSize="10" fill="#0078D4" fontWeight="bold" stroke="none" style={{ fontFamily: 'Arial' }}>O</text>
  </svg>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      // Using EmailJS - Free service for sending emails from frontend
      // You need to:
      // 1. Sign up at https://www.emailjs.com/
      // 2. Create a service (Gmail, Outlook, etc.)
      // 3. Create an email template
      // 4. Get your Public Key, Service ID, and Template ID
      // 5. Replace the values below with your actual credentials
      
      // For now, using a simple fetch to a backend endpoint
      // You can also use EmailJS by installing: npm install @emailjs/browser
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
        setTimeout(() => setFormState('idle'), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-sans text-gray-900 dark:text-white">
          Get In <span className="text-cyber-green-dark dark:text-cyber-green">Touch</span>
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-mono">Let's Connect</h3>
            <p className="text-gray-600 dark:text-cyber-muted mb-8 text-lg font-mono">
              I'm open to discussing SOC operations, SIEM engineering opportunities, and security consultation.
            </p>
            
            <div className="space-y-6 mb-8 font-mono">
              <a 
                href="https://maps.google.com/?q=Islamabad,Pakistan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-3 rounded-xl bg-gray-100/50 dark:bg-cyber-gray/30 border border-gray-200 dark:border-white/5 hover:border-cyber-green-dark dark:hover:border-cyber-green hover:bg-cyber-green-dark/5 dark:hover:bg-cyber-green/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyber-green-dark/20 dark:hover:shadow-cyber-green/20 cursor-pointer"
              >
                <div className="relative w-12 h-12 bg-gray-100 dark:bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green-dark dark:text-cyber-green border border-gray-200 dark:border-white/5 group-hover:bg-cyber-green-dark dark:group-hover:bg-cyber-green group-hover:text-white dark:group-hover:text-black group-hover:border-cyber-green-dark dark:group-hover:border-cyber-green transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <MapPin size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-cyber-green-dark dark:bg-cyber-green rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors duration-300">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">Islamabad, Pakistan</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-cyber-green-dark dark:text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              
              <a 
                href="mailto:rafay.arshad1@outlook.com"
                className="group flex items-center gap-4 p-3 rounded-xl bg-gray-100/50 dark:bg-cyber-gray/30 border border-gray-200 dark:border-white/5 hover:border-cyber-green-dark dark:hover:border-cyber-green hover:bg-cyber-green-dark/5 dark:hover:bg-cyber-green/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyber-green-dark/20 dark:hover:shadow-cyber-green/20 cursor-pointer"
              >
                <div className="relative w-12 h-12 bg-gray-100 dark:bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green-dark dark:text-cyber-green border border-gray-200 dark:border-white/5 group-hover:bg-cyber-green-dark dark:group-hover:bg-cyber-green group-hover:text-white dark:group-hover:text-black group-hover:border-cyber-green-dark dark:group-hover:border-cyber-green transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <OutlookIcon size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-cyber-green-dark dark:bg-cyber-green rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors duration-300">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 break-all">rafay.arshad1@outlook.com</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-cyber-green-dark dark:text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a 
                href="tel:+923009817567"
                className="group flex items-center gap-4 p-3 rounded-xl bg-gray-100/50 dark:bg-cyber-gray/30 border border-gray-200 dark:border-white/5 hover:border-cyber-green-dark dark:hover:border-cyber-green hover:bg-cyber-green-dark/5 dark:hover:bg-cyber-green/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyber-green-dark/20 dark:hover:shadow-cyber-green/20 cursor-pointer"
              >
                <div className="relative w-12 h-12 bg-gray-100 dark:bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green-dark dark:text-cyber-green border border-gray-200 dark:border-white/5 group-hover:bg-cyber-green-dark dark:group-hover:bg-cyber-green group-hover:text-white dark:group-hover:text-black group-hover:border-cyber-green-dark dark:group-hover:border-cyber-green transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Phone size={20} className="relative z-10" />
                  <div className="absolute inset-0 bg-cyber-green-dark dark:bg-cyber-green rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 dark:text-white font-medium group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors duration-300">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">+92 300 9817 567</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <svg className="w-5 h-5 text-cyber-green-dark dark:text-cyber-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 dark:border-white/10 rounded-full flex items-center justify-center text-gray-700 dark:text-white hover:bg-cyber-green-dark dark:hover:bg-cyber-green hover:text-white dark:hover:text-black hover:border-cyber-green-dark dark:hover:border-cyber-green transition-all duration-300 hover:scale-110">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 dark:border-white/10 rounded-full flex items-center justify-center text-gray-700 dark:text-white hover:bg-cyber-blue-dark dark:hover:bg-cyber-green hover:text-white dark:hover:text-black hover:border-cyber-blue-dark dark:hover:border-cyber-green transition-all duration-300 hover:scale-110">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="bg-white/80 dark:bg-cyber-gray/40 backdrop-blur-md p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
            <div className="space-y-4 font-mono">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-cyber-muted mb-1">Your Name</label>
                <input required name="name" type="text" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-cyber-green-dark dark:focus:border-cyber-green outline-none transition-colors placeholder-gray-500" placeholder="What is your good name?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-cyber-muted mb-1">Your Email</label>
                <input required name="email" type="email" className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-cyber-green-dark dark:focus:border-cyber-green outline-none transition-colors placeholder-gray-500" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-cyber-muted mb-1">Message</label>
                <textarea required name="message" rows={5} className="w-full bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white focus:border-cyber-green-dark dark:focus:border-cyber-green outline-none transition-colors resize-none placeholder-gray-500" placeholder="What do you want to say?" />
              </div>
              
              <button 
                type="submit" 
                disabled={formState !== 'idle'}
                className="group relative w-full py-4 bg-gradient-to-r from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue text-white dark:text-black font-bold rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(0,163,101,0.5)] dark:hover:shadow-[0_0_30px_#00ff9d] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed font-sans hover:scale-[1.02] active:scale-95 duration-200"
              >
                <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {formState === 'idle' && <>Send Message <Send size={18} /></>}
                  {formState === 'sending' && <>Transmitting... <span className="animate-spin">⚡</span></>}
                  {formState === 'success' && <>Message Sent! ✓</>}
                  {formState === 'error' && <>Error! Try again</>}
                </span>
              </button>
              
              {formState === 'error' && (
                <p className="text-sm text-red-500 dark:text-red-400 text-center">
                  Failed to send. Please email directly at rafay.arshad1@outlook.com
                </p>
              )}
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;