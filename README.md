# 🛡️ 0xRafuSec — Cybersecurity Portfolio

A modern, terminal-themed cybersecurity portfolio built with **Next.js 15**, featuring an interactive "Threat Network" particle background, animated typing sequences, and hands-on security tools — all wrapped in a neon-green hacker aesthetic.

<p align="center">
  <a href="https://rafucybersec.vercel.app" target="_blank"><strong>🌐 Live Site →</strong></a>
</p>

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

---

## ✨ Highlights

### 🌐 Threat Network Background

- Canvas 2D particle system rendered across the **entire site** (`position: fixed`)
- **~150 drifting starfield particles** with subtle pulse/blink effects
- **~30 network nodes** connected by proximity lines (closer = more visible)
- **Mouse repulsion** — nodes gently push away from the cursor across all sections
- Auto-scales particle count on high-DPR displays for smooth 60fps performance

### 🔒 Interactive Security Tools

- **Terminal Emulator** — functional CLI with custom commands
- **Threat Simulation** — simulated penetration testing demo
- **Password Auditor** — real-time strength analysis with breach database check
- **Konami Code Easter Egg** — try `↑ ↑ ↓ ↓ ← → ← → B A` 😉

### 🎨 Visual Design

- **Neon green (`#00ff9d`) + dark terminal** — cybersecurity-inspired color palette
- **Typing animations** — sequential character-by-character reveal on hero text
- **"Available For Hire" glow pulse** — animated badge with box-shadow glow
- **Glassmorphism cards**, smooth scroll (Lenis), and Framer Motion transitions
- **Splash screen** — fast boot sequence with scanline effect

---

## 📱 Sections

| Section            | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Hero**           | Name, title with typing animation, CTA buttons, skills circle                        |
| **About**          | Professional summary with 2+ years of experience highlights                          |
| **Skills**         | 6 categorized rows — SIEM, Offensive, Compliance, OS/Cloud, Security Ops, Automation |
| **Encryption**     | Interactive lock animation with security metrics                                     |
| **Certifications** | ISO 27001 Lead Auditor, ISC2 CC, Google Cybersecurity, and more                      |
| **Experience**     | Timeline of 3 roles — Encbit, Cyber Silo, AIOU                                       |
| **Education**      | Academic background                                                                  |
| **Projects**       | Featured security projects with GitHub links                                         |
| **Terminal Zone**  | Interactive CLI, hacking sim, and password analyzer                                  |
| **Contact**        | Form powered by Resend email API                                                     |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/0xRafuSec/rafu-portfolio.git
cd rafu-portfolio

# Install
npm install

# Dev server (Turbopack)
npm run dev

# Production build
npm run build
```

---

## 🛠️ Tech Stack

| Category      | Technology                              |
| ------------- | --------------------------------------- |
| Framework     | Next.js 15 (App Router)                 |
| Language      | TypeScript 5.7                          |
| Styling       | Tailwind CSS 3.4                        |
| Animations    | Framer Motion, CSS Keyframes, Canvas 2D |
| Smooth Scroll | Lenis                                   |
| Icons         | Lucide React                            |
| Email         | Resend API                              |
| Deployment    | Vercel                                  |

---

## 📁 Project Structure

```
rafu-portfolio/
├── app/
│   ├── api/                  # API routes (contact form, password check)
│   │   ├── check-password/
│   │   └── contact/
│   ├── contact/              # Contact page route
│   ├── experience/           # Experience page route
│   ├── projects/             # Projects page route
│   ├── skills/               # Skills page route
│   ├── globals.css           # Global styles + CSS animations
│   ├── layout.tsx            # Root layout (fonts, metadata, analytics)
│   ├── page.tsx              # Home entry point
│   ├── robots.ts             # SEO robots config
│   └── sitemap.ts            # SEO sitemap generator
├── components/               # 20 React components
│   ├── PortfolioContent.tsx   # Main layout orchestrator
│   ├── StarBackground.tsx     # Global "Threat Network" canvas animation
│   ├── Hero.tsx               # Hero section with typing animations
│   ├── HeroSkillsCircle.tsx   # Animated skills orbit
│   ├── SplashScreen.tsx       # Boot sequence splash screen
│   ├── Terminal.tsx           # Interactive CLI emulator
│   ├── HackingSim.tsx         # Threat simulation tool
│   ├── PasswordAnalyzer.tsx   # Password strength checker
│   ├── Konami.tsx             # Easter egg handler
│   └── ...                    # About, Skills, Experience, etc.
├── lib/
│   └── motion.ts             # Framer Motion animation presets
├── providers/
│   └── lenis-provider.tsx    # Smooth scroll provider
├── public/
│   ├── certificates/         # Certification images
│   ├── icons/                # Skill SVG icons
│   ├── videos/               # Section background videos
│   ├── resume.pdf            # Downloadable CV
│   └── favicon.svg           # Site icon
├── types.ts                  # TypeScript interfaces
├── tailwind.config.js        # Theme colors, fonts, animations
├── next.config.js            # Next.js configuration
├── vercel.json               # Security headers & redirects
└── tsconfig.json             # TypeScript config
```

---

## 🎨 Customization

### Theme Colors

Defined in `tailwind.config.js`:

| Token              | Value     | Usage                             |
| ------------------ | --------- | --------------------------------- |
| `cyber-green`      | `#00ff9d` | Primary accent, particles, badges |
| `cyber-green-dark` | `#00a365` | Light mode primary                |
| `cyber-blue`       | `#00e1ff` | Secondary accent                  |
| `cyber-blue-dark`  | `#0096aa` | Light mode secondary              |
| `cyber-black`      | `#050505` | Deepest background                |

### Content

Update your info in the component files:

| File                 | Content                                |
| -------------------- | -------------------------------------- |
| `Hero.tsx`           | Name, title, description, social links |
| `About.tsx`          | Professional summary                   |
| `Experience.tsx`     | Work history & achievements            |
| `Skills.tsx`         | Skill categories & badges              |
| `Certifications.tsx` | Professional certifications            |
| `Projects.tsx`       | Featured projects                      |

---

## 📝 Environment Variables

```env
# Required for contact form (https://resend.com)
RESEND_API_KEY=your_resend_api_key
```

---

## 🔧 Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (Turbopack) |
| `npm run build` | Production build             |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |

---

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

## 🤝 Connect

- **Portfolio**: [rafucybersec.vercel.app](https://rafucybersec.vercel.app)
- **GitHub**: [0xRafuSec](https://github.com/0xRafuSec)
- **LinkedIn**: [Muhammad Rafay Ali](https://linkedin.com/in/muhammadrafayali)
- **Email**: muhammad.rafayali@outlook.com

---

<p align="center">
  Made with 💛 by <strong>0xRafuSec</strong>
</p>
