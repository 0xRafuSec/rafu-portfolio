"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromTop } from "@/lib/motion";

export const Encryption = () => {
    return (
        <section id="security" className="scroll-mt-20">
            <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full">
                <div className="absolute w-auto h-auto top-0 z-[5]">
                    <motion.div
                        variants={slideInFromTop}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-[32px] md:text-[40px] font-medium text-center text-gray-800 dark:text-gray-200"
                    >
                        Performance{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green-dark to-cyber-green dark:from-cyber-green dark:to-cyber-green">
                            &amp; Security
                        </span>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
                    <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
                        <Image
                            src="/lock-top.png"
                            alt="Lock top"
                            width={50}
                            height={50}
                            className="translate-y-5 transition-all duration-200 group-hover:translate-y-11"
                        />
                        <Image
                            src="/lock-main.png"
                            alt="Lock main"
                            width={70}
                            height={70}
                            className="z-10"
                        />
                    </div>

                    <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-cyber-green dark:border-cyber-green opacity-[1]">
                        <h2 className="Welcome-text text-[12px]">Encryption</h2>
                    </div>
                </div>

                <div className="absolute z-[20] bottom-[10px] px-[5px]">
                    <div className="cursive text-[18px] md:text-[20px] font-medium text-center text-cyber-green-dark dark:text-cyber-green">
                        Secure your data with end-to-end encryption.
                    </div>
                </div>

                <div className="w-full flex items-start justify-center absolute opacity-50">
                    <video
                        loop
                        muted
                        autoPlay
                        playsInline
                        preload="none"
                        className="w-full h-auto"
                        style={{ filter: 'sepia(100%) hue-rotate(70deg) saturate(3) brightness(0.9)' }}
                    >
                        <source src="/videos/encryption-bg.webm" type="video/webm" />
                    </video>
                </div>
            </div>
        </section>
    );
};

export default Encryption;
