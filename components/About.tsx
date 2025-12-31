import React from 'react';
import { ShieldCheck, Github, Linkedin, Activity, Database, Eye, Shield } from 'lucide-react';

const OutlookIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 6L1 17C1 18.6569 2.34315 20 4 20H20C21.6569 20 23 18.6569 23 17V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 6L12 13L23 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" className="text-blue-500" strokeOpacity="0" />
    <path d="M16 16H20V12" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9" stroke="#0078D4" strokeWidth="0" fill="#0078D4" fillOpacity="0.1" />
    <path d="M22 12V7.12607C22 6.53696 21.6163 6.01455 21.053 5.86438L12.9863 3.71328C12.3396 3.54082 11.6604 3.54082 11.0137 3.71328L2.94697 5.86438C2.38374 6.01455 2 6.53696 2 7.12607V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V12Z" stroke="#0078D4" strokeWidth="2"/>
    <path d="M2 7L12 13L22 7" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="14" y="19" fontSize="10" fill="#0078D4" fontWeight="bold" stroke="none" style={{ fontFamily: 'Arial' }}>O</text>
  </svg>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-gray-200 dark:border-white/5 scroll-mt-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-cyber-blue font-mono tracking-widest text-sm uppercase mb-2">Profile</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-sans">
              About <span className="text-cyber-green">Me.</span>
            </h2>
          </div>
          
          <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-xl dark:shadow-none relative overflow-hidden transition-all hover:border-cyber-green/50">
             {/* Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
              <ShieldCheck size={180} />
            </div>

            <div className="relative z-10 space-y-6 text-lg text-gray-700 dark:text-gray-300 font-light font-body leading-relaxed">
              <p>
                <span className="font-bold text-gray-900 dark:text-white">Security-focused engineer</span> with a proven track record in hardening critical infrastructure and optimizing SOC operations. I have <span className="font-medium text-cyber-green">mitigated</span> complex threats by deploying and tuning advanced SIEM solutions like <span className="font-medium text-white">Wazuh</span> and <span className="font-medium text-white">Splunk</span>, significantly enhancing organizational threat visibility.
              </p>
              
              <p>
                My expertise lies in aligning network security architectures with rigorous compliance standards, including <span className="font-medium text-white">ISO 27001</span> and <span className="font-medium text-white">NCA-ECC</span>. I have successfully <span className="font-medium text-cyber-blue">hardened</span> enterprise environments against lateral movement and privilege escalation attacks, reducing the attack surface for mission-critical assets.
              </p>

              <p>
                Dedicated to proactive defense, I specialize in developing automated incident response playbooks and custom detection rules that reduce mean time to respond (MTTR). I am a problem-solver committed to building resilient, compliance-ready security frameworks that withstand modern cyber threats.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-t border-gray-200 dark:border-white/10 pt-8 mt-8">
              <a href="mailto:rafay.arshad1@outlook.com" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/10 rounded-lg flex items-center justify-center text-[#0078D4] group-hover:scale-110 transition-transform">
                   <OutlookIcon size={20} />
                </div>
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-[#0078D4] transition-colors font-mono text-sm md:text-base">rafay.arshad1@outlook.com</span>
              </a>

              <div className="flex gap-4">
                <a href="https://github.com/0xRafuSec" target="_blank" className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center text-gray-900 dark:text-white hover:bg-black hover:text-white transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;