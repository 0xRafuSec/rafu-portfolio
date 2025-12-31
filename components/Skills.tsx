import React from 'react';
import { Shield, Crosshair, FileCheck } from 'lucide-react';

const Skills: React.FC = () => {
  const domains = [
    {
      title: "Defensive (Blue Team)",
      icon: <Shield size={24} className="text-cyber-blue" />,
      description: "Monitoring, Detection & Response",
      skills: ["SIEM (Wazuh, Splunk)", "SOC Operations", "Incident Response", "Threat Hunting", "Threat Hawk", "Log Analysis", "Network Security"]
    },
    {
      title: "Offensive (Red Team)",
      icon: <Crosshair size={24} className="text-red-500" />,
      description: "Vulnerability Assessment & Penetration Testing",
      skills: ["Penetration Testing", "Vulnerability Assessment", "Kali Linux", "Burp Suite", "Metasploit", "Mimikatz", "OSINT", "Exploitation"]
    },
    {
      title: "Compliance / GRC",
      icon: <FileCheck size={24} className="text-cyber-green" />,
      description: "Governance, Risk & Compliance",
      skills: ["ISO 27001", "Risk Management", "NCA-ECC", "CIS Controls", "Security Auditing", "Policy Development"]
    }
  ];

  return (
    <section id="skills" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-black text-gray-100 dark:text-[#0f0f0f] uppercase tracking-tighter absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none font-sans">
            Capabilities
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10 font-sans">
            Technical <span className="text-cyber-blue">Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {domains.map((domain, index) => (
            <div key={index} className="bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 p-8 hover:border-cyber-green/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
                  {domain.icon}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">{domain.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{domain.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {domain.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-cyber-green/10 hover:border-cyber-green/30 hover:text-cyber-green transition-colors cursor-default font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;