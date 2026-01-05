import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import NoZoomScript from './components/NoZoomScript'
import ErrorBoundary from './components/ErrorBoundary'
import StructuredData from './components/StructuredData'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rafucybersec.vercel.app'),
  title: {
    default: '0xRafuSec | Cyber Security Engineer',
    template: '%s | 0xRafuSec',
  },
  description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response. Explore my portfolio, projects, and cybersecurity expertise.',
  keywords: [
    'cyber security engineer',
    'SOC analyst',
    'SIEM engineering',
    'threat detection',
    'incident response',
    'cybersecurity portfolio',
    'security consultant',
    'ISO 27001',
    'MITRE ATT&CK',
    'Wazuh',
    'Threat Hawk',
  ],
  authors: [{ name: 'Muhammad Rafay Ali', url: 'https://rafucybersec.vercel.app' }],
  creator: 'Muhammad Rafay Ali',
  publisher: 'Muhammad Rafay Ali',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rafucybersec.vercel.app',
    siteName: '0xRafuSec Portfolio',
    title: '0xRafuSec | Cyber Security Engineer',
    description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response.',
    images: [
      {
        url: '/og-image.png', // You should create this
        width: 1200,
        height: 630,
        alt: '0xRafuSec Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '0xRafuSec | Cyber Security Engineer',
    description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, and threat detection.',
    creator: '@rafucybersec',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth dark ${spaceGrotesk.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <StructuredData />
        <NoZoomScript />
        <ErrorBoundary>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyber-green-dark dark:focus:bg-cyber-green focus:text-white dark:focus:text-black focus:rounded-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}

