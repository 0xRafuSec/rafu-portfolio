import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { Terminal as TerminalIcon, Copy, Loader } from 'lucide-react';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: "Welcome to Rafay's Portfolio Terminal. Type 'help' to begin." },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll logic: Scroll the container, not the window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isProcessing]);

  const fileSystem: Record<string, string[]> = {
    '~': ['projects/', 'docs/', 'tools/', 'about.txt', 'contact.txt'],
    '~/projects': ['AD_Attack_Sim/', 'IoT_Detection/', 'Compliance_Mapper/'],
    '~/docs': ['resume.pdf', 'certifications.pdf'],
    '~/tools': ['nmap_scanner.py', 'hash_cracker.py', 'payload_gen.sh']
  };

  const addToHistory = (line: TerminalLine) => {
    setHistory(prev => [...prev, line]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCommand = async (cmd: string) => {
    if (isProcessing) return;
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const args = trimmedCmd.split(' ');
    const command = args[0].toLowerCase();
    const target = args[1];

    addToHistory({ type: 'input', content: `guest@rafay-portfolio:${currentDir}$ ${cmd}` });
    setInput('');
    setIsProcessing(true);

    // Simulate processing time for realism
    setTimeout(() => {
      processCommand(command, target, args);
      setIsProcessing(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }, 400);
  };

  const processCommand = (command: string, target: string, args: string[]) => {
     switch (command) {
      case 'help':
        addToHistory({ type: 'output', content: `Available commands:
  help            Show this help message
  whoami          Display user info
  ls [dir]        List directory contents
  cd <dir>        Change directory
  pwd             Print working directory
  cat <file>      Read a file
  ping <host>     Simulate network ping
  ssh <host>      Attempt SSH connection
  history         Show command history
  download <file> Download a file
  clear           Clear the terminal` });
        break;

      case 'whoami':
        addToHistory({ type: 'output', content: 'Visitor\nAccess Level: Public\nLocation: Internet' });
        break;

      case 'pwd':
        addToHistory({ type: 'output', content: `/home/guest/${currentDir.replace('~', '')}` });
        break;

      case 'history':
        addToHistory({ type: 'output', content: commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n') });
        break;

      case 'ls':
        const dirToList = target ? (target === '~' ? '~' : `${currentDir}/${target}`.replace('//', '/')) : currentDir;
        // Simple mock implementation for listing other dirs if they exist in our mock FS keys
        // Logic simplified: only list current or explicitly matched keys
        let contents = '';
        if (target && fileSystem[target]) {
           contents = fileSystem[target].join('  ');
        } else if (fileSystem[currentDir]) {
           contents = fileSystem[currentDir].join('  ');
        } else {
           contents = '';
        }
        
        if (target && !fileSystem[target] && target !== '~' && !target.startsWith('/')) {
             // Try relative path
             const relativePath = `${currentDir}/${target}`.replace('~/', '');
             const fullKey = `~/${relativePath}`;
             if(fileSystem[fullKey]) {
                 contents = fileSystem[fullKey].join('  ');
             } else {
                 addToHistory({ type: 'error', content: `ls: cannot access '${target}': No such file or directory` });
                 return;
             }
        }
        addToHistory({ type: 'output', content: contents });
        break;

      case 'cd':
        if (!target || target === '~') {
            setCurrentDir('~');
        } else if (target === '..') {
            if (currentDir !== '~') {
                const parts = currentDir.split('/');
                parts.pop();
                setCurrentDir(parts.join('/') || '~');
            }
        } else if (target === '/') {
             addToHistory({ type: 'error', content: `Permission denied: Root access required.` });
        } else {
            // Check relative path
            const potentialPath = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`;
            // Clean up path
             const validDirs = Object.keys(fileSystem);
             if (validDirs.includes(potentialPath)) {
                 setCurrentDir(potentialPath);
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
        } else if (target && fileSystem[currentDir]?.includes(target)) {
            if (target.endsWith('.pdf') || target.endsWith('.py') || target.endsWith('.sh')) {
                 addToHistory({ type: 'output', content: `[Binary file or protected content: ${target}]` });
            } else {
                 addToHistory({ type: 'error', content: `cat: ${target}: Is a directory` });
            }
        } else {
            addToHistory({ type: 'error', content: `File not found: ${target || ''}` });
        }
        break;

      case 'ping':
        if (!target) {
            addToHistory({ type: 'error', content: 'Usage: ping <host>' });
            break;
        }
        setIsProcessing(true); // Keep processing true for async
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

      default:
        addToHistory({ type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` });
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const quickCommands = ['help', 'ls', 'whoami', 'pwd', 'clear'];

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
          <div key={i} className="group relative mb-1">
             <div className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'input' ? 'text-gray-800 dark:text-white font-bold mt-4' : 
              line.type === 'error' ? 'text-red-600 dark:text-red-400' : 
              line.type === 'success' ? 'text-green-600 dark:text-green-400' :
              'text-gray-600 dark:text-cyber-green'
            }`}>
              {line.content}
            </div>
            {line.type === 'output' && (
              <button 
                onClick={(e) => { e.stopPropagation(); copyToClipboard(line.content); }}
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 p-1 bg-gray-200 dark:bg-gray-800 rounded text-gray-500 hover:text-cyber-green transition-all"
                title="Copy Output"
              >
                <Copy size={12} />
              </button>
            )}
          </div>
        ))}

        {isProcessing && (
           <div className="flex items-center gap-2 text-cyber-green mt-2 animate-pulse">
              <Loader size={14} className="animate-spin" />
              <span>Processing...</span>
           </div>
        )}
        
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