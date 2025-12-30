import React from 'react';
import { Shield, Code, Server, Terminal, Lock, Database, Globe, Cloud, Activity, Box, Hexagon, Layers, Workflow, Eye } from 'lucide-react';

// Custom Badge Component
const SkillBadge = ({ icon: Icon, name }: { icon: any, name: string }) => (
  <div className="group relative flex items-center justify-center p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/10 hover:border-cyber-green transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 shadow-sm hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]">
    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-cyber-green transition-colors" strokeWidth={1.5} />
    {/* Tooltip */}
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-cyber-green text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
      {name}
    </span>
  </div>
);

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-cyber-black transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-black text-gray-200 dark:text-[#1a1a1a] uppercase tracking-tighter absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none">
            Expertise
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10">
            Skills<span className="text-cyber-blue">.</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Row 1: SIEM & SOC (Blue Teaming equivalent) */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">SIEM & SOC</h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Threat Detection & Response</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Activity} name="Wazuh" />
              <SkillBadge icon={Eye} name="Threat Hawk" />
              <SkillBadge icon={Shield} name="Incident Response" />
              <SkillBadge icon={Search} name="Threat Hunting" />
              <SkillBadge icon={Filter} name="Rule Parsing" />
              <SkillBadge icon={Globe} name="Splunk" />
            </div>
          </div>

          {/* Row 2: Offensive Security (Red Teaming equivalent) */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Offensive Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">VAPT & Exploitation</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Terminal} name="Kali Linux" />
              <SkillBadge icon={Bug} name="Burp Suite" />
              <SkillBadge icon={Scan} name="Nmap" />
              <SkillBadge icon={Bomb} name="Metasploit" />
              <SkillBadge icon={Globe} name="OSINT" />
              <SkillBadge icon={Lock} name="Mimikatz" />
            </div>
          </div>

          {/* Row 3: Governance & Compliance */}
          <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 dark:border-white/5 pb-12">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Governance</h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">GRC & Standards</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={FileText} name="ISO 27001" />
              <SkillBadge icon={CheckSquare} name="NCA-ECC" />
              <SkillBadge icon={Briefcase} name="SAMA" />
              <SkillBadge icon={Grid} name="MITRE ATT&CK" />
              <SkillBadge icon={ShieldCheck} name="CIS Controls" />
            </div>
          </div>

           {/* Row 4: Programming & Scripting */}
           <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-64 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Automation</h3>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Scripting & DevOps</p>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <SkillBadge icon={Code} name="Python" />
              <SkillBadge icon={Terminal} name="Bash" />
              <SkillBadge icon={Powershell} name="PowerShell" />
              <SkillBadge icon={Cloud} name="Azure" />
              <SkillBadge icon={Server} name="Linux" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Icons (Mapping Lucide to concepts since we don't have SVGs)
import { Search, Filter, Bug, Bomb, Scan, FileText, CheckSquare, Briefcase, Grid, ShieldCheck, Gamepad2 } from 'lucide-react';

const Powershell = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l6 6-6 6"/><path d="M14 18h6"/></svg>
);

export default Skills;