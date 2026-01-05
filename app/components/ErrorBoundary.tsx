'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4">
          <div className="max-w-md w-full bg-white dark:bg-cyber-gray/40 backdrop-blur-md rounded-xl border border-red-200 dark:border-red-900/50 p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-sans">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-mono text-sm">
              We encountered an unexpected error. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined })
                window.location.reload()
              }}
              className="px-6 py-3 bg-cyber-green-dark dark:bg-cyber-green text-white dark:text-black font-bold rounded-lg hover:shadow-lg transition-all font-mono"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

