import React from 'react';

// Custom SVG Icons for Brands
const Icons = {
  Wazuh: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
        <path d="M64 12c-2.4 0-4.7.7-6.7 2.1l-42 28C11.9 44.4 10 48.1 10 52v24c0 3.9 1.9 7.6 5.3 9.9l42 28c2 1.4 4.3 2.1 6.7 2.1s4.7-.7 6.7-2.1l42-28c3.4-2.3 5.3-6 5.3-9.9V52c0-3.9-1.9-7.6-5.3-9.9l-42-28C68.7 12.7 66.4 12 64 12zm0 18l32 21.3L64 72.7 32 51.3 64 30z"/>
    </svg>
  ),
  Splunk: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M23.01 10.37h-3.46c-.73-2.19-2.77-3.76-5.18-3.76-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5c2.41 0 4.45-1.57 5.18-3.76h3.46c-.77 4.1-4.35 7.19-8.64 7.19-4.86 0-8.8-3.94-8.8-8.8 0-1.89.6-3.64 1.6-5.06l-.01.01-6.1-3.64.91-2.72 6.57 3.92c1.72-1.02 3.73-1.61 5.89-1.61 4.29 0 7.87 3.09 8.64 7.19z" />
    </svg>
  ),
  Kali: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M2.81 7.22S2.03 4.4 2.18 3.53l5.62 1.4c-.16 2.03 1.87 3.75 3.9 4.37l-1.4-1.87c.31-1.09.78-2.65 1.56-4.37.47-1.09 1.56-2.5 1.56-2.5s.47 2.03.62 3.28c.16 2.34-1.25 5-2.03 5.93-.78.93-2.65 2.65-3.59 2.5-1.87-.47-5.61-5.05-5.61-5.05zm17.96 4.68s1.09 2.81.94 3.75l-5.62-1.4c.16-2.03-1.87-3.75-3.9-4.37l1.4 1.87c-.31 1.09-.78 2.65-1.56 4.37-.47 1.09-1.56 2.5-1.56 2.5s-.47-2.03-.62-3.28c-.16-2.34 1.25-5 2.03-5.93.78-.93 2.65-2.65 3.59-2.5 1.87.47 5.61 5.05 5.61 5.05zM12 11.21c-2.34 3.12-3.28 6.09-2.65 9.84.47 2.19 1.4 3.12 1.4 3.12s.93-.93 1.4-3.12c.62-3.75-.31-6.72-2.65-9.84l2.5-2.5z" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-2.55l.04-.37.12-.3.19-.24.26-.18.32-.14.37-.1.41-.07.44-.04zm-4.5 1.53l-.16.03-.13.07-.09.11-.05.14-.02.16.02.16.05.14.09.11.13.07.16.03.16-.03.13-.07.09-.11.05-.14.02-.16-.02-.16-.05-.14-.09-.11-.13-.07zm10.81 9.12l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-.06-.01h-8.16v2.55l-.04.37-.12.3-.19.24-.26.18-.32.14-.37.1-.41.07-.44.04h-1.83l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13v-5.25l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.47l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h1.27l.63.02.48.05.32.05.15.02.06.02zm-4.5 11.25l-.16.03-.13.07-.09.11-.05.14-.02.16.02.16.05.14.09.11.13.07.16.03.16-.03.13-.07.09-.11.05-.14.02-.16-.02-.16-.05-.14-.09-.11-.13-.07z"/>
    </svg>
  ),
  Windows: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  ),
  Linux: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M12.002 0C10.227 0 9.202.932 9.202 2.656c0 1.253.11 2.396.064 3.737-.04.996-1.574 1.944-2.618 2.302-.998.342-3.145.418-3.327 2.016-.255 2.227 2.14 1.583 2.505 3.398.24 1.185-.756 2.046-.756 2.046-2.168 4.242 1.583 7.828 6.93 7.828 5.348 0 9.1-3.586 6.932-7.828 0 0-.996-.86-.757-2.046.365-1.815 2.76-1.17 2.505-3.398-.182-1.598-2.33-1.674-3.328-2.016-1.043-.358-2.576-1.306-2.617-2.302-.046-1.34.063-2.484.063-3.737C14.8.932 13.776 0 12.002 0z"/>
    </svg>
  ),
  Azure: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 fill-current">
      <path d="M5.4 18.9L10 5h4.3l-5.6 15zM12.9 8.6L18 20h-4z"/>
    </svg>
  ),
};

import { Shield, Code, Server, Lock, Globe, Box, Bug, Terminal as TerminalIcon, ShieldCheck, FileText, CheckSquare, Search, Eye, ShieldAlert, Zap, Cloud, Scale, Bot } from 'lucide-react';

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
              <SkillBadge icon={Icons.Splunk} name="Splunk" isCustom={true} />
              <SkillBadge icon={Eye} name="Threat Hawk" />
              <SkillBadge icon={Shield} name="Incident Response" />
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
              <SkillBadge icon={Globe} name="OSINT" />
              <SkillBadge icon={Lock} name="Mimikatz" />
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
              <SkillBadge icon={ShieldCheck} name="CIS Controls" />
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