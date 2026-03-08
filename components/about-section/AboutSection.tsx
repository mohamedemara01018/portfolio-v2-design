'use client';

import { Code, Palette, Users, Zap } from 'lucide-react';
import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection';
import { motion, Variants } from 'framer-motion'
import Image from 'next/image';

import { ProfileInfoData } from '@/services/profileInfo.service';

interface AboutSectionProps {
    profileInfo: ProfileInfoData | null;
}

const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

const textVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const highlightVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
}

function AboutSection({ profileInfo }: AboutSectionProps) {
    const highlights = [
        {
            icon: Code,
            title: "Clean Code",
            description: "Writing maintainable and scalable code is my priority",
        },
        {
            icon: Palette,
            title: "Design Focus",
            description: "Creating beautiful interfaces that users love",
        },
        {
            icon: Zap,
            title: "Performance",
            description: "Optimizing for speed and user experience",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Strong team player with excellent communication",
        },
    ];
    return (
        <section id='about' className='bg-(--portfolio-bg-secondary) py-24 '>
            <div className=' wrapper flex flex-col gap-20 items-center'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title='About Me' />
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-between max-lg:flex-col'>
                    <motion.div
                        variants={fadeInScale}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Image
                            className='w-[600px] max-h-[400px] object-cover rounded-2xl shadow-xl'
                            src={"https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg"}
                            alt="Profile avatar"
                            width={600}
                            height={400}
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                    <motion.div
                        className="space-y-6"
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {profileInfo?.about ? (
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {profileInfo.about}
                            </p>
                        ) : (
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {profileInfo?.bio}
                            </p>
                        )}


                        <p className="text-lg text-muted-foreground leading-relaxed">
                            I'm passionate about staying up-to-date with the latest technologies and best
                            practices. When I'm not coding, you'll find me contributing to open-source
                            projects or writing technical articles to help other developers.
                        </p>


                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {highlights.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="p-4 rounded-xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 group hover:shadow-(--portfolio-glow)"
                                        variants={highlightVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                    >
                                        <Icon className="w-8 h-8 text-(--portfolio-accent) mb-2 group-hover:scale-110 transition-transform" />
                                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
