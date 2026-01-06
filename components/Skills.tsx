import React from 'react';

// Official SVG Icons for Brands - Using local official brand icons
const Icons = {
  Wazuh: () => (
    <img 
      src="/icons/wazuh.svg" 
      alt="Wazuh" 
      className="w-12 h-12 sm:w-28 sm:h-28 object-contain"
    />
  ),
  QRadar: () => (
    <img 
      src="/icons/qradar.png" 
      alt="IBM QRadar" 
      className="w-12 h-12 sm:w-28 sm:h-28 object-contain"
    />
  ),
  ThreatHawk: () => (
    <img 
      src="/icons/threat-hawk.png" 
      alt="Threat Hawk" 
      className="w-12 h-12 sm:w-28 sm:h-28 object-contain"
    />
  ),
  Threat: () => (
    <img 
      src="/icons/threat.svg" 
      alt="Threat Intelligence" 
      className="w-8 h-8 sm:w-20 sm:h-20 object-contain"
    />
  ),
  IOCs: () => (
    <img 
      src="/icons/iocs.png" 
      alt="IOCs" 
      className="w-8 h-8 sm:w-20 sm:h-20 object-contain"
    />
  ), 
  Hunting: () => (
    <img 
      src="/icons/hunting.png" 
      alt="Hunting" 
      className="w-8 h-8 sm:w-20 sm:h-20 object-contain"
    />
  ),
  Burp: () => (
    <img 
      src="/icons/burp.png" 
      alt="Burp Suite" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Metasploit: () => (
    <img 
      src="/icons/metasploit.svg" 
      alt="Metasploit" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Python: () => (
    <img 
      src="/icons/python.png" 
      alt="Python"
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Kali: () => (
    <img 
      src="/icons/kali.svg" 
      alt="Kali Linux" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Windows: () => (
    <img 
      src="/icons/windows.svg" 
      alt="Windows" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Linux: () => (
    <img 
      src="/icons/linux.svg" 
      alt="Linux" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Azure: () => (
    <img 
      src="/icons/azure.svg" 
      alt="Azure" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Mitre: () => (
    <img 
      src="/icons/mitre.png" 
      alt="MITRE ATT&CK" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  PowerShell: () => (
    <img 
      src="/icons/powershell.svg" 
      alt="PowerShell" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  Bash: () => (
    <img 
      src="/icons/bash.svg" 
      alt="Bash" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
};

import { Shield, Radio, ShieldCheck, FileText, CheckSquare, ShieldAlert, Zap, Cloud, Scale, Bot } from 'lucide-react';

const SkillBadge = ({ icon: Icon, name, isCustom = false }: { icon: any, name: string, isCustom?: boolean }) => (
  <div className="group relative flex items-center justify-center p-3 bg-white/80 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 hover:border-cyber-green-dark dark:hover:border-cyber-green transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 shadow-sm hover:shadow-[0_0_20px_rgba(0,163,101,0.4)] dark:hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] backdrop-blur-sm hover:scale-110 hover:-translate-y-1 cursor-pointer">
    {/* Animated glow effect */}
    <div className="absolute inset-0 rounded-xl bg-cyber-green-dark/0 dark:bg-cyber-green/0 group-hover:bg-cyber-green-dark/10 dark:group-hover:bg-cyber-green/10 transition-all duration-300 blur-sm opacity-0 group-hover:opacity-100 -z-10"></div>
    
    {/* Icon container with rotation animation */}
    <div className="text-gray-600 dark:text-gray-400 group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
      {isCustom ? <Icon /> : <Icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300" strokeWidth={1.5} />}
    </div>
    
    {/* Tooltip with slide-up animation */}
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 translate-y-2 group-hover:translate-y-0 px-2 py-1 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 font-mono shadow-lg">
      {name}
    </span>
  </div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-black text-gray-100 dark:text-[#0f0f0f] uppercase tracking-tighter absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none font-sans">
            Expertise
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10 font-sans">
            Ski<span className="text-cyber-green-dark dark:text-cyber-green">lls.</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Row 1: SIEM & SOC */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-200 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-sans flex items-center gap-2">
                <ShieldAlert className="text-cyber-green-dark dark:text-cyber-green w-6 h-6" />
                SIEM & SOC
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-sans">Threat Detection & Response</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Icons.Wazuh} name="Wazuh" isCustom={true} />
              <SkillBadge icon={Icons.QRadar} name="IBM QRadar" isCustom={true} />
              <SkillBadge icon={Icons.ThreatHawk} name="Threat Hawk" isCustom={true} />
              <SkillBadge icon={Icons.Threat} name="Threat Intelligence" isCustom={true} />
              <SkillBadge icon={Icons.IOCs} name="IOC Analysis" isCustom={true} />
              <SkillBadge icon={Icons.Hunting} name="Threat Hunting" isCustom={true} />
            </div>
          </div>

          {/* Row 2: Offensive Security */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-200 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-sans flex items-center gap-2">
                 <Zap className="text-cyber-blue-dark dark:text-cyber-blue w-6 h-6" />
                 Offensive Security
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-sans">VAPT & Exploitation</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Icons.Kali} name="Kali Linux" isCustom={true} />
              <SkillBadge icon={Icons.Burp} name="Burp Suite" isCustom={true} />
              <SkillBadge icon={Icons.Metasploit} name="Metasploit" isCustom={true} />
              <SkillBadge icon={Icons.Mitre} name="MITRE ATT&CK" isCustom={true} />
              <SkillBadge icon={Radio} name="OSINT" isCustom={true} />
            </div>
          </div>

          {/* Row 3: OS & Cloud */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-200 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
               <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-sans flex items-center gap-2">
                 <Cloud className="text-cyber-purple w-6 h-6" />
                 OS & Cloud
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-sans">Infrastructure & Hardening</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
               <SkillBadge icon={Icons.Windows} name="Windows Security" isCustom={true} />
               <SkillBadge icon={Icons.Linux} name="Linux" isCustom={true} />
               <SkillBadge icon={Icons.Azure} name="Azure" isCustom={true} />
            </div>
          </div>

          {/* Row 4: Governance */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-200 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-sans flex items-center gap-2">
                <Scale className="text-yellow-600 dark:text-yellow-500 w-6 h-6" />
                Governance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-sans">GRC & Standards</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={FileText} name="ISO 27001" />
              <SkillBadge icon={CheckSquare} name="NCA-ECC" />
              <SkillBadge icon={ShieldCheck} name="SAMA" />
              <SkillBadge icon={Shield} name="ADHICS" />
            </div>
          </div>

           {/* Row 5: Automation */}
           <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 font-sans flex items-center gap-2">
                <Bot className="text-red-600 dark:text-red-500 w-6 h-6" />
                Automation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-sans">Scripting & DevOps</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Icons.Python} name="Python" isCustom={true} />
              <SkillBadge icon={Icons.Bash} name="Bash" />
              <SkillBadge icon={Icons.PowerShell} name="PowerShell" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;