# 🛡️ 0xRafuSec Portfolio

A modern, cybersecurity-themed portfolio website built with Next.js 15, featuring a stunning space theme with animated stars, green neon aesthetics, and interactive security tools.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)

## ✨ Features

### 🌌 Visual Design

- **Animated Star Background** - 3D star field using React Three Fiber
- **Green Neon Theme** - Cybersecurity-inspired color palette
- **Blackhole Hero Animation** - Eye-catching video background
- **Glassmorphism UI** - Modern transparent components
- **Smooth Animations** - Framer Motion powered transitions

### 🔒 Interactive Security Tools

- **Terminal Emulator** - Functional command-line interface
- **Live Threat Simulation** - Simulated penetration testing demo
- **Password Auditor** - Real-time strength analysis with HIBP integration

### 📱 Sections

- Hero with skills circle
- About / Overview
- Skills & Expertise
- Performance & Security (Encryption)
- Certifications
- Experience Timeline
- Education
- Projects Showcase
- Interactive Terminal Zone
- Contact Form

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/0xRafuSec/rafu-portfolio.git
cd rafu-portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

| Category    | Technology              |
| ----------- | ----------------------- |
| Framework   | Next.js 15 (App Router) |
| Language    | TypeScript              |
| Styling     | Tailwind CSS            |
| 3D Graphics | React Three Fiber, Drei |
| Animations  | Framer Motion           |
| Icons       | Lucide React            |
| Deployment  | Vercel                  |

## 📁 Project Structure

```
rafu-portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── StarBackground.tsx # 3D star animation
│   ├── Skills.tsx        # Skills showcase
│   ├── Terminal.tsx      # Interactive terminal
│   ├── HackingSim.tsx    # Threat simulation
│   └── ...               # Other components
├── public/               # Static assets
│   ├── videos/          # Background videos
│   └── icons/           # SVG icons
└── lib/                  # Utilities
```

## 🎨 Customization

### Colors

The main theme colors are defined in `tailwind.config.ts`:

- `cyber-green`: `#00ff9d` - Primary accent
- `cyber-blue`: `#00a3ff` - Secondary accent
- Background: Green-tinted dark gradient

### Content

Update your personal information in the respective component files:

- `components/Hero.tsx` - Name, title, description
- `components/About.tsx` - Bio and overview
- `components/Experience.tsx` - Work history
- `components/Projects.tsx` - Portfolio projects

## 📝 Environment Variables

Create a `.env.local` file for any API keys:

```env
# Optional: For contact form
RESEND_API_KEY=your_resend_api_key
```

## 🔧 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Connect

- **GitHub**: [@0xRafuSec](https://github.com/0xRafuSec)
- **LinkedIn**: [Muhammad Rafay Ali](https://linkedin.com/in/muhammadrafayali)
- **Email**: muhammad.rafayali@outlook.com

---

<p align="center">
  Made with 💚 by <strong>0xRafuSec</strong>
</p>
