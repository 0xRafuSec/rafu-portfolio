import React from 'react';
import { ShieldCheck, Mail, Github, Linkedin, Activity, Database, Eye, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-cyber-dark border-t border-gray-200 dark:border-white/5 scroll-mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-cyber-blue font-mono tracking-widest text-sm uppercase mb-2">Introduction</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Overview<span className="text-cyber-green">.</span>
            </h2>
          </div>
          
          <div className="bg-white dark:bg-cyber-gray/50 border border-gray-200 dark:border-white/5 rounded-2xl p-8 md:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden">
             {/* Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-20 pointer-events-none">
              <ShieldCheck size={180} />
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 font-light">
              Hello! I'm <span className="font-bold text-gray-900 dark:text-white">Muhammad Rafay Ali</span>, an Experienced <Shield size={18} className="inline mb-1 text-cyber-green mx-1" /> <span className="font-medium text-gray-900 dark:text-white">Cyber Security Engineer</span> skilled in SOC operations, SIEM engineering, threat detection, and compliance frameworks.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10 font-light">
              Currently at <span className="text-cyber-blue font-medium">Cyber Silo</span>, focusing on <span className="font-medium text-gray-900 dark:text-white">threat hunting</span>, log optimization, and ISO 27001 compliance. Hands-on experience performing incident response and building scalable detection frameworks. Experienced in <Activity size={18} className="inline mb-1 text-cyber-blue mx-1" /> <span className="font-medium text-gray-900 dark:text-white">SOC operations</span>, <Database size={18} className="inline mb-1 text-purple-400 mx-1" /> <span className="font-medium text-gray-900 dark:text-white">SIEM engineering</span>, and <Eye size={18} className="inline mb-1 text-red-400 mx-1" /> <span className="font-medium text-gray-900 dark:text-white">threat detection</span>, ensuring robust monitoring and rapid threat mitigation.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-10 relative z-10 font-light">
              Developed automated threat hunting scripts integrated with Wazuh SIEM to reduce incident response time and enhance threat management. Passionate about transforming Information Security through proactive defense strategies and continuous learning.
              <br /><br />
              Let's collaborate to bring your secure infrastructure to life!
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center border-t border-gray-200 dark:border-white/10 pt-8">
              <a href="mailto:rafay.arshad1@outlook.com" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
                   <Mail size={20} />
                </div>
                <span className="text-gray-600 dark:text-gray-300 group-hover:text-orange-500 transition-colors font-mono text-sm md:text-base">rafay.arshad1@outlook.com</span>
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