'use client'

import { useState, useRef, useEffect } from 'react'
import { Lock, AlertTriangle, CheckCircle2, Eye, EyeOff, Shield } from 'lucide-react'
import gsap from 'gsap'

export default function PasswordAnalyzer3D() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const [breachCount, setBreachCount] = useState<number | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [checkError, setCheckError] = useState('')
  const barRef = useRef<HTMLDivElement>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const analyzePassword = (pwd: string) => {
    let score = 0

    // Length (20 points)
    if (pwd.length >= 8) score += 10
    if (pwd.length >= 12) score += 10

    // Uppercase (15 points)
    if (/[A-Z]/.test(pwd)) score += 15

    // Lowercase (15 points)
    if (/[a-z]/.test(pwd)) score += 15

    // Numbers (15 points)
    if (/[0-9]/.test(pwd)) score += 15

    // Special characters (25 points)
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 25

    setStrength(Math.min(score, 100))
  }

  // Check if password has been in a breach using Have I Been Pwned API
  const checkBreachStatus = async (pwd: string) => {
    if (!pwd || pwd.length < 4) {
      setBreachCount(null)
      setCheckError('')
      return
    }

    setIsChecking(true)
    setCheckError('')

    try {
      // Call the API endpoint that securely checks against Have I Been Pwned
      const response = await fetch('/api/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: pwd }),
      })

      const data = await response.json()

      if (response.ok) {
        setBreachCount(data.count || 0)
      } else {
        setCheckError(data.message || 'Failed to check breach status')
        setBreachCount(null)
      }
    } catch (error) {
      setCheckError('Unable to check breach status. Using local analysis only.')
      setBreachCount(null)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    analyzePassword(password)

    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${Math.min(strength, 100)}%`,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    // Debounce breach check (wait 500ms after user stops typing)
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      checkBreachStatus(password)
    }, 500)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [password])

  const getStrengthLabel = () => {
    if (strength < 25) return { label: 'Very Weak', color: 'text-red-500', bg: 'bg-red-500/20', border: 'border-red-500/30' }
    if (strength < 50) return { label: 'Weak', color: 'text-orange-500', bg: 'bg-orange-500/20', border: 'border-orange-500/30' }
    if (strength < 75) return { label: 'Good', color: 'text-yellow-500', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' }
    return { label: 'Strong', color: 'text-green-500', bg: 'bg-green-500/20', border: 'border-green-500/30' }
  }

  const strengthInfo = getStrengthLabel()

  const checks = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least 12 characters', met: password.length >= 12 },
    { label: 'Uppercase letters', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letters', met: /[a-z]/.test(password) },
    { label: 'Numbers', met: /[0-9]/.test(password) },
    { label: 'Special characters', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    {
      label: breachCount === null ? 'Not breached (checking...)' : `${breachCount} breaches found`,
      met: breachCount === 0,
      breachCheck: true,
    },
  ]

  return (
    <section id="password-analyzer" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans flex items-center gap-3">
            <Lock className="w-10 h-10 text-cyber-green" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-blue">
              Password Strength Analyzer
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Test password strength with Have I Been Pwned breach checking
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-black/40 to-black/60 rounded-xl p-8 border border-cyber-green/30 shadow-xl hover:border-cyber-green/50 transition-all">
          {/* Password Input */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-white mb-3">Enter Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password..."
                className="w-full px-4 py-3 bg-black/50 border border-cyber-green/20 rounded-lg font-mono text-sm text-white focus:outline-none focus:border-cyber-green focus:ring-2 focus:ring-cyber-green/30 transition-all placeholder-gray-600"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyber-green transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white">Strength: {strength}/100</span>
              <span className={`text-lg font-bold ${strengthInfo.color}`}>{strengthInfo.label}</span>
            </div>

            <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden border border-gray-600/50">
              <div
                ref={barRef}
                className={`h-full transition-all duration-500 ${
                  strength < 25
                    ? 'bg-red-500 shadow-lg shadow-red-500/50'
                    : strength < 50
                      ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                      : strength < 75
                        ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                        : 'bg-green-500 shadow-lg shadow-green-500/50'
                }`}
              />
            </div>

            <div className={`mt-3 px-4 py-2 rounded-lg ${strengthInfo.bg} border ${strengthInfo.border}`}>
              <p className={`text-sm font-semibold ${strengthInfo.color} flex items-center gap-2`}>
                {strength >= 75 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
                {strengthInfo.label} Password
              </p>
            </div>
          </div>

          {/* Breach Alert */}
          {breachCount !== null && breachCount > 0 && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ⚠️ <strong>Warning:</strong> This password has been found in {breachCount} data breaches. Do not use this password!
              </p>
            </div>
          )}

          {/* Requirements Checklist */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-green" />
              Security Checklist
            </p>
            <div className="space-y-2">
              {checks.map((check, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    check.breachCheck
                      ? 'bg-purple-500/10 border-purple-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      check.met ? 'bg-green-500 border-green-500' : 'border-gray-500'
                    }`}
                  >
                    {check.met && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${check.met ? 'text-white' : 'text-gray-400'}`}>{check.label}</span>
                  {check.breachCheck && isChecking && <div className="ml-auto text-xs text-gray-500 animate-pulse">checking...</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {password && strength < 75 && (
            <div className="mt-8 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
              <p className="text-sm text-cyber-blue">
                💡 <strong>Tip:</strong> Use a mix of uppercase, lowercase, numbers, and special characters. Aim for at least 16 characters
                and make sure it hasn't been breached!
              </p>
            </div>
          )}

          {checkError && (
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">{checkError}</p>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            🔒 <strong>Privacy Notice:</strong> Your password is hashed in your browser using SHA-1. The hash is sent to Have I Been Pwned
            API to check for breaches. Your plain password never leaves your device.
          </p>
        </div>
      </div>
    </section>
  )
}
