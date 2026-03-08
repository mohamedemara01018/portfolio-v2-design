'use client';

import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { motion } from 'framer-motion'

import { SkillsData } from "@/services/skill.service"

interface SkillsSectionProps {
    skills: SkillsData[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
}

const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
        width: `${level}%`,
        transition: { duration: 1, delay: 0.5 }
    })
}

function SkillsSection({ skills }: SkillsSectionProps) {

    // Ensure we have an array
    const validSkills = Array.isArray(skills) ? skills : [];

    // Grouping the skills by category
    const groupedSkills = validSkills.reduce((acc, skill) => {
        const category = skill.category || "Other";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, SkillsData[]>);

    // Transforming back to the expected array format for UI mapping
    const skillCategories = Object.keys(groupedSkills).map((key) => ({
        title: key,
        skills: groupedSkills[key],
    }));

    if (validSkills.length === 0) return null;

    return (
        <section id='skills' className='py-24'>
            <div className='wrapper space-y-12'>
                <motion.div
                    className='flex flex-col gap-4 items-center justify-center'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title='Skills & Expertise' />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">
                        Continuously learning and improving my skills to deliver exceptional results
                    </p>
                </motion.div>

                <motion.div
                    className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="p-6 rounded-2xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow)"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                        >
                            <h3 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                                {category.title}
                            </h3>
                            <div className="space-y-5">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-foreground">{skill.name}</span>
                                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-accent rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-linear-to-r from-(--portfolio-accent) to-purple-600 rounded-full"
                                                custom={skill.level}
                                                variants={progressVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default SkillsSection
