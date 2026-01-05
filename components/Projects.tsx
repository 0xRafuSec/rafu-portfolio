import React, { useState } from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Shield, Search, Code, Lock } from 'lucide-react';

const projectsData: Project[] = [
  {
    id: 1,
    title: "Active Directory Attack Simulation & Hardening",
    description: "Emulated post-exploitation techniques in a Windows AD lab using Atomic Red Team, PowerShell, and Mimikatz. Integrated Wazuh SIEM to alert on 20+ MITRE-mapped TTPs and performed CIS-based hardening, achieving 80% increase in compliance.",
    category: "security",
    tags: ["Active Directory", "Wazuh", "Mimikatz", "Atomic Red Team", "CIS"],
    links: { github: "https://github.com/0xRafuSec/Active-Directory-Attack-Simulation-and-Hardening-Lab" }
  },
  {
    id: 2,
    title: "Multi-Sensor Intrusion Detection IoT",
    description: "Developed an IoT-based security solution using ESP32, motion/gas/fire sensors, and ESP32-CAM. Engineered a mobile application using Flutter and Firebase for real-time alerts, improving response time by 60%.",
    category: "development",
    tags: ["IoT", "ESP32", "Flutter", "Dart", "Firebase", "C++"],
    links: { github: "https://github.com/0xRafuSec/Multi-Sensor-Intrusion-Detection-IOT" }
  }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'security' | 'forensics' | 'development'>('all');

  const filteredProjects = projectsData.filter(
    project => filter === 'all' || project.category === filter
  );

  const getIcon = (category: string) => {
    switch(category) {
      case 'security': return <Shield size={40} className="text-gray-800 dark:text-black" />;
      case 'forensics': return <Search size={40} className="text-gray-800 dark:text-black" />;
      case 'development': return <Code size={40} className="text-gray-800 dark:text-black" />;
      default: return <Lock size={40} className="text-gray-800 dark:text-black" />;
    }
  };

  return (
    <section id="projects" className="py-20 transition-colors duration-300 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white font-sans">
          Featured <span className="text-cyber-green-dark dark:text-cyber-green">Projects</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'security', 'development'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize font-mono ${
                filter === cat
                  ? 'bg-cyber-blue-dark dark:bg-cyber-blue text-white dark:text-black shadow-none dark:shadow-neon-blue'
                  : 'bg-white/50 dark:bg-cyber-gray/30 text-gray-600 dark:text-cyber-muted hover:bg-white dark:hover:bg-cyber-gray/80 border border-gray-200 dark:border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white/80 dark:bg-cyber-gray/40 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden hover:border-cyber-green-dark dark:hover:border-cyber-green transition-all duration-300 hover:-translate-y-2 shadow-lg dark:shadow-none">
              <div className="h-48 bg-gradient-to-br from-cyber-green-dark to-cyber-blue-dark dark:from-cyber-green dark:to-cyber-blue flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="transform group-hover:scale-110 transition-transform duration-300 bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  {getIcon(project.category)}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyber-green-dark dark:group-hover:text-cyber-green transition-colors font-sans">{project.title}</h3>
                  <span className="text-xs font-mono py-1 px-2 rounded bg-gray-100 dark:bg-black/30 text-cyber-blue-dark dark:text-cyber-blue capitalize border border-cyber-blue-dark/20 dark:border-cyber-blue/20">{project.category}</span>
                </div>
                
                <p className="text-gray-600 dark:text-cyber-muted text-sm mb-6 line-clamp-3 font-mono">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-black/30 px-2 py-1 rounded font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-green-dark dark:text-cyber-green hover:text-green-700 dark:hover:text-white transition-colors font-mono hover-glitch">
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-cyber-blue-dark dark:text-cyber-blue hover:text-blue-700 dark:hover:text-white transition-colors font-mono hover-glitch">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;