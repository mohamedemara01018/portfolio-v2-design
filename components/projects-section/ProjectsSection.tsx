'use client';

import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ProjectData } from '@/services/project.service';
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard';

interface ProjectsSectionProps {
    projects: ProjectData[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
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
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {
                        validProjects.map((item) => (
                            <ProjectCard key={item._id} project={item} />
                        ))
                    }
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection
