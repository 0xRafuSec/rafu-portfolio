import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: "Welcome to Rafay's Portfolio Terminal. Type 'help' to begin." },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const fileSystem: Record<string, string[]> = {
    '~': ['projects/', 'docs/', 'tools/', 'about.txt', 'contact.txt'],
    '~/projects': ['AD_Attack_Sim/', 'IoT_Detection/', 'Compliance_Mapper/'],
    '~/docs': ['resume.pdf', 'certifications.pdf'],
    '~/tools': ['nmap_scanner.py', 'hash_cracker.py', 'payload_gen.sh']
  };

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const target = args[1];

    const newHistory: TerminalLine[] = [...history, { type: 'input', content: `guest@rafay-portfolio:${currentDir}$ ${cmd}` }];

    switch (command) {
      case 'help':
        newHistory.push({ type: 'output', content: `Available commands:
  help          Show this help message
  whoami        Display user info
  ls            List directory contents
  cd <dir>      Change directory
  cat <file>    Read a file
  clear         Clear the terminal` });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', content: 'Visitor\nAccess Level: Public\nLocation: Internet' });
        break;
      case 'ls':
        const contents = fileSystem[currentDir] ? fileSystem[currentDir].join('  ') : '';
        newHistory.push({ type: 'output', content: contents });
        break;
      case 'cd':
        if (!target) {
            setCurrentDir('~');
        } else if (target === '..') {
            if (currentDir !== '~') {
                setCurrentDir('~');
            }
        } else if (target === '/') {
             newHistory.push({ type: 'error', content: `Permission denied: Root access required.` });
        } else {
            // Check if directory exists in current level
            const availableDirs = fileSystem[currentDir]
                .filter(item => item.endsWith('/'))
                .map(item => item.slice(0, -1)); // Remove trailing slash
            
            if (availableDirs.includes(target)) {
                setCurrentDir(`${currentDir}/${target}`);
            } else {
                 newHistory.push({ type: 'error', content: `cd: no such file or directory: ${target}` });
            }
        }
        break;
      case 'cat':
        if (target === 'about.txt' && currentDir === '~') {
            newHistory.push({ type: 'output', content: 'Cyber Security Engineer with expertise in SOC, SIEM, and Threat Hunting.' });
        } else if (target === 'contact.txt' && currentDir === '~') {
            newHistory.push({ type: 'output', content: 'Email: rafay.arshad1@outlook.com\nPhone: +92 300 9817 567' });
        } else if (target && currentDir !== '~' && fileSystem[currentDir].includes(target)) {
            newHistory.push({ type: 'output', content: `[Binary file or protected content: ${target}]` });
        } else {
            newHistory.push({ type: 'error', content: `File not found: ${target || ''}` });
        }
        break;
      case 'clear':
        setHistory([{ type: 'output', content: "Terminal cleared." }]);
        return;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const quickCommands = ['help', 'ls', 'cd projects', 'cd ..'];

  return (
    <div className="w-full max-w-3xl mx-auto font-mono text-sm shadow-2xl">
      <div className="flex items-center justify-between bg-[#1a1a1a] px-4 py-2 rounded-t-lg border-b border-[#333]">
        <div className="flex items-center gap-2">
           <TerminalIcon size={14} className="text-gray-400"/>
           <span className="text-gray-400 text-xs">guest@rafay-portfolio:~</span>
        </div>
        <div className="flex gap-2">
           <Minimize2 size={12} className="text-yellow-500 cursor-pointer"/>
           <Maximize2 size={12} className="text-green-500 cursor-pointer"/>
           <X size={12} className="text-red-500 cursor-pointer"/>
        </div>
      </div>
      
      <div className="bg-black/90 p-4 h-96 overflow-y-auto border-x border-b border-[#333] rounded-b-lg">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${
            line.type === 'input' ? 'text-white' : 
            line.type === 'error' ? 'text-red-400' : 
            'text-cyber-green'
          }`}>
            {line.content}
          </div>
        ))}
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-cyber-blue whitespace-nowrap">guest@rafay-portfolio:{currentDir}$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-white min-w-[50px]"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {quickCommands.map(cmd => (
          <button 
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-3 py-1 bg-[#1a1a1a] border border-gray-700 rounded hover:border-cyber-green text-xs text-gray-300 hover:text-cyber-green transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;