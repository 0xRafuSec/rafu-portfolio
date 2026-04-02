import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { TimelineItem } from '../types';

const experienceData: TimelineItem[] = [
  {
    id: 1,
    title: "Cyber Security Engineer",
    company: "Encbit",
    date: "Jul 2025 – Present",
    location: "Lahore | Hybrid",
    points: [
      "Managed Wazuh SIEM deployments across 5+ client environments handling agent integrations, log source onboarding, rule tuning, and ongoing platform maintenance for 50+ monitored assets.",
      "Authored 15+ tailored detection rules and decoders for new device types, resolving parsing issues and improving log ingestion accuracy by 30% across monitored assets.",
      "Conducted OSINT-driven attack surface analysis using Google Dorking, WHOIS reconnaissance, and Shodan, identifying 10+ exposed assets and misconfigurations for remediation.",
      "Monitored 200+ daily security events, triaging incidents, investigating anomalies, and coordinating fixes across endpoint and network layers.",
      "Maintained active hands-on research via TryHackMe labs practicing offensive and defensive techniques grounded in MITRE ATT&CK TTPs."
    ]
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    company: "Cyber Silo",
    date: "Feb 2025 – Jul 2025",
    location: "Islamabad | Hybrid",
    points: [
      "Engineered and deployed custom SIEM detection rules and log parsers using Wazuh and Threat Hawk, increasing detection fidelity by 40% across critical systems.",
      "Automated compliance mapping workflows in SIEM by correlating ISO 27001, NCA-ECC, and SAMA controls with global standards via Excel-based matrices and Python scripting, cutting manual alignment effort by 60%.",
      "Validated threat detection coverage by integrating MITRE ATT&CK techniques via Atomic Red Team, simulating 20+ real-world attack scenarios to verify rule accuracy and identify coverage gaps.",
      "Resolved SIEM data flow issues by correcting agent misconfigurations and log parsing errors, restoring 99% log integrity across monitored assets.",
      "Built YAML-based CIS hardening templates and audit automation scripts for FortiGate, Cisco, and pfSense firewalls, enforcing secure baseline configurations per CIS Benchmarks."
    ]
  },
  {
    id: 3,
    title: "SOC Analyst",
    company: "Allama Iqbal Open University (via Cyber Silo)",
    date: "Feb 2024 – Feb 2025",
    location: "Islamabad | Hybrid",
    points: [
      "Spearheaded SIEM deployment and integration across 30+ servers, network devices, and endpoints, expanding threat visibility and closing 35% of previously unmonitored attack surfaces.",
      "Reduced false positives by 45% through systematic rule optimization, logic refinement, and alignment with curated threat intelligence feeds and attacker TTPs.",
      "Designed and implemented incident response playbooks for containment, remediation, and escalation workflows, cutting MTTR from 30+ minutes to under 10 minutes.",
      "Monitored and triaged security alerts in real time, performing IOC analysis, log correlation, and root cause analysis across endpoint and network telemetry sources.",
      "Managed endpoint security monitoring using Wazuh EDR, detecting and containing threats across 30+ endpoints with MITRE ATT&CK-mapped detection rules."
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-sans">
          Work <span className="text-cyber-green-dark dark:text-cyber-green">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-green-dark dark:from-cyber-green to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-gray-100 dark:bg-black border-4 border-cyber-green-dark dark:border-cyber-green rounded-full transform -translate-x-[7px] md:-translate-x-1/2 mt-6 z-10 shadow-none dark:shadow-[0_0_10px_#00ff9d]"></div>

                {/* Content Side */}
                <div className="flex-1 ml-8 md:ml-0">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-transparent backdrop-blur-sm p-6 rounded-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-cyber-green hover:shadow-[0_0_20px_rgba(0,255,136,0.15)] group cursor-pointer relative"
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={18} className="text-cyber-green-dark dark:text-cyber-green" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                      <h3 className="text-xl font-bold text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue transition-colors font-sans">{item.title}</h3>
                      <h4 className="text-lg text-gray-800 dark:text-white font-medium flex items-center gap-2 font-mono">
                        <Briefcase size={16} className="text-cyber-blue-dark dark:text-cyber-blue" />
                        {item.company}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-cyber-muted font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {item.location}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="text-gray-600 dark:text-cyber-text/80 text-sm flex items-start gap-2 font-body">
                          <span className="text-cyber-green-dark dark:text-cyber-green mt-1.5 w-1.5 h-1.5 bg-cyber-green-dark dark:bg-cyber-green rounded-full flex-shrink-0 group-hover:bg-cyber-blue-dark dark:group-hover:bg-cyber-blue transition-colors"></span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </a>
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;