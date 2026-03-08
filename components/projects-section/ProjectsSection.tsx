'use client';

import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ExternalLink, Github } from 'lucide-react'
import { ProjectData } from '@/services/project.service';
import { motion } from 'framer-motion'

interface ProjectsSectionProps {
    projects: ProjectData[];
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
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
}

function ProjectsSection({ projects }: ProjectsSectionProps) {
    const validProjects = Array.isArray(projects) ? [...projects].reverse() : [];

    return (
        <section id='projects' className='py-24'>
            <div className='wrapper flex flex-col items-center gap-12'>
                <motion.div
                    className='text-center'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title='Featured Projects' />
                    <p className='text-muted-foreground mt-4'>A showcase of my recent work and side projects</p>
                </motion.div>

                <motion.div
                    className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {
                        validProjects.map((item) => {
                            let techs: string[] = [];
                            try {
                                techs = item.technologies && Array.isArray(item.technologies)
                                    ? (item.technologies[0].startsWith('[') ? JSON.parse(item.technologies[0]) : item.technologies)
                                    : [];
                            } catch (e) {
                                techs = item.technologies || [];
                            }

                            return (
                                <motion.div
                                    key={item._id}
                                    variants={cardVariants}
                                    whileHover={{ y: -10 }}
                                    className='group bg-card rounded-xl overflow-hidden border border-border hover:border-(--portfolio-accent) transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow)'
                                >
                                    <div className='relative aspect-video overflow-hidden '>
                                        <motion.img
                                            className='w-full h-full object-cover'
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            src={typeof item.coverImage === 'string' ? item.coverImage : (item.coverImage ? URL.createObjectURL(item.coverImage) : "https://images.pexels.com/photos/34214379/pexels-photo-34214379.jpeg")}
                                            alt={item.title || "project-image"}
                                        />
                                        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
                                            {item.liveUrl && (
                                                <motion.a
                                                    href={item.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-full bg-white text-gray-900 hover:scale-110 transition-transform"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <ExternalLink className="w-6 h-6" />
                                                </motion.a>
                                            )}
                                            {item.githubUrl && (
                                                <motion.a
                                                    href={item.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 rounded-full bg-white text-gray-900 hover:scale-110 transition-transform"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Github className="w-6 h-6" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                    <div className='p-6 space-y-3'>
                                        <h3 className='text-xl font-bold group-hover:text-(--portfolio-accent) transition-colors'>{item.title}</h3>
                                        <p className='text-muted-foreground line-clamp-2 group-hover:line-clamp-none text-sm leading-relaxed'>{item.description}</p>
                                        <div className='flex gap-2 flex-wrap pt-2'>
                                            {techs.map((tech: string, i: number) => (
                                                <span key={i} className='px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-accent text-accent-foreground rounded-md border border-border/50'>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    }
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection
