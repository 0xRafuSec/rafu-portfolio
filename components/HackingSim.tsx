import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Activity, Terminal, ShieldAlert, Globe, Lock } from 'lucide-react';

const HackingSim: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ vulns: 0, exploits: 0, alerts: 0 });
  const [currentAction, setCurrentAction] = useState('IDLE');
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const generateRandomIP = () => {
      return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const phases = [
      { name: 'INIT', msg: 'Initializing Metasploit Framework...', duration: 1000 },
      { name: 'SCAN', msg: 'Initiating global IP sweep...', duration: 2000 },
      { name: 'TARGET', msg: `Target identified: ${generateRandomIP()}`, duration: 1000 },
      { name: 'PORTS', msg: 'Scanning ports... [21, 22, 80, 443, 3389]', duration: 1500 },
      { name: 'SERVICE', msg: 'Service detection: Apache 2.4.49 (VULNERABLE)', duration: 1000 },
      { name: 'FIREWALL', msg: '[!] IDS Alert: Signature match detected', duration: 800 },
      { name: 'BYPASS', msg: 'Attempting firewall evasion via fragmentation...', duration: 2000 },
      { name: 'EXPLOIT', msg: 'Deploying payload: linux/x64/meterpreter/reverse_tcp', duration: 2500 },
      { name: 'SHELL', msg: 'Meterpreter session opened successfully', duration: 1000 },
      { name: 'PRIVESC', msg: 'Escalating privileges to ROOT...', duration: 2000 },
      { name: 'DATA', msg: 'Exfiltrating /etc/shadow hashes...', duration: 1500 },
      { name: 'CLEANUP', msg: 'Clearing system logs and bash history', duration: 1500 }
    ];

    let currentPhase = 0;
    let phaseTime = 0;
    const totalTime = phases.reduce((acc, p) => acc + p.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / totalTime) * 100, 100));

      // Random background noise
      if (Math.random() > 0.9) {
          const randomPort = Math.floor(Math.random() * 65535);
          setLogs(prev => [...prev, `[VERBOSE] Port ${randomPort} filtered`]);
      }

      if (currentPhase < phases.length) {
        if (phaseTime === 0) {
           const timestamp = new Date().toLocaleTimeString('en-US', {hour12: false});
           setLogs(prev => [...prev, `[${timestamp}] [*] ${phases[currentPhase].msg}`]);
           setCurrentAction(phases[currentPhase].name);

           // Stat updates
           if (phases[currentPhase].name === 'SERVICE') setStats(p => ({ ...p, vulns: p.vulns + 1 }));
           if (phases[currentPhase].name === 'FIREWALL') setStats(p => ({ ...p, alerts: p.alerts + 1 }));
           if (phases[currentPhase].name === 'SHELL') setStats(p => ({ ...p, exploits: p.exploits + 1 }));
        }
        
        phaseTime += 100;

        // Visual effects for specific phases
        if (phases[currentPhase].name === 'DATA' && Math.random() > 0.7) {
             const hex = Array.from({length: 8}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0')).join(' ');
             setLogs(prev => [...prev, `    DUMP: ${hex} ...`]);
        }

        if (phaseTime >= phases[currentPhase].duration) {
          currentPhase++;
          phaseTime = 0;
        }
      } else {
        setIsRunning(false);
        setLogs(prev => [...prev, `[+] OPERATION COMPLETE. DISCONNECTING.`]);
        setCurrentAction('DONE');
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggle = () => {
    if (isRunning) {
        setIsRunning(false);
        setLogs(prev => [...prev, `[!] Aborted by user.`]);
        setCurrentAction('ABORTED');
    } else {
        setLogs([]);
        setProgress(0);
        setStats({ vulns: 0, exploits: 0, alerts: 0 });
        setIsRunning(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-white/5 p-6 md:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity className="text-cyber-green" />
                Live <span className="text-cyber-blue">Threat Simulation</span>
            </h3>
            <div className="flex items-center gap-4">
                <span className={`text-xs font-mono px-2 py-1 rounded ${isRunning ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>
                    {isRunning ? 'ACTIVE' : 'IDLE'}
                </span>
                <button 
                    onClick={handleToggle}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                        isRunning 
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                        : 'bg-cyber-green hover:bg-emerald-400 text-black shadow-lg shadow-cyber-green/30'
                    }`}
                >
                    {isRunning ? <Square size={16} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-4 rounded-lg text-center border border-gray-200 dark:border-white/5">
                <div className="text-gray-500 dark:text-cyber-muted text-[10px] md:text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><Lock size={10}/> Vulns</div>
                <div className="text-xl md:text-2xl font-mono text-yellow-600 dark:text-yellow-500">{stats.vulns}</div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-4 rounded-lg text-center border border-gray-200 dark:border-white/5">
                <div className="text-gray-500 dark:text-cyber-muted text-[10px] md:text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><ShieldAlert size={10}/> Alerts</div>
                <div className="text-xl md:text-2xl font-mono text-orange-600 dark:text-orange-500">{stats.alerts}</div>
            </div>
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-4 rounded-lg text-center border border-gray-200 dark:border-white/5">
                <div className="text-gray-500 dark:text-cyber-muted text-[10px] md:text-xs uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><Globe size={10}/> Exploits</div>
                <div className="text-xl md:text-2xl font-mono text-red-600 dark:text-red-500">{stats.exploits}</div>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden mb-6">
            <div 
                className="absolute top-0 left-0 h-full bg-cyber-green shadow-[0_0_10px_#00ff88] transition-all duration-100"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Console */}
        <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-white/10 bg-gray-900 dark:bg-[#0a0a0a] shadow-inner">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-[#1a1a1a] border-b border-gray-700 dark:border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-300 font-mono">automated_threat_sim.exe</span>
                </div>
                <span className="text-xs font-mono text-cyber-blue">{currentAction}</span>
            </div>
            <div 
                ref={logContainerRef}
                className="h-64 p-4 font-mono text-xs md:text-sm overflow-y-auto"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
                {logs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-cyber-muted opacity-50">
                        <Activity className="mb-2 animate-pulse" size={32} />
                        <span>Ready to launch attack simulation</span>
                    </div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className={`mb-1 break-all ${
                            log.includes('[+]') ? 'text-green-400' :
                            log.includes('[!]') ? 'text-red-400 font-bold' :
                            log.includes('[*]') ? 'text-blue-400' :
                            log.includes('VERBOSE') ? 'text-gray-600' :
                            'text-gray-400'
                        }`}>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-cyber-muted mt-4 opacity-60">
            * Simulated attack chain for educational demonstration.
        </p>
    </div>
  );
};

export default HackingSim;