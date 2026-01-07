'use client'

import { useState, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, Copy } from 'lucide-react'

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success'
  content: string
}

export default function Terminal3D() {
  const [output, setOutput] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to 0xRafuSec Terminal v2.0' },
    { type: 'output', content: '==================================' },
    { type: 'output', content: 'Type "help" for available commands' },
    { type: 'output', content: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const fileSystem: Record<string, string> = {
    'about.txt': 'Muhammad Rafay Ali\nCyber Security Engineer\n0xRafuSec\nSpecializations: Threat Hunting, SIEM Engineering, ISO 27001 Compliance',
    'contact.txt': 'Email: rafay.arshad1@outlook.com\nGitHub: https://github.com/0xRafuSec\nLinkedIn: https://linkedin.com/in/muhammadrafayali',
    'skills.txt': 'SIEM & SOC: Wazuh, QRadar, Threat Hawk\nOffensive: Kali Linux, Burp Suite, Metasploit\nOS & Cloud: Windows, Linux, Azure\nGovernance: ISO 27001, NCA-ECC, SAMA\nAutomation: Python, Bash, PowerShell',
    'projects.txt': '1. Active Directory Attack Simulation & Hardening\n   https://github.com/0xRafuSec/Active-Directory-Attack-Simulation-and-Hardening-Lab\n\n2. Multi-Sensor Intrusion Detection IoT\n   https://github.com/0xRafuSec/Multi-Sensor-Intrusion-Detection-IOT',
  }

  const commands: Record<string, (args?: string) => string> = {
    help: () => `Available commands:
  whoami      - Display current user information
  pwd         - Print working directory
  ls          - List directory contents
  cd [dir]    - Change directory
  cat [file]  - Display file contents
  ping [host] - Ping a host
  ssh [host]  - SSH connection attempt
  download    - Download resume/CV
  history     - Show command history
  clear       - Clear terminal screen
  exit        - Exit terminal`,

    whoami: () => 'rafay@portfolio:~$ Muhammad Rafay Ali | Cyber Security Engineer',

    pwd: () => 'rafay@portfolio:~$ /home/rafay/portfolio',

    ls: (args?: string) => {
      if (!args || args === '~' || args === '/home/rafay/portfolio') {
        return 'about.txt    contact.txt    skills.txt    projects.txt'
      }
      return `bash: ls: ${args}: No such file or directory`
    },

    cd: (args?: string) => {
      if (!args) return 'bash: cd: missing argument'
      if (args === '..' || args === '~') return 'rafay@portfolio:~$'
      return `bash: cd: ${args}: No such file or directory`
    },

    cat: (args?: string) => {
      if (!args) return 'bash: cat: missing argument'
      const file = fileSystem[args]
      if (file) return file
      return `bash: cat: ${args}: No such file or directory`
    },

    ping: (args?: string) => {
      if (!args) return 'bash: ping: missing host'
      const responses = [
        `PING ${args} (192.168.1.100): 56 data bytes`,
        `64 bytes from 192.168.1.100: icmp_seq=0 ttl=64 time=4.532 ms`,
        `64 bytes from 192.168.1.100: icmp_seq=1 ttl=64 time=5.241 ms`,
        `64 bytes from 192.168.1.100: icmp_seq=2 ttl=64 time=4.891 ms`,
        `--- ${args} statistics ---`,
        `3 packets transmitted, 3 packets received, 0.0% packet loss`,
        `round-trip min/avg/max/stddev = 4.532/4.888/5.241/0.295 ms`,
      ]
      return responses.join('\n')
    },

    ssh: (args?: string) => {
      if (!args) return 'bash: ssh: missing host'
      return `SSH Connection to ${args}...\n[!] Connection Refused - Server not reachable\n[*] Authentication Failed`
    },

    download: () =>
      '[↓] Downloading resume...\n[████████████████████] 100%\n[✓] Resume downloaded successfully!\nCheck your downloads folder.',

    history: () => history.join('\n') || 'No command history',

    clear: () => '',

    exit: () => 'Session terminated.',
  }

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()

    if (!trimmed) return

    // Add to history
    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    // Display input
    setOutput((prev) => [...prev, { type: 'input', content: `$ ${cmd}` }])

    // Process command
    if (trimmed === 'clear') {
      setOutput([])
      setInput('')
      return
    }

    const [cmdName, ...args] = trimmed.split(' ')
    const cmdFunc = commands[cmdName.toLowerCase()]

    if (cmdFunc) {
      const result = cmdFunc(args.join(' '))
      if (result) {
        const type =
          result.includes('error') || result.includes('failed') || result.includes('Error')
            ? 'error'
            : result.includes('✓') || result.includes('successfully')
              ? 'success'
              : 'output'
        setOutput((prev) => [...prev, { type, content: result }])
      }
    } else {
      setOutput((prev) => [...prev, { type: 'error', content: `bash: command not found: ${cmdName}` }])
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <section id="terminal" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-20">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans flex items-center gap-3">
            <TerminalIcon className="w-10 h-10 text-cyber-green" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-green-light">
              Interactive Terminal
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore my portfolio through a cybersecurity-themed terminal interface
          </p>
        </div>

        {/* Terminal Container */}
        <div className="bg-black rounded-xl border border-cyber-green/30 shadow-2xl shadow-cyber-green/20 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-900 border-b border-cyber-green/20 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="flex-1 text-center text-cyber-green font-mono text-sm">0xRafuSec ~ Portfolio Terminal</span>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="bg-black p-6 font-mono text-sm h-96 overflow-y-auto scrollbar-hide text-gray-100"
          >
            {output.map((line, idx) => (
              <div
                key={idx}
                className={`mb-1 whitespace-pre-wrap break-words ${
                  line.type === 'input'
                    ? 'text-cyber-green font-bold'
                    : line.type === 'error'
                      ? 'text-red-400'
                      : line.type === 'success'
                        ? 'text-green-400'
                        : 'text-gray-300'
                }`}
              >
                {line.content}
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center gap-2">
              <span className="text-cyber-green font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-black border-none outline-none text-cyber-green font-bold flex-1 caret-cyber-green"
                placeholder="Type a command..."
                autoComplete="off"
              />
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="bg-gray-900 border-t border-cyber-green/20 px-4 py-3 flex items-center justify-between text-xs text-gray-400">
            <span>Press ↑↓ for history | Type "help" for commands</span>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  const text = output.map((l) => l.content).join('\n')
                  navigator.clipboard.writeText(text)
                }
              }}
              className="hover:text-cyber-green transition-colors flex items-center gap-1"
            >
              <Copy size={14} />
              Copy Output
            </button>
          </div>
        </div>

        {/* Quick tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-cyber-green font-bold mb-2">Quick Commands</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• <span className="text-white">whoami</span> - About me</li>
              <li>• <span className="text-white">skills</span> - Technical abilities</li>
              <li>• <span className="text-white">projects</span> - Portfolio projects</li>
              <li>• <span className="text-white">contact</span> - Get in touch</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h3 className="text-cyber-green font-bold mb-2">File System</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• <span className="text-white">ls</span> - List files</li>
              <li>• <span className="text-white">cat [file]</span> - View file</li>
              <li>• <span className="text-white">download</span> - Get resume</li>
              <li>• <span className="text-white">history</span> - Command history</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
