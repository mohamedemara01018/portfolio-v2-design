'use client';

import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { Briefcase, GraduationCap } from "lucide-react";
import { ExperienceData } from "@/services/experiance.service";
import { motion } from 'framer-motion'

interface ExperianceSectionProps {
    experiences: ExperienceData[];
}

function ExperianceSection({ experiences }: ExperianceSectionProps) {
    // If we receive an array, we map it, otherwise just in case it's something went wrong we provide a fallback empty array.
    const timeline = Array.isArray(experiences) ? experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()) : [];

    if (timeline.length === 0) return null;

    return (
        <section id='experience' className='bg-(--portfolio-bg-secondary) py-24'>
            <div className='wrapper flex flex-col items-center gap-12'>
                <motion.div
                    className='flex flex-col items-center gap-4'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title={'Experience & Education'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">
                        My professional journey
                    </p>
                </motion.div>

                <div className="relative w-full max-w-4xl">
                    {/* Timeline line */}
                    <motion.div
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    ></motion.div>

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Icon */}
                                <motion.div
                                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-(--portfolio-accent) flex items-center justify-center shadow-lg shadow-(--portfolio-accent)/30 z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.3 }}
                                >
                                    {item.role && item.company ? (
                                        <Briefcase className="w-8 h-8 text-white" />
                                    ) : (
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    )}
                                </motion.div>

                                {/* Content */}
                                <div
                                    className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                                        }`}
                                >
                                    <motion.div
                                        className="p-6 rounded-xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) group"
                                        whileHover={{ y: -5 }}
                                    >
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-(--portfolio-accent) text-white rounded-full mb-3">
                                            {new Date(item.startDate).getFullYear()} - {item.current ? 'Present' : (item.endDate ? new Date(item.endDate).getFullYear() : 'N/A')}
                                        </span>
                                        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-(--portfolio-accent) transition-colors">
                                            {item.role}
                                        </h3>
                                        <p className="text-(--portfolio-accent) font-medium mb-3">
                                            {item.company}
                                        </p>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

                                        {(item as any).technologies && Array.isArray((item as any).technologies) && (
                                            <ul className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                                {(item as any).technologies.map((achievement: string, i: number) => (
                                                    <li
                                                        key={i}
                                                        className="text-xs px-2 py-1 rounded-md bg-accent text-muted-foreground border border-border"
                                                    >
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperianceSection
