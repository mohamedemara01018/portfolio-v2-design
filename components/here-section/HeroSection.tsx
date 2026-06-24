'use client';
import React, { useMemo } from 'react'
import { Github, Linkedin, Mail, Code2, Trophy, Download } from 'lucide-react';
import { ProfileInfoData } from '@/services/profileInfo.service';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion'

interface HeroSectionProps {
    profileInfo: ProfileInfoData | null;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function HeroSection({ profileInfo }: HeroSectionProps) {
    if (!profileInfo) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const socialLinks = useMemo(() => [
        { link: profileInfo?.github, icon: Github, label: "GitHub" },
        { link: profileInfo?.linkedin, icon: Linkedin, label: "LinkedIn" },
        { link: profileInfo?.leetcode, icon: Code2, label: "LeetCode" },
        { link: profileInfo?.codeforces, icon: Trophy, label: "Codeforces" },
        { link: `mailto:${profileInfo?.email}`, icon: Mail, label: "Email" },
    ], [profileInfo]);

    return (
        <section id='home' className='min-h-screen  flex items-center justify-center pt-35 max:pt-24 pb-12 overflow-hidden bg-linear-to-b from-background to-background/50'>
            <div className='wrapper w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
                <motion.div
                    className='space-y-8 text-center lg:text-left order-2 lg:order-1'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className='space-y-4'>
                        <motion.span
                            variants={itemVariants}
                            className='inline-block px-4 py-1.5 rounded-full bg-(--portfolio-accent)/10 text-(--portfolio-accent) text-sm font-bold tracking-wider uppercase'
                        >
                            Welcome to my portfolio
                        </motion.span>
                        <motion.h1
                            variants={itemVariants}
                            className='text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1]'
                        >
                            Hi, I&apos;m <span className='text-(--portfolio-accent)'>{profileInfo?.fullName}</span>
                        </motion.h1>
                        <motion.h2
                            variants={itemVariants}
                            className='text-2xl md:text-3xl text-muted-foreground'
                        >
                            {profileInfo?.title}
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className='text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed'
                        >
                            {profileInfo?.bio || "I craft beautiful, performant web applications with modern technologies."}
                        </motion.p>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className='flex flex-wrap items-center justify-center lg:justify-start gap-4'
                    >
                        <a
                            href="#projects"
                            className='px-8 py-4 bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white rounded-xl font-bold transition-all flex items-center gap-2 group shadow-lg shadow-(--portfolio-accent)/25'
                        >
                            View My Work
                        </a>
                        <a
                            href={profileInfo?.resume}
                            target='_blank'
                            className='px-8 py-4 bg-card hover:bg-card/80 text-foreground border-2 border-(--portfolio-accent) rounded-xl font-bold transition-all flex items-center gap-2'
                        >
                            <Download className="w-4 h-4" />
                            Download CV
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className='flex items-center justify-center lg:justify-start gap-5'
                    >
                        {socialLinks.map((social, index) => {
                            if (!social.link) return null;
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.link.startsWith('http') ? social.link : `https://${social.link}`}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    className='p-3 rounded-xl bg-card border border-border text-muted-foreground hover:text-(--portfolio-accent) hover:border-(--portfolio-accent) transition-all hover:shadow-(--portfolio-glow)'
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={social.label}
                                >
                                    <Icon className='w-5 h-5' />
                                </motion.a>
                            )
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    className='relative order-1 lg:order-2 flex justify-center'
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className='relative w-64 sm:w-80 h-80 md:w-96 md:h-96 group'>
                        <div className='absolute inset-0 rounded-full bg-(--portfolio-accent) scale-105 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500'></div>
                        <div className='relative w-full h-full rounded-full overflow-hidden border-4 border-foreground shadow-2xl'>
                            <Image
                                src={profileInfo?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"}
                                alt={profileInfo?.fullName || "Profile Avatar"}
                                fill
                                className='object-cover group-hover:scale-110 transition-transform duration-700'
                                priority
                                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
