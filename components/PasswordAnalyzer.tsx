import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Check, X, AlertTriangle } from 'lucide-react';

const PasswordAnalyzer: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isBreached, setIsBreached] = useState<boolean | null>(null);
  const [breachCount, setBreachCount] = useState<number>(0);
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);
  const [breachError, setBreachError] = useState<string | null>(null);

  // Debounced breach check
  useEffect(() => {
    if (!password || password.length < 4) {
      setIsBreached(null);
      setBreachCount(0);
      setBreachError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingBreach(true);
      setBreachError(null);

      try {
        const response = await fetch('/api/check-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsBreached(data.breached);
          setBreachCount(data.count || 0);
          setBreachError(null);
        } else {
          // On error, don't mark as breached, just show error
          setIsBreached(false);
          setBreachCount(0);
          setBreachError(data.error || 'Unable to check');
        }
      } catch (error) {
        setIsBreached(false);
        setBreachCount(0);
        setBreachError('Connection error');
      } finally {
        setIsCheckingBreach(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [password]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 10;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

    // Heavy penalty if password is breached
    if (isBreached === true) {
      score = Math.max(0, score - 50); // Reduce by 50 points if breached
    }

    return Math.min(score, 100);
  };

  const strength = calculateStrength(password);

  const getStrengthLabel = (s: number) => {
    if (s < 30) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-600 dark:text-red-500' };
    if (s < 60) return { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-600 dark:text-yellow-500' };
    if (s < 80) return { label: 'Good', color: 'bg-cyber-blue-dark dark:bg-cyber-blue', text: 'text-cyber-blue-dark dark:text-cyber-blue' };
    return { label: 'Strong', color: 'bg-cyber-green-dark dark:bg-cyber-green', text: 'text-cyber-green-dark dark:text-cyber-green' };
  };

  const details = getStrengthLabel(strength);

  const checks = [
    { label: "At least 12 characters", valid: password.length >= 12 },
    { label: "Contains Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Contains Number", valid: /[0-9]/.test(password) },
    { label: "Contains Special Char", valid: /[^A-Za-z0-9]/.test(password) },
    {
      label: isBreached === null
        ? (isCheckingBreach ? "Checking breach database..." : password.length < 4 ? "Not in breach database" : "Not in breach database")
        : isBreached
          ? `Found in ${breachCount.toLocaleString()} breach${breachCount !== 1 ? 'es' : ''}`
          : "Not in breach database",
      valid: isBreached === false,
      isBreached: isBreached === true,
      isLoading: isCheckingBreach,
      error: breachError
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Password <span className="text-cyber-green-dark dark:text-cyber-green">Auditor</span></h2>

      <div className="bg-transparent border border-white/10 rounded-2xl p-8 shadow-none backdrop-blur-sm flex flex-col md:flex-row gap-12">

        <div className="flex-1">
          <div className="relative mb-6">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-cyber-muted" size={20} />
            <input
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to analyze..."
              className="w-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg py-4 pl-12 pr-12 text-gray-900 dark:text-white focus:border-cyber-green-dark dark:focus:border-cyber-green focus:ring-1 focus:ring-cyber-green-dark dark:focus:ring-cyber-green outline-none transition-all"
            />
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-cyber-muted hover:text-gray-900 dark:hover:text-white"
            >
              {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-cyber-muted">Strength Score</span>
            <span className={`text-lg font-bold ${details.text}`}>{details.label} ({strength}%)</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden mb-6">
            <div
              className={`h-full ${details.color} transition-all duration-500`}
              style={{ width: `${strength}%` }}
            ></div>
          </div>

          <div className="space-y-2">
            {isBreached === true && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 rounded-lg">
                <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Password Compromised!
                  </p>
                  <p className="text-xs text-red-500 dark:text-red-400/80 mt-1">
                    This password was found in {breachCount.toLocaleString()} data breach{breachCount !== 1 ? 'es' : ''}. Choose a different password.
                  </p>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-cyber-muted">
              Password analysis checks against Have I Been Pwned database (11+ billion breached passwords).
            </p>
          </div>
        </div>

        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 pt-8 md:pt-0 md:pl-12">
          <h4 className="text-gray-900 dark:text-white font-bold mb-4">Security Checklist</h4>
          <div className="space-y-3">
            {checks.map((check: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                {check.isLoading ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-600">
                    <div className="w-3 h-3 border-2 border-cyber-green-dark dark:border-cyber-green border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${check.isBreached
                      ? 'bg-red-500/20 border-red-500 text-red-500'
                      : check.valid
                        ? 'bg-cyber-green-dark/20 dark:bg-cyber-green/20 border-cyber-green-dark dark:border-cyber-green text-cyber-green-dark dark:text-cyber-green'
                        : 'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}>
                    {check.isBreached || !check.valid ? <X size={14} /> : <Check size={14} />}
                  </div>
                )}
                <span className={
                  check.isBreached
                    ? 'text-red-600 dark:text-red-400 font-medium'
                    : check.valid
                      ? 'text-gray-800 dark:text-white'
                      : 'text-gray-500 dark:text-cyber-muted'
                }>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PasswordAnalyzer;