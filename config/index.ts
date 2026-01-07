// App configuration

export const appConfig = {
  name: '0xRafuSec Portfolio',
  description: 'Muhammad Rafay Ali - Cyber Security Engineer Portfolio',
  
  // Animation settings
  animations: {
    transitionDuration: 300,
    scrollBehavior: 'smooth' as const,
  },

  // Theme colors (Tailwind)
  theme: {
    primary: 'cyber-green',
    secondary: 'cyber-blue',
    accent: 'pink-500',
  },

  // API endpoints
  api: {
    checkPassword: '/api/check-password',
    sendContact: '/api/contact',
  },

  // SEO
  seo: {
    keywords: [
      'Cyber Security',
      'SIEM Engineer',
      'SOC Analyst',
      'Threat Detection',
      'Incident Response',
    ],
    author: 'Muhammad Rafay Ali',
  },
}
