'use client'

import React, { useState } from 'react'
import { Bot, Shield, Code, Cloud, Award } from 'lucide-react'

const skillCategories = [
  {
    id: 'siem',
    label: 'SIEM & SOC',
    icon: Shield,
    skills: ['Wazuh', 'QRadar', 'Threat Hawk', 'Threat Intelligence', 'IOCs', 'Threat Hunting'],
    color: 'from-cyber-green-dark to-cyber-green',
  },
  {
    id: 'offensive',
    label: 'Offensive Security',
    icon: Code,
    skills: ['Kali Linux', 'Burp Suite', 'Metasploit', 'MITRE ATT&CK', 'OSINT'],
    color: 'from-pink-600 to-pink-400',
  },
  {
    id: 'os-cloud',
    label: 'OS & Cloud',
    icon: Cloud,
    skills: ['Windows Security', 'Linux', 'Azure'],
    color: 'from-blue-600 to-blue-400',
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: Award,
    skills: ['ISO 27001', 'NCA-ECC', 'SAMA', 'ADHICS'],
    color: 'from-purple-600 to-purple-400',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Bot,
    skills: ['Python', 'Bash', 'PowerShell'],
    color: 'from-orange-600 to-orange-400',
  },
]

const Skills3D: React.FC = () => {
  const [_hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 transition-colors duration-300 scroll-mt-20 relative bg-gradient-to-br from-black via-[#0a0a0a] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-black text-gray-100 dark:text-[#0f0f0f] uppercase tracking-tighter absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none font-sans">
            Expertise
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white relative z-10 font-sans">
            Ski<span className="text-cyber-green-dark dark:text-cyber-green">lls.</span>
          </h2>
        </div>

        {/* 3D Skill Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* 3D Card Effect with Gradient Border */}
              <div className="relative h-64 rounded-lg overflow-hidden perspective">
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl group-hover:blur-lg`}></div>

                {/* Card content */}
                <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                  {/* Header */}
                  <div>
                    <category.icon className="w-8 h-8 mb-2 text-cyber-green" />
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                      {category.label}
                    </h3>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-white/80 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyber-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              </div>

              {/* Floating shadow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-cyber-green-dark/10 to-cyber-blue-dark/10 border border-white/5 rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-4">Quick Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyber-green" />
              <span className="text-white/80">Security First</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-pink-400" />
              <span className="text-white/80">Full Stack</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-white/80">Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills3D
