'use client'

import React, { useState } from 'react'
import { Play, Square, RotateCcw, Zap } from 'lucide-react'

interface AttackPhase {
  phase: string
  message: string
  duration: number
}

export default function HackingSim() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [logs, setLogs] = useState<string[]>([
    '[*] Hacking Simulation v3.1 - Educational Purpose Only',
    '[*] Initialize metasploit framework...',
    '',
  ])
  const [vulns, setVulns] = useState(0)
  const [alerts, setAlerts] = useState(0)
  const [exploits, setExploits] = useState(0)
  const [progress, setProgress] = useState(0)

  const phases: AttackPhase[] = [
    { phase: 'INIT', message: '[*] Initializing Metasploit Framework...', duration: 1000 },
    { phase: 'SCAN', message: '[*] Initiating global IP sweep... [████░░░░░░]', duration: 2000 },
    { phase: 'TARGET', message: '[+] Target identified: 192.168.1.105 | Server: Apache/2.4.49', duration: 1000 },
    { phase: 'PORTS', message: '[*] Scanning ports [21, 22, 80, 443, 3389, 8080]... [██████░░░░]', duration: 1500 },
    { phase: 'SERVICE', message: '[!] Apache 2.4.49 (VULNERABLE - CVE-2021-41773) detected on port 80', duration: 1000 },
    { phase: 'FIREWALL', message: '[!] IDS Alert: Signature match detected | Firewall Rules: BLOCK_INBOUND', duration: 800 },
    { phase: 'BYPASS', message: '[*] Attempting firewall evasion... WAF bypass technique (SQL-i) [████████░░]', duration: 2000 },
    { phase: 'EXPLOIT', message: '[+] Deploying payload: linux/x64/meterpreter/reverse_tcp [██████████]', duration: 2500 },
    { phase: 'SHELL', message: '[✓] Meterpreter session opened successfully | Pid: 4824', duration: 1000 },
    { phase: 'PRIVESC', message: '[*] Escalating privileges to ROOT... [████████░░] CVE-2021-3156', duration: 2000 },
    { phase: 'DATA', message: '[+] Exfiltrating /etc/shadow hashes... [████████░░] 2.4MB transferred', duration: 1500 },
    { phase: 'CLEANUP', message: '[*] Clearing system logs and bash history... [██████████] Complete', duration: 1500 },
  ]

  const runSimulation = async () => {
    setIsRunning(true)
    setCurrentPhase(0)
    setLogs(['[*] Hacking Simulation v3.1 - Educational Purpose Only', '[*] Initialize metasploit framework...', ''])
    setVulns(0)
    setAlerts(0)
    setExploits(0)
    setProgress(0)

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(i)
      const phase = phases[i]

      // Add phase message to logs
      setLogs((prev) => [...prev, phase.message])

      // Update stats based on phase
      if (phase.phase === 'SERVICE') {
        setVulns((prev) => prev + 1)
      } else if (phase.phase === 'FIREWALL') {
        setAlerts((prev) => prev + 1)
      } else if (phase.phase === 'EXPLOIT' || phase.phase === 'SHELL') {
        setExploits((prev) => prev + 1)
      }

      // Update progress
      setProgress(((i + 1) / phases.length) * 100)

      // Wait for phase duration
      await new Promise((resolve) => setTimeout(resolve, phase.duration))
    }

    // Final message
    setLogs((prev) => [
      ...prev,
      '',
      '[✓] Simulation complete! All phases executed successfully.',
      '[*] Statistics: 3 Vulnerabilities exploited | 1 IDS Alert triggered | 2 Exploits successful',
      '[!] This simulation is for educational purposes only.',
    ])

    setIsRunning(false)
  }

  const stopSimulation = () => {
    setIsRunning(false)
    setLogs((prev) => [...prev, '', '[!] Simulation stopped by user'])
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentPhase(0)
    setLogs(['[*] Hacking Simulation v3.1 - Educational Purpose Only', '[*] Initialize metasploit framework...', ''])
    setVulns(0)
    setAlerts(0)
    setExploits(0)
    setProgress(0)
  }

  return (
    <section id="hacking-sim" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans flex items-center gap-3">
            <Zap className="w-10 h-10 text-red-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              Threat Simulation
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Educational 12-phase attack simulation demonstrating real-world threat patterns
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Stats */}
          <div className="bg-gradient-to-br from-black/40 to-black/60 border border-red-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Vulnerabilities</p>
            <p className="text-3xl font-bold text-red-500">{vulns}</p>
          </div>
          <div className="bg-gradient-to-br from-black/40 to-black/60 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">IDS Alerts</p>
            <p className="text-3xl font-bold text-yellow-500">{alerts}</p>
          </div>
          <div className="bg-gradient-to-br from-black/40 to-black/60 border border-green-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Exploits</p>
            <p className="text-3xl font-bold text-green-500">{exploits}</p>
          </div>
          <div className="bg-gradient-to-br from-black/40 to-black/60 border border-cyan-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Phase</p>
            <p className="text-3xl font-bold text-cyan-500">{currentPhase + 1}/12</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-gray-400">Attack Progress</span>
            <span className="text-sm font-mono text-cyan-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-mono font-bold rounded-lg transition-all"
          >
            <Play size={18} />
            Start Attack
          </button>
          <button
            onClick={stopSimulation}
            disabled={!isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-mono font-bold rounded-lg transition-all"
          >
            <Square size={18} />
            Stop
          </button>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-mono font-bold rounded-lg transition-all"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        {/* Console Output */}
        <div className="bg-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
          {/* Console Header */}
          <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="flex-1 text-center text-red-500 font-mono text-sm">~ Threat Simulation Console</span>
          </div>

          {/* Console Content */}
          <div className="p-6 font-mono text-sm h-96 overflow-y-auto scrollbar-hide text-gray-100 space-y-1">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap break-words ${
                  log.includes('[+]')
                    ? 'text-green-400'
                    : log.includes('[!]')
                      ? 'text-red-400'
                      : log.includes('[✓]')
                        ? 'text-cyan-400'
                        : 'text-gray-300'
                }`}
              >
                {log}
              </div>
            ))}

            {/* Blinking cursor when running */}
            {isRunning && (
              <div className="animate-pulse text-gray-500">
                █
              </div>
            )}
          </div>

          {/* Console Footer */}
          <div className="bg-gray-900 border-t border-gray-700 px-4 py-2 text-xs text-gray-500 flex justify-between">
            <span>12-phase attack sequence | Educational simulation only</span>
            <span>{isRunning ? 'Running...' : 'Idle'}</span>
          </div>
        </div>

        {/* Educational Note */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-400">
            ℹ️ <strong>Educational Purpose:</strong> This simulation demonstrates common attack patterns and exploitation techniques used in
            real-world threat modeling and penetration testing. It is designed for learning cybersecurity concepts only.
          </p>
        </div>

        {/* Attack Phases Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className={`p-3 rounded border font-mono text-xs transition-all ${
                currentPhase >= idx
                  ? 'bg-green-500/20 border-green-500/50 text-green-300'
                  : 'bg-gray-500/10 border-gray-500/20 text-gray-500'
              }`}
            >
              <span className="font-bold">{idx + 1}.</span> {phase.phase}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
