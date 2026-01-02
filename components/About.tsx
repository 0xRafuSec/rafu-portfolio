import React from 'react';
import { ShieldCheck, Github, Linkedin, Activity, Database, Eye } from 'lucide-react';

const OutlookIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <img 
    src="/icons/outlook.png" 
    alt="Outlook" 
    width={size} 
    height={size} 
    className={className}
  />
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-gray-200 dark:border-white/5 scroll-mt-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-cyber-blue-dark dark:text-cyber-blue font-mono tracking-widest text-sm uppercase mb-2">Introduction</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-sans">
              Over<span className="text-cyber-green-dark dark:text-cyber-green">view.</span>
            </h2>
          </div>
          
          <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-xl dark:shadow-none relative overflow-hidden transition-all hover:border-cyber-green-dark/50 dark:hover:border-cyber-green/50">
             {/* Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
              <ShieldCheck size={180} />
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 font-light font-body">
              Hello! I'm <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">Muhammad Rafay Ali</span>, an Experienced <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">Cyber Security Engineer</span> Skilled in crafting detection logic, optimizing logs, and engineering scalable monitoring pipelines using Wazuh and Threat Hawk to surface high-signal threats.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 font-light font-body">
              I specialize in Threat Hunting, Rule Optimization, and ISO 27001 compliance. Experienced in <Activity size={18} className="inline mb-1 text-cyber-blue-dark dark:text-cyber-blue mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">SOC Operations</span>, <Database size={18} className="inline mb-1 text-purple-600 dark:text-purple-400 mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">SIEM Engineering</span>, and <Eye size={18} className="inline mb-1 text-red-600 dark:text-red-400 mx-1" /> <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">Threat Detection</span>, ensuring robust monitoring and rapid threat mitigation. 
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 font-light font-body">
              Actively sharpening offensive and defensive skills through <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">TryHackMe</span> and <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">Hack The Box labs</span>, translating attack techniques into practical detection and response strategies. Certified in <span className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">ISO/IEC 27001 Lead Auditor, SOC Foundations, and Google Cybersecurity Professional</span> programs, reinforcing a strong foundation in governance concepts, security operations, and modern defensive practices.
            </p>
            
            <div className="bg-cyber-green/5 border-l-2 border-cyber-green-dark dark:border-cyber-green p-4 mt-8 mb-6 relative z-10">
              <p className="text-cyber-green-dark dark:text-cyber-green text-sm md:text-base font-bold">
                 "Let's collaborate to bring your secure infrastructure to life!"
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-start border-t border-gray-200 dark:border-white/10 pt-8">
              {/* Email Button */}
              <a href="mailto:rafay.arshad1@outlook.com" className="flex items-center gap-2 group bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-full pl-2 pr-4 py-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-[#0078D4]">
                    <OutlookIcon size={20} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-mono text-[#0078D4]">rafay.arshad1@outlook.com</span>
              </a>

              {/* GitHub Button */}
              <a href="https://github.com/0xRafuSec" target="_blank" className="flex items-center gap-2 group bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full pl-2 pr-4 py-1.5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-gray-900 dark:text-white">
                    <Github size={20} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-mono text-gray-900 dark:text-white">0xRafuSec</span>
              </a>

               {/* LinkedIn Button */}
              <a href="https://www.linkedin.com/in/muhammadrafayali/" target="_blank" className="flex items-center gap-2 group bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-full pl-2 pr-4 py-1.5 hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-all w-10 hover:w-auto overflow-hidden whitespace-nowrap">
                <div className="min-w-[24px] flex justify-center text-blue-600 dark:text-blue-400">
                    <Linkedin size={20} />
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-mono text-blue-600 dark:text-blue-400">Muhammad Rafay Ali</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;