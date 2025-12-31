'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check, X } from 'lucide-react';

const PasswordAnalyzer: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 10;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
    return Math.min(score, 100);
  };

  const strength = calculateStrength(password);

  const getStrengthLabel = (s: number) => {
    if (s < 30) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    if (s < 60) return { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-500' };
    if (s < 80) return { label: 'Good', color: 'bg-cyber-blue', text: 'text-cyber-blue' };
    return { label: 'Strong', color: 'bg-cyber-green', text: 'text-cyber-green' };
  };

  const details = getStrengthLabel(strength);

  const checks = [
    { label: "At least 12 characters", valid: password.length >= 12 },
    { label: "Contains Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Contains Number", valid: /[0-9]/.test(password) },
    { label: "Contains Special Char", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-8">Password <span className="text-cyber-green">Auditor</span></h2>
        
        <div className="bg-[#111] border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row gap-12">
            
            <div className="flex-1">
                <div className="relative mb-6">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-muted" size={20} />
                    <input 
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password to analyze..."
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg py-4 pl-12 pr-12 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all"
                    />
                    <button 
                        onClick={() => setIsVisible(!isVisible)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyber-muted hover:text-white"
                    >
                        {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm text-cyber-muted">Strength Score</span>
                    <span className={`text-lg font-bold ${details.text}`}>{details.label} ({strength}%)</span>
                </div>
                <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden mb-6">
                    <div 
                        className={`h-full ${details.color} transition-all duration-500`}
                        style={{ width: `${strength}%` }}
                    ></div>
                </div>

                <p className="text-sm text-cyber-muted">
                    This analysis runs locally in your browser. No data is sent to any server.
                </p>
            </div>

            <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
                <h4 className="text-white font-bold mb-4">Security Checklist</h4>
                <div className="space-y-3">
                    {checks.map((check, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${check.valid ? 'bg-cyber-green/20 border-cyber-green text-cyber-green' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                                {check.valid ? <Check size={14} /> : <X size={14} />}
                            </div>
                            <span className={check.valid ? 'text-white' : 'text-cyber-muted'}>{check.label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
};

export default PasswordAnalyzer;