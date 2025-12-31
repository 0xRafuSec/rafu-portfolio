import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: "Welcome to Rafay's Portfolio Terminal. Type 'help' to begin." },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logic: Scroll the container, not the window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const fileSystem: Record<string, string[]> = {
    '~': ['projects/', 'docs/', 'tools/', 'about.txt', 'contact.txt'],
    '~/projects': ['AD_Attack_Sim/', 'IoT_Detection/', 'Compliance_Mapper/'],
    '~/docs': ['resume.pdf', 'certifications.pdf'],
    '~/tools': ['nmap_scanner.py', 'hash_cracker.py', 'payload_gen.sh']
  };

  const addToHistory = (line: TerminalLine) => {
    setHistory(prev => [...prev, line]);
  };

  const handleCommand = async (cmd: string) => {
    if (isProcessing) return;

    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const target = args[1];

    addToHistory({ type: 'input', content: `guest@rafay-portfolio:${currentDir}$ ${cmd}` });
    setInput('');

    // Keep focus on input
    setTimeout(() => inputRef.current?.focus(), 10);

    switch (command) {
      case 'help':
        addToHistory({ type: 'output', content: `Available commands:
  help            Show this help message
  whoami          Display user info
  ls              List directory contents
  cd <dir>        Change directory
  cat <file>      Read a file
  ping <host>     Simulate network ping
  ssh <host>      Attempt SSH connection
  download <file> Download a file
  clear           Clear the terminal` });
        break;

      case 'whoami':
        addToHistory({ type: 'output', content: 'Visitor\nAccess Level: Public\nLocation: Internet' });
        break;

      case 'ls':
        const contents = fileSystem[currentDir] ? fileSystem[currentDir].join('  ') : '';
        addToHistory({ type: 'output', content: contents });
        break;

      case 'cd':
        if (!target) {
            setCurrentDir('~');
        } else if (target === '..') {
            if (currentDir !== '~') {
                // Simple logic to go back one level
                setCurrentDir('~');
            }
        } else if (target === '/') {
             addToHistory({ type: 'error', content: `Permission denied: Root access required.` });
        } else {
            const availableDirs = fileSystem[currentDir]
                .filter(item => item.endsWith('/'))
                .map(item => item.slice(0, -1));
            
            if (availableDirs.includes(target)) {
                setCurrentDir(`${currentDir}/${target}`);
            } else {
                 addToHistory({ type: 'error', content: `cd: no such file or directory: ${target}` });
            }
        }
        break;

      case 'cat':
        if (target === 'about.txt' && currentDir === '~') {
            addToHistory({ type: 'output', content: 'Cyber Security Engineer with expertise in SOC, SIEM, and Threat Hunting.' });
        } else if (target === 'contact.txt' && currentDir === '~') {
            addToHistory({ type: 'output', content: 'Email: rafay.arshad1@outlook.com\nPhone: +92 300 9817 567' });
        } else if (target && currentDir !== '~' && fileSystem[currentDir]?.includes(target)) {
            addToHistory({ type: 'output', content: `[Binary file or protected content: ${target}]` });
        } else {
            addToHistory({ type: 'error', content: `File not found: ${target || ''}` });
        }
        break;

      case 'ping':
        if (!target) {
            addToHistory({ type: 'error', content: 'Usage: ping <host>' });
            break;
        }
        setIsProcessing(true);
        addToHistory({ type: 'output', content: `Pinging ${target} [192.168.1.10] with 32 bytes of data:` });
        
        let count = 0;
        const pingInterval = setInterval(() => {
            count++;
            if (count <= 4) {
                const time = Math.floor(Math.random() * 50) + 10;
                addToHistory({ type: 'output', content: `Reply from 192.168.1.10: bytes=32 time=${time}ms TTL=64` });
            } else {
                clearInterval(pingInterval);
                addToHistory({ type: 'output', content: `\nPing statistics for 192.168.1.10:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)` });
                setIsProcessing(false);
                setTimeout(() => inputRef.current?.focus(), 10);
            }
        }, 800);
        break;

      case 'ssh':
        if (!target) {
            addToHistory({ type: 'error', content: 'Usage: ssh <user@host>' });
            break;
        }
        setIsProcessing(true);
        addToHistory({ type: 'output', content: `OpenSSH_8.9p1 Ubuntu-3ubuntu0.6, OpenSSL 3.0.2 15 Mar 2022` });
        setTimeout(() => {
            addToHistory({ type: 'output', content: `${target}'s password: ` });
            setTimeout(() => {
                addToHistory({ type: 'error', content: `Permission denied (publickey,password).` });
                setIsProcessing(false);
                setTimeout(() => inputRef.current?.focus(), 10);
            }, 1500);
        }, 800);
        break;

      case 'download':
        if (!target) {
             addToHistory({ type: 'error', content: 'Usage: download <file>' });
             break;
        }
        if (fileSystem[currentDir]?.includes(target)) {
            setIsProcessing(true);
            addToHistory({ type: 'output', content: `Initiating download of ${target}...` });
            let progress = 0;
            const dlInterval = setInterval(() => {
                progress += 20;
                const bar = '='.repeat(progress / 5) + '>'.padEnd(20 - (progress/5), ' ');
                if (progress >= 100) {
                     clearInterval(dlInterval);
                     addToHistory({ type: 'success', content: `[====================] 100% Complete.\nSaved to /local/downloads/${target}` });
                     setIsProcessing(false);
                     setTimeout(() => inputRef.current?.focus(), 10);
                }
            }, 500);
        } else {
             addToHistory({ type: 'error', content: `File not found: ${target}` });
        }
        break;

      case 'clear':
        setHistory([{ type: 'output', content: "Terminal cleared." }]);
        break;

      case '':
        break;

      default:
        addToHistory({ type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const quickCommands = ['help', 'ls', 'whoami', 'ping 8.8.8.8'];

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-sm shadow-[0_0_50px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden border border-gray-200 dark:border-[#333] backdrop-blur-sm bg-white/95 dark:bg-black/80">
      <div className="flex items-center justify-between bg-gray-100/90 dark:bg-[#1a1a1a]/90 px-4 py-2 border-b border-gray-200 dark:border-[#333]">
        <div className="flex items-center gap-2">
           <TerminalIcon size={14} className="text-gray-500 dark:text-gray-400"/>
           <span className="text-gray-600 dark:text-gray-400 text-xs">guest@rafay-portfolio:~</span>
        </div>
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
           <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="p-4 h-96 overflow-y-auto" 
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap leading-relaxed ${
            line.type === 'input' ? 'text-gray-800 dark:text-white' : 
            line.type === 'error' ? 'text-red-600 dark:text-red-400' : 
            line.type === 'success' ? 'text-green-600 dark:text-green-400' :
            'text-gray-600 dark:text-cyber-green'
          }`}>
            {line.content}
          </div>
        ))}
        
        {!isProcessing && (
            <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-600 dark:text-cyber-blue whitespace-nowrap font-bold">guest@rafay-portfolio:{currentDir}$</span>
            <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-gray-800 dark:text-white min-w-[50px] caret-cyber-green-dark dark:caret-cyber-green"
                autoFocus
                autoComplete="off"
            />
            </div>
        )}
      </div>

      <div className="bg-gray-50/90 dark:bg-[#111]/90 p-3 flex flex-wrap gap-2 justify-center border-t border-gray-200 dark:border-[#333]">
        {quickCommands.map(cmd => (
          <button 
            key={cmd}
            onClick={() => handleCommand(cmd)}
            disabled={isProcessing}
            className="px-3 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded hover:border-cyber-green-dark dark:hover:border-cyber-green hover:text-cyber-green-dark dark:hover:text-cyber-green text-xs text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;