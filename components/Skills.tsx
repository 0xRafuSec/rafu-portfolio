import React from 'react';

// Official SVG Icons for Brands - Using local official brand icons
const Icons = {
  Wazuh: () => (
    <img 
      src="https://wazuh.com/brand-assets/Wazuh-Logo.svg" 
      alt="Wazuh" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
      onError={(e) => {
        e.currentTarget.src = '/icons/wazuh.svg';
      }}
    />
  ),
  QRadar: () => (
    <img 
      src="/icons/qradar.svg" 
      alt="IBM QRadar" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  ),
  ThreatHawk: () => (
    <img 
      src="/icons/threat-hawk.svg" 
      alt="Threat Hawk" 
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
  Python: () => (
    <img 
      src="/icons/python.svg" 
      alt="Python" 
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
      src="/icons/mitre.svg" 
      alt="MITRE ATT&CK" 
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
  )
};

import { Shield, Code, Server, Globe, Box, Bug, Terminal as TerminalIcon, ShieldCheck, FileText, CheckSquare, Search, ShieldAlert, Zap, Cloud, Scale, Bot, FileSearch, Radio } from 'lucide-react';

const SkillBadge = ({ icon: Icon, name, isCustom = false }: { icon: any, name: string, isCustom?: boolean }) => (
  <div className="group relative flex items-center justify-center p-3 bg-white/80 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/10 hover:border-cyber-green-dark dark:hover:border-cyber-green transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 shadow-sm hover:shadow-[0_0_15px_rgba(0,163,101,0.2)] dark:hover:shadow-[0_0_15px_rgba(0,255,157,0.2)] backdrop-blur-sm">
    <div className="text-gray-600 dark:text-gray-400 group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors">
      {isCustom ? <Icon /> : <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={1.5} />}
    </div>
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 font-mono">
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
              <SkillBadge icon={Globe} name="Threat Intelligence" />
              <SkillBadge icon={FileSearch} name="IOC Analysis" />
              <SkillBadge icon={Search} name="Threat Hunting" />
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
              <SkillBadge icon={Bug} name="Burp Suite" />
              <SkillBadge icon={Box} name="Metasploit" />
              <SkillBadge icon={Icons.Mitre} name="MITRE ATT&CK" isCustom={true} />
              <SkillBadge icon={Radio} name="OSINT" />
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
               <SkillBadge icon={Server} name="Server Admin" />
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
              <SkillBadge icon={TerminalIcon} name="Bash" />
              <SkillBadge icon={Code} name="PowerShell" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;