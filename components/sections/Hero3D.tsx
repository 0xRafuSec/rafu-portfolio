'use client'

import React, { useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import ThreeCanvas from '../3d/ThreeCanvas'
import { ChevronRight, Github, Linkedin } from 'lucide-react'

const Hero3D: React.FC = () => {
  const [displayedName, setDisplayedName] = useState('')
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedDesc, setDisplayedDesc] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const particlesRef = useRef<THREE.Points | null>(null)
  const textMeshRef = useRef<THREE.Group | null>(null)

  const fullName = 'Muhammad Rafay Ali'
  const fullTitle = 'CYBER SECURITY ENGINEER'
  const fullDesc =
    'Transforming logs into intelligence and vulnerabilities into fortifications through precision threat detection and automated incident response'

  const setupScene = (scene: THREE.Scene) => {
    // Create particle system
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 1500
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50
      positions[i + 1] = (Math.random() - 0.5) * 50
      positions[i + 2] = (Math.random() - 0.5) * 50

      velocities[i] = (Math.random() - 0.5) * 0.1
      velocities[i + 1] = (Math.random() - 0.5) * 0.1
      velocities[i + 2] = (Math.random() - 0.5) * 0.1
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ff9d,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.position.z = -10
    scene.add(particles)
    particlesRef.current = particles

    // Create floating cubes/boxes
    const group = new THREE.Group()
    textMeshRef.current = group

    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const colors = [0x00ff9d, 0x00e1ff, 0xff6b9d]

    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: colors[i],
        metalness: 0.7,
        roughness: 0.2,
        emissive: colors[i],
        emissiveIntensity: 0.3,
      })

      const box = new THREE.Mesh(boxGeometry, material)
      box.castShadow = true
      box.receiveShadow = true
      box.position.x = (i - 1) * 4
      box.position.y = Math.sin(i) * 2

      gsap.to(box.position, {
        y: Math.sin(i) * 2 + 0.5,
        duration: 2 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(box.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 4 + i,
        repeat: -1,
        ease: 'none',
      })

      group.add(box)
    }

    group.position.z = -5
    scene.add(group)

    // Animation loop
    const animateParticles = () => {
      const positions = particleGeometry.getAttribute('position').array as Float32Array
      const velocities = particleGeometry.getAttribute('velocity').array as Float32Array

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]

        if (Math.abs(positions[i]) > 25) velocities[i] *= -1
        if (Math.abs(positions[i + 1]) > 25) velocities[i + 1] *= -1
        if (Math.abs(positions[i + 2]) > 25) velocities[i + 2] *= -1
      }

      particleGeometry.getAttribute('position').needsUpdate = true
    }

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      animateParticles()

      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0001
        particlesRef.current.rotation.y += 0.0002
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }

  // Typing animation
  useEffect(() => {
    // Name typing
    let nameIndex = 0
    const nameInterval = setInterval(() => {
      if (nameIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, nameIndex))
        nameIndex++
      } else {
        clearInterval(nameInterval)
      }
    }, 150)

    return () => clearInterval(nameInterval)
  }, [])

  // Title typing (after name)
  useEffect(() => {
    if (displayedName.length === fullName.length) {
      let titleIndex = 0
      const titleInterval = setInterval(() => {
        if (titleIndex <= fullTitle.length) {
          setDisplayedTitle(fullTitle.slice(0, titleIndex))
          titleIndex++
        } else {
          clearInterval(titleInterval)
        }
      }, 80)

      return () => clearInterval(titleInterval)
    }
  }, [displayedName, fullName.length])

  // Description typing (after title)
  useEffect(() => {
    if (displayedTitle.length === fullTitle.length) {
      let descIndex = 0
      const descInterval = setInterval(() => {
        if (descIndex <= fullDesc.length) {
          setDisplayedDesc(fullDesc.slice(0, descIndex))
          descIndex++
        } else {
          clearInterval(descInterval)
        }
      }, 50)

      return () => clearInterval(descInterval)
    }
  }, [displayedTitle, fullTitle.length])

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="relative w-full" id="hero">
      <ThreeCanvas onSceneReady={setupScene} className="fixed top-0 left-0 -z-10" />

      {/* Content Overlay */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-cyber-green-dark dark:text-cyber-green font-mono text-sm md:text-lg tracking-widest uppercase mb-4 animate-fade-in-up [animation-delay:200ms]">
                Welcome to my portfolio
              </p>

              {/* Name with typing animation */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-sans mb-2 h-32 md:h-40 lg:h-48 flex items-center justify-center">
                <span className="bg-gradient-to-r from-cyber-green-dark via-cyber-blue-dark to-pink-500 dark:from-cyber-green dark:via-cyber-blue dark:to-pink-500 bg-clip-text text-transparent">
                  {displayedName}
                  <span className={`animate-pulse ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                </span>
              </h1>

              {/* Title with typing animation */}
              {displayedName.length === fullName.length && (
                <h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-4">
                  <span className="text-cyber-green-dark dark:text-cyber-green">{displayedTitle}</span>
                  {displayedTitle.length < fullTitle.length && (
                    <span className={`animate-pulse ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                  )}
                </h2>
              )}

              {/* Description with typing animation */}
              {displayedTitle.length === fullTitle.length && (
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-mono min-h-24 flex items-center justify-center">
                  {displayedDesc}
                  {displayedDesc.length < fullDesc.length && (
                    <span className={`animate-pulse ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                  )}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            {displayedDesc.length === fullDesc.length && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
                <a
                  href="#skills"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="group relative px-8 py-3 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black font-bold font-mono rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(0,163,101,0.5)] dark:hover:shadow-[0_0_20px_#00ff9d] transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:scale-105 cursor-pointer"
                >
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                  <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                    Explore Projects
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a
                  href="https://github.com/0xRafuSec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-3 border border-cyber-blue-dark dark:border-cyber-blue text-cyber-blue-dark dark:text-cyber-blue font-bold font-mono rounded-sm overflow-hidden hover:bg-cyber-blue-dark/5 dark:hover:bg-cyber-blue/10 transition-all duration-300 flex items-center gap-2 skew-x-[-10deg] hover:shadow-[0_0_10px_rgba(0,150,170,0.3)] dark:hover:shadow-[0_0_10px_#00e1ff] hover:scale-105"
                >
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-cyber-blue-dark/10 dark:via-cyber-blue/20 to-transparent group-hover:animate-shimmer skew-x-[10deg]"></div>
                  <span className="skew-x-[10deg] flex items-center gap-2 relative z-10">
                    <Github size={18} />
                    GitHub
                  </span>
                </a>
              </div>
            )}

            {/* Social Links */}
            {displayedDesc.length === fullDesc.length && (
              <div className="flex justify-center gap-6 text-gray-500 dark:text-cyber-muted animate-fade-in-up">
                <a
                  href="https://github.com/0xRafuSec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/muhammadrafayali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors hover:scale-110 transform duration-200"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero3D
