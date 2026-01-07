'use client'

import React, { useEffect, useRef } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experienceData = [
  {
    id: 1,
    title: 'Cyber Security Analyst',
    company: 'Cyber Silo',
    date: 'Feb 2025 - July 2025',
    location: 'Remote',
    points: [
      'Designed custom SIEM detection rules achieving 40% improvement in detection fidelity',
      'Automated compliance mapping for ISO 27001, NCA-ECC, and SAMA frameworks',
      'Resolved critical SIEM data flow issues ensuring 99% log integrity',
      'Developed YAML-based CIS hardening templates for enterprise deployment',
    ],
    link: '#',
  },
  {
    id: 2,
    title: 'SOC Analyst',
    company: 'Allama Iqbal Open University (via Cyber Silo)',
    date: 'Feb 2024 - Feb 2025',
    location: 'Islamabad, Pakistan',
    points: [
      'SIEM deployment and management across 30+ servers and network devices (35% blind spot reduction)',
      'OSINT reconnaissance using Google Dorking, WHOIS, and other intelligence gathering techniques',
      'Reduced false positives by 45% through rule optimization and tuning',
      'Designed comprehensive incident response playbooks reducing response time from 30+ minutes to under 10 minutes',
      'Ensured 24/7 SOC uptime and SIEM system stability with 99.9% availability',
    ],
    link: '#',
  },
]

const Experience3D: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const items = timelineRef.current.querySelectorAll('[data-experience-item]')

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 transition-colors duration-300 scroll-mt-20 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white font-sans">
          Work <span className="text-cyber-green-dark dark:text-cyber-green">Experience</span>
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-green-dark dark:from-cyber-green to-transparent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div
                key={item.id}
                data-experience-item
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 top-0 transform md:-translate-x-1/2 -translate-x-1/2">
                  <div className="w-4 h-4 bg-cyber-green-dark dark:bg-cyber-green rounded-full ring-4 ring-black dark:ring-[#0a0a0a]"></div>
                </div>

                {/* Content */}
                <div className="flex-1 md:w-1/2">
                  <div className="group relative rounded-lg overflow-hidden bg-gradient-to-br from-black/50 to-black/90 border border-white/10 hover:border-white/30 p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.2)]">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Absolute positioning for top-right icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={18} className="text-cyber-green-dark dark:text-cyber-green" />
                    </div>

                    {/* Relative content */}
                    <div className="relative flex flex-col gap-2 mb-4">
                      <h3 className="text-xl font-bold text-cyber-green-dark dark:text-cyber-green group-hover:text-cyber-blue-dark dark:group-hover:text-cyber-blue transition-colors font-sans">
                        {item.title}
                      </h3>
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

                    {/* Points */}
                    <ul className="space-y-2">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-cyber-green-dark dark:text-cyber-green mt-1 flex-shrink-0">▸</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 w-0.5 h-0 bg-cyber-green group-hover:h-1/2 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience3D
