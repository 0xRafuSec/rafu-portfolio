'use client'

import React, { useState } from 'react'
import { Project } from '../../types'
import { Github, ExternalLink, Shield, Code } from 'lucide-react'

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Active Directory Attack Simulation & Hardening',
    description: 'Emulated post-exploitation techniques in a Windows AD lab using Atomic Red Team, PowerShell, and Mimikatz. Integrated Wazuh SIEM to alert on 20+ MITRE-mapped TTPs and performed CIS-based hardening, achieving 80% increase in compliance.',
    category: 'security',
    tags: ['Active Directory', 'Wazuh', 'Mimikatz', 'Atomic Red Team', 'CIS'],
    links: { github: 'https://github.com/0xRafuSec/Active-Directory-Attack-Simulation-and-Hardening-Lab' },
  },
  {
    id: 2,
    title: 'Multi-Sensor Intrusion Detection IoT',
    description: 'Developed an IoT-based intrusion detection system using ESP32, sensors, and real-time alerting. Implemented Flask backend for threat analysis and built a Flutter mobile app for remote monitoring with 60% improvement in response time.',
    category: 'security',
    tags: ['IoT', 'ESP32', 'Flutter', 'Firebase', 'C++'],
    links: { github: 'https://github.com/0xRafuSec/Multi-Sensor-Intrusion-Detection-IOT' },
  },
]

const Projects3D: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const getIcon = (category: string) => {
    switch (category) {
      case 'security':
        return <Shield size={40} className="text-cyber-green" />
      case 'development':
        return <Code size={40} className="text-pink-400" />
      default:
        return <Shield size={40} className="text-white" />
    }
  }

  const filteredProjects =
    filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-20 transition-colors duration-300 scroll-mt-20 relative bg-gradient-to-br from-[#0a0a0a] via-black to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-sans">
          Featured <span className="text-cyber-green-dark dark:text-cyber-green">Projects</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'security', 'development'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-mono text-sm font-bold transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black shadow-[0_0_15px_rgba(0,255,157,0.5)]'
                  : 'bg-white/5 border border-white/10 text-white/80 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* 3D Project Card */}
              <div className="relative h-full rounded-lg overflow-hidden bg-gradient-to-br from-black/50 to-black/90 border border-white/10 group-hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,255,157,0.2)]">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 to-cyber-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-4 text-cyan-400 transform group-hover:scale-110 transition-transform duration-300">
                    {getIcon(project.category)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-green transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-mono bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 text-white/60 rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyber-green hover:text-cyber-green-dark transition-colors text-sm font-mono"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyber-blue hover:text-cyber-blue-dark transition-colors text-sm font-mono"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover indicator */}
                {hoveredId === project.id && (
                  <div className="absolute top-0 right-0 w-1 h-1/3 bg-gradient-to-b from-cyber-green to-transparent animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects3D
