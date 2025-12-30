import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-cyber-black scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Get In <span className="text-cyber-green">Touch</span>
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-cyber-muted mb-8 text-lg">
              I'm open to discussing SOC operations, SIEM engineering opportunities, and security consultation.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Location</h4>
                  <p className="text-cyber-muted">Wah Cantt, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Email</h4>
                  <p className="text-cyber-muted">rafay.arshad1@outlook.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyber-gray rounded-full flex items-center justify-center text-cyber-green">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium">Phone</h4>
                  <p className="text-cyber-muted">+92 300 9817 567</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/0xRafuSec" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-cyber-green hover:text-black hover:border-cyber-green transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-cyber-green hover:text-black hover:border-cyber-green transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-cyber-gray p-8 rounded-2xl border border-white/5 shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyber-muted mb-1">Your Name</label>
                <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green outline-none transition-colors" placeholder="What is your good name?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyber-muted mb-1">Your Email</label>
                <input required type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green outline-none transition-colors" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-cyber-muted mb-1">Message</label>
                <textarea required rows={5} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-cyber-green outline-none transition-colors resize-none" placeholder="What do you want to say?" />
              </div>
              
              <button 
                type="submit" 
                disabled={formState !== 'idle'}
                className="w-full py-4 bg-gradient-to-r from-cyber-green to-cyber-blue text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'idle' && <>Send Message <Send size={18} /></>}
                {formState === 'sending' && 'Transmitting...'}
                {formState === 'success' && 'Message Sent!'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;