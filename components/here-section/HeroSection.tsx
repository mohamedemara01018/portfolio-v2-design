import { Code2, Download, Github, Linkedin, LinkedinIcon, Trophy } from 'lucide-react'


function HeroSection() {
    return (
        <section id='home' className='min-h-screen flex items-center justify-center pt-20 px-6 '>
            <div className='wrapper flex items-center justify-between gap-10 max-lg:flex-col '>
                <div className='space-y-6'>
                    <div className='space-y-4'>
                        <h1 className="text-5xl md:text-6xl font-bold">
                            Hi, I'm{" "}
                            <span
                                className="bg-linear-to-r from-(--portfolio-accent) to-purple-600 bg-clip-text text-transparent"
                            >
                                Alex Johnson
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-muted-foreground">
                            Full Stack Developer & UI/UX Designer
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed w-[80%] max-lg:w-full">
                            I craft beautiful, performant web applications with modern technologies.
                            Passionate about creating seamless user experiences and scalable solutions.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-6 py-3 bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-(--portfolio-accent)/30">
                            Hire Me
                        </button>
                        <button className="px-6 py-3 border-2 border-(--portfolio-accent) text-(--portfolio-accent) hover:bg-(--portfolio-accent) hover:text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Resume
                        </button>
                    </div>
                    <div className='flex gap-4'>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-accent hover:bg-(--portfolio-accent) hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-accent hover:bg-(--portfolio-accent) hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <LinkedinIcon className="w-5 h-5" />
                        </a>
                        <a
                            href="https://leetcode.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-accent hover:bg-(--portfolio-accent) hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="LeetCode"
                        >
                            <Code2 className="w-5 h-5" />
                        </a>
                        <a
                            href="https://codeforces.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-lg bg-accent hover:bg-(--portfolio-accent) hover:text-white transition-all duration-300 hover:scale-110"
                            aria-label="Codeforces"
                        >
                            <Trophy className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className='flex justify-center relative group'>
                    <div className="absolute -z-10 -inset-1 bg-linear-to-r from-(--portfolio-accent) to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className='w-100 h-100 max-lg:w-70 max-lg:h-70 overflow-hidden rounded-full border-4 border-foreground'>
                        <img
                            // className='w-80 h-80'
                            src="https://images.pexels.com/photos/36036924/pexels-photo-36036924.jpeg" alt="" />

                    </div>
                </div>
            </div >
        </section >
    )
}

export default HeroSection