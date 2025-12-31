import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

// Use Space Grotesk as the primary sans font everywhere as requested
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Rafay Ali - Cyber Security Engineer",
  description: "Portfolio of Muhammad Rafay Ali, Cyber Security Engineer specializing in SOC operations, SIEM engineering, and threat detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} font-sans`}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('visible');
                    }
                  });
                }, { threshold: 0.1 });

                setInterval(() => {
                  document.querySelectorAll('section:not(.observed)').forEach(section => {
                    section.classList.add('reveal-on-scroll', 'observed');
                    observer.observe(section);
                  });
                }, 1000);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}