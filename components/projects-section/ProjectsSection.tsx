import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ExternalLink, Github } from 'lucide-react'

function ProjectsSection() {
    return (
        <section id='projects' className='py-24'>
            <div className='wrapper flex flex-col items-center gap-8'>
                <div>
                    <TitleOfSection title='Featured Projects' />
                    <p className='text-muted-foreground mt-4'>A showcase of my recent work and side projects</p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                    {
                        Array.from({ length: 7 }).map((item) => {
                            return (
                                <div className='group bg-card rounded-xl overflow-hidden border border-border hover:border-(--portfolio-accent) hover:-translate-y-0.5  transition duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow)  '>
                                    <div className='relative aspect-video overflow-hidden '>
                                        <img className=' object-cover group-hover:scale-110 transition duration-300' src="https://images.pexels.com/photos/34214379/pexels-photo-34214379.jpeg" alt="project-image" />
                                        <div className='absolute inset-0  bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100  transition duration-300 flex items-end justify-center gap-4 pb-4'>
                                            <a
                                                href={'project.liveLink'}
                                                className="p-2 rounded-lg bg-white/90 hover:bg-white transition-colors"
                                                aria-label="View live project"
                                            >
                                                <ExternalLink className="w-5 h-5 text-gray-900" />
                                            </a>
                                            <a
                                                href={'project.githubLink'}
                                                className="p-2 rounded-lg bg-white/90 hover:bg-white transition-colors"
                                                aria-label="View on GitHub"
                                            >
                                                <Github className="w-5 h-5 text-gray-900" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className='p-6 space-y-2'>
                                        <h3 className='text-xl group-hover:text-(--portfolio-accent)'>E-Commerce Platform</h3>
                                        <p className='text-muted-foreground line-clamp-2'>A modern e-commerce platform with real-time inventory management, payment integration, and</p>
                                        <div className='flex gap-2 flex-wrap pt-3'>
                                            <span className='px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full'>react</span>
                                            <span className='px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full'>react</span>
                                            <span className='px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full'>react</span>
                                            <span className='px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full'>react</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </section>
    )
}

export default ProjectsSection