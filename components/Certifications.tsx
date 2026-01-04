import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    name: "Certified SOC Analyst Foundation",
    issuer: "SIEM XPERT",
    date: "2024",
    link: "/certificates/SOC Foundation.pdf"
  },
  {
    name: "ISO/IEC 27001:2022 Lead Auditor",
    issuer: "MasterMind",
    date: "2025",
    link: "/certificates/ISO 27001 Lead Auditor.pdf"
  },
  {
    name: "ISO/IEC 27001:2022 Information Security Associate",
    issuer: "SKILLFRONT",
    date: "2024",
    link: "/certificates/ISO 27001 INFORMATION SECURITY ASSOCIATE.pdf"
  },
  {
    name: "Cybersecurity Specialization",
    issuer: "Google",
    date: "2023",
    link: "/certificates/Google Cybersecurity.pdf"
  },
  {
    name: "Security Analyst Fundamentals",
    issuer: "IBM",
    date: "2023",
    link: "/certificates/Security Analyst Fundamentals.pdf"
  },
  {
    name: "Ethical Hacking & Penetration Testing",
    issuer: "Udemy",
    date: "2023",
    link: "/certificates/UEH.pdf"
  }
];

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-sans">
           Professional <span className="text-cyber-green-dark dark:text-cyber-green">Certifications</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <a 
              key={index} 
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 bg-white/50 dark:bg-cyber-gray/40 backdrop-blur-md p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-cyber-green-dark/50 dark:hover:border-cyber-green/50 transition-all hover:translate-x-1 hover:shadow-lg dark:hover:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-green-dark/5 dark:bg-cyber-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-black rounded-full flex items-center justify-center text-cyber-green-dark dark:text-cyber-green border border-cyber-green-dark/20 dark:border-cyber-green/20 relative z-10">
                <Award size={24} />
              </div>
              
              <div className="flex-1 relative z-10">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm font-sans pr-6">{cert.name}</h3>
                <p className="text-blue-600 dark:text-cyber-blue text-xs mt-1 font-mono">{cert.issuer}</p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                <ExternalLink size={16} className="text-cyber-green-dark dark:text-cyber-green" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;