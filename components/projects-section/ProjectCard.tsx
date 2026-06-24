'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectData } from '@/services/project.service';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: ProjectData;
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
} as const;

const categoryStyles: Record<string, string> = {
    frontend: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    backend: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    fullstack: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
};

export default function ProjectCard({ project }: ProjectCardProps) {
    // Parse technologies array which might be JSON-serialized inside index 0
    let techs: string[] = [];
    try {
        techs = project.technologies && Array.isArray(project.technologies)
            ? (project.technologies[0].startsWith('[') ? JSON.parse(project.technologies[0]) : project.technologies)
            : [];
    } catch (e) {
        techs = project.technologies || [];
    }

    const catStyle = categoryStyles[project.category?.toLowerCase()] || "bg-accent/80 text-accent-foreground border-border/50";

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className='group bg-card/65 backdrop-blur-md rounded-2xl overflow-hidden border border-border/80 hover:border-(--portfolio-accent)/50 transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) flex flex-col h-full'
        >
            {/* Image Section */}
            <div className='relative aspect-video overflow-hidden bg-muted'>
                <motion.img
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    src={typeof project.coverImage === 'string' ? project.coverImage : (project.coverImage ? URL.createObjectURL(project.coverImage) : "https://images.pexels.com/photos/34214379/pexels-photo-34214379.jpeg")}
                    alt={project.title || "project-image"}
                />
                
                {/* Category Badge overlay */}
                {project.category && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-lg border uppercase tracking-wider backdrop-blur-md ${catStyle}`}>
                        {project.category}
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className='p-6 flex flex-col grow space-y-4 justify-between'>
                <div className='space-y-2.5'>
                    <h3 className='text-xl font-bold group-hover:text-(--portfolio-accent) transition-colors leading-tight line-clamp-1'>
                        {project.title}
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed line-clamp-3 min-h-[4.2rem]'>
                        {project.description}
                    </p>
                    
                    {/* Tech Badges */}
                    {techs.length > 0 && (
                        <div className='flex gap-1.5 flex-wrap pt-1'>
                            {techs.slice(0, 4).map((tech: string, i: number) => (
                                <span key={i} className='px-2.5 py-0.5 text-[10px] font-semibold bg-accent/60 text-accent-foreground rounded-md border border-border/40 uppercase tracking-wider'>
                                    {tech}
                                </span>
                            ))}
                            {techs.length > 4 && (
                                <span className='px-2 py-0.5 text-[10px] font-semibold bg-accent/40 text-muted-foreground rounded-md border border-border/30'>
                                    +{techs.length - 4}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Call To Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
                    {project.liveUrl && (
                        <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white text-xs font-bold transition-colors duration-300 shadow-sm active:scale-[0.98]"
                            aria-label={`View live demo of ${project.title}`}
                        >
                            <ExternalLink size={14} />
                            <span>Live Demo</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/80 bg-background/50 hover:bg-accent text-foreground text-xs font-bold transition-colors duration-300 active:scale-[0.98]"
                            aria-label={`View GitHub repository for ${project.title}`}
                        >
                            <Github size={14} />
                            <span>GitHub</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
