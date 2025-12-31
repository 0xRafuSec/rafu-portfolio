import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    name: "Certified SOC Analyst Foundation",
    issuer: "SIEM XPERT",
    date: "2024"
  },
  {
    name: "ISO/IEC 27001:2022 Lead Auditor",
    issuer: "MasterMind",
    date: "2025"
  },
  {
    name: "ISO/IEC 27001:2022 Information Security Associate",
    issuer: "SKILLFRONT",
    date: "2024"
  },
  {
    name: "Cybersecurity Specialization",
    issuer: "Google",
    date: "2023"
  },
  {
    name: "Security Analyst Fundamentals",
    issuer: "IBM",
    date: "2023"
  },
  {
    name: "Ethical Hacking & Penetration Testing",
    issuer: "Udemy",
    date: "2023"
  }
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-sans">
           Professional <span className="text-cyber-green">Certifications</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-4 bg-white/50 dark:bg-cyber-gray/40 backdrop-blur-md p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-cyber-blue/50 transition-all hover:translate-x-1 hover:shadow-lg dark:hover:shadow-none">
              <div className="flex-shrink-0 w-12 h-12 bg-black rounded-full flex items-center justify-center text-cyber-green border border-cyber-green/20">
                <Award size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm font-sans">{cert.name}</h3>
                <p className="text-blue-600 dark:text-cyber-blue text-xs mt-1 font-mono">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;