const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Rafay Ali',
  alternateName: '0xRafuSec',
  jobTitle: 'Cyber Security Engineer',
  description: 'Cyber Security Engineer specializing in SOC operations, SIEM engineering, threat detection, and incident response.',
  url: 'https://rafucybersec.vercel.app',
  image: 'https://rafucybersec.vercel.app/rafu.png',
  sameAs: [
    'https://github.com/0xRafuSec',
    'https://www.linkedin.com/in/muhammadrafayali/',
    'https://www.instagram.com/rafucybersec/',
  ],
  email: 'rafay.arshad1@outlook.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Engineering and Technology',
  },
  knowsAbout: [
    'Cyber Security',
    'SOC Operations',
    'SIEM Engineering',
    'Threat Detection',
    'Incident Response',
    'ISO 27001',
    'MITRE ATT&CK',
    'Wazuh',
    'Threat Hawk',
    'Active Directory',
    'Penetration Testing',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'ISO/IEC 27001:2022 Lead Auditor',
      issuer: {
        '@type': 'Organization',
        name: 'MasterMind',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: 'Certified SOC Analyst Foundation',
      issuer: {
        '@type': 'Organization',
        name: 'SIEM XPERT',
      },
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
