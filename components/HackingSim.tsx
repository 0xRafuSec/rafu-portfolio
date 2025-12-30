import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Activity, Terminal } from 'lucide-react';

const HackingSim: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ vulns: 0, exploits: 0, defenses: 0 });
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (!isRunning) return;

    // More realistic phases
    const phases = [
      { name: 'INIT', msg: 'Initializing Metasploit Framework...', duration: 1500 },
      { name: 'RECON', msg: 'Starting Nmap 7.94 scan on 10.10.11.24...', duration: 2000 },
      { name: 'DISCOVERY', msg: 'PORT 80/TCP OPEN (HTTP) | PORT 445/TCP OPEN (SMB)', duration: 1000 },
      { name: 'ENUM', msg: 'Enumerating SMB shares... Found: \\\\BACKUP', duration: 2000 },
      { name: 'VULN', msg: '[+] Target appears vulnerable to MS17-010 (EternalBlue)', duration: 1500 },
      { name: 'EXPLOIT', msg: 'Sending stage (203456 bytes) to 10.10.11.24', duration: 3000 },
      { name: 'SESSION', msg: 'Meterpreter session 1 opened (10.10.14.5:4444 -> 10.10.11.24:49321)', duration: 2000 },
      { name: 'PRIVESC', msg: 'Running local exploit suggester... potential match found', duration: 2500 },
      { name: 'ROOT', msg: 'NT AUTHORITY\\SYSTEM access granted', duration: 1500 },
      { name: 'PERSIST', msg: 'Establishing persistence via Registry Run keys', duration: 2000 },
      { name: 'CLEANUP', msg: 'Wiping Event Logs (Security, System, Application)', duration: 2000 }
    ];

    let currentPhase = 0;
    let phaseTime = 0;
    const totalTime = phases.reduce((acc, p) => acc + p.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / totalTime) * 100, 100));

      if (currentPhase < phases.length) {
        if (phaseTime === 0) {
           const timestamp = new Date().toLocaleTimeString('en-US', {hour12: false});
           setLogs(prev => [...prev, `[${timestamp}] [*] ${phases[currentPhase].msg}`]);
           
           // Logic to update stats based on specific phases
           if (phases[currentPhase].name === 'VULN') setStats(p => ({ ...p, vulns: p.vulns + 1 }));
           if (phases[currentPhase].name === 'SESSION') setStats(p => ({ ...p, exploits: p.exploits + 1 }));
        }
        
        phaseTime += 100;

        // Random stylized hex dumps or sub-events
        if (Math.random() > 0.85 && currentPhase > 1) {
             const hex = Array.from({length: 4}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0')).join(' ');
             setLogs(prev => [...prev, `    > 00000000  ${hex}  ....`]);
        }

        if (phaseTime >= phases[currentPhase].duration) {
          currentPhase++;
          phaseTime = 0;
        }
      } else {
        setIsRunning(false);
        setLogs(prev => [...prev, `[+] ATTACK SIMULATION COMPLETED.`]);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggle = () => {
    if (isRunning) {
        setIsRunning(false);
        setLogs(prev => [...prev, `[!] Exploit interrupted by user.`]);
    } else {
        setLogs([]);
        setProgress(0);
        setStats({ vulns: 0, exploits: 0, defenses: 0 });
        setIsRunning(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#111] rounded-xl border border-white/5 p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                <Activity className="text-cyber-green" />
                Attack <span className="text-cyber-blue">Chain Simulation</span>
            </h3>
            <button 
                onClick={handleToggle}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isRunning 
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
                    : 'bg-cyber-green/20 text-cyber-green hover:bg-cyber-green hover:text-black'
                }`}
            >
                {isRunning ? <Square size={20} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#1a1a1a] p-4 rounded-lg text-center border border-white/5">
                <div className="text-cyber-muted text-xs uppercase tracking-wider mb-1">Targets</div>
                <div className="text-2xl font-mono text-white">1</div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg text-center border border-white/5">
                <div className="text-cyber-muted text-xs uppercase tracking-wider mb-1">Vulns</div>
                <div className="text-2xl font-mono text-yellow-500">{stats.vulns}</div>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg text-center border border-white/5">
                <div className="text-cyber-muted text-xs uppercase tracking-wider mb-1">Shells</div>
                <div className="text-2xl font-mono text-red-500">{stats.exploits}</div>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden mb-6">
            <div 
                className="h-full bg-cyber-green shadow-[0_0_10px_#00ff88] transition-all duration-100"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Console */}
        <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 font-mono">msfconsole - exploit(multi/handler)</span>
            </div>
            <div 
                ref={logContainerRef}
                className="h-64 p-4 font-mono text-sm overflow-y-auto"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
                {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-cyber-muted opacity-50">
                        <span className="text-4xl mb-2">⚡</span>
                        <span>Ready to launch attack simulation</span>
                    </div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className={`mb-1 ${
                            log.includes('[+]') ? 'text-green-400' :
                            log.includes('[!]') ? 'text-red-400' :
                            log.includes('[*]') ? 'text-blue-400' :
                            'text-gray-400'
                        }`}>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
        <p className="text-xs text-center text-cyber-muted mt-4 opacity-60">
            * Simulated attack chain for educational demonstration.
        </p>
    </div>
  );
};

export default HackingSim;