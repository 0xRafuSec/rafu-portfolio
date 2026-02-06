"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Skill icons using actual images like space-portfolio
const skills = [
    { name: "Wazuh", icon: "/icons/wazuh.svg", top: "20%", left: "55%" },
    { name: "Docker", icon: "/icons/docker.svg", top: "28%", left: "72%" },
    { name: "Python", icon: "/icons/python.png", top: "42%", left: "79%" },
    { name: "GitHub", icon: "/icons/github.svg", top: "56%", left: "78%" },
    { name: "Linux", icon: "/icons/linux.svg", top: "68%", left: "65%" },
    { name: "Node.js", icon: "/icons/nodejs.svg", top: "74%", left: "48%" },
    { name: "Azure", icon: "/icons/azure.svg", top: "72%", left: "29%" },
    { name: "Networks", icon: "/icons/threat.svg", top: "62%", left: "14%" },
    { name: "PowerShell", icon: "/icons/powershell.svg", top: "46%", left: "9%" },
    { name: "Mitre", icon: "/icons/mitre.png", top: "30%", left: "14%" },
    { name: "Kali", icon: "/icons/kali.svg", top: "19%", left: "32%" },
];

export const HeroSkillsCircle = () => {
    return (
        <div className="relative w-[400px] h-[500px]">
            {/* Rotating ring SVG */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 300 300"
                    className="opacity-50"
                >
                    <circle
                        cx="150"
                        cy="150"
                        r="140"
                        fill="none"
                        stroke="#00ff9d"
                        strokeWidth="1"
                        strokeDasharray="10 5"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r="110"
                        fill="none"
                        stroke="#00ff9d"
                        strokeWidth="0.5"
                        strokeDasharray="5 10"
                    />
                </svg>
            </motion.div>

            {/* Counter-rotating ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <svg
                    width="250"
                    height="250"
                    viewBox="0 0 250 250"
                    className="opacity-40"
                >
                    <circle
                        cx="125"
                        cy="125"
                        r="120"
                        fill="none"
                        stroke="#00a3ff"
                        strokeWidth="1"
                        strokeDasharray="15 8"
                    />
                </svg>
            </motion.div>

            {/* Floating skill icons */}
            {skills.map((skill, index) => (
                <motion.div
                    key={skill.name}
                    className="absolute w-12 h-12"
                    style={{ top: skill.top, left: skill.left, transform: "translate(-50%, -50%)" }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -8, 0]
                    }}
                    transition={{
                        delay: index * 0.15,
                        duration: 0.5,
                        y: {
                            duration: 2.5 + index * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <div className="w-12 h-12 rounded-xl bg-0 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:scale-110 hover:border-[#00ff9d]/50 transition-all duration-300 cursor-pointer group">
                        <Image
                            src={skill.icon}
                            alt={skill.name}
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                    <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-[#00ff9d] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {skill.name}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default HeroSkillsCircle;
