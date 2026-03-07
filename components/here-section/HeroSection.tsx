import { ProfileInfoData } from '@/services/profileInfo.service'
import { Code2, Download, Github, Linkedin, LinkedinIcon, Trophy } from 'lucide-react'

interface HeroSectionProps {
    profileInfo: ProfileInfoData | null;
}

function HeroSection({ profileInfo }: HeroSectionProps) {
    console.log(profileInfo)

    const socialLinks = [
        { link: profileInfo?.github, icon: Github },
        { link: profileInfo?.linkedin, icon: Linkedin },
        { link: profileInfo?.leetcode, icon: Code2 },
        { link: profileInfo?.codeforces, icon: Trophy }
    ]
    return (
        <section id='home' className='min-h-screen flex items-center justify-center pt-20 px-6 '>
            <div className='wrapper flex items-center justify-between gap-10 max-lg:flex-col '>
                <div className='space-y-6'>
                    <div className='space-y-4'>
                        <h1 className="text-5xl md:text-6xl font-bold">
                            Hi, I'm{" "}
                            <span
                                className="bg-linear-to-r from-[color:var(--portfolio-accent)] to-purple-600 bg-clip-text text-transparent"
                            >
                                {profileInfo?.fullName}
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-muted-foreground">
                            {profileInfo?.title}
                        </h2>
                        {profileInfo?.bio ? (
                            <p className="text-lg text-muted-foreground leading-relaxed w-[80%] max-lg:w-full">
                                {profileInfo.bio}
                            </p>
                        ) : (
                            <p className="text-lg text-muted-foreground leading-relaxed w-[80%] max-lg:w-full">
                                I craft beautiful, performant web applications with modern technologies.
                                Passionate about creating seamless user experiences and scalable solutions.
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="px-6 py-3 bg-[color:var(--portfolio-accent)] hover:bg-[color:var(--portfolio-accent-hover)] text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[color:var(--portfolio-accent)]/30 inline-block text-center">
                            Hire Me
                        </a>
                        {profileInfo?.resume ? (
                            <a href={profileInfo.resume} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border-2 border-[color:var(--portfolio-accent)] text-[color:var(--portfolio-accent)] hover:bg-[color:var(--portfolio-accent)] hover:text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Resume
                            </a>
                        ) : (
                            <button className="px-6 py-3 border-2 border-[color:var(--portfolio-accent)] text-[color:var(--portfolio-accent)] hover:bg-[color:var(--portfolio-accent)] hover:text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Resume
                            </button>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        {
                            socialLinks.map((l, idx) => {
                                if (!l) return null;
                                const Icon = l.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={`${l.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-lg bg-accent hover:bg-[color:var(--portfolio-accent)] hover:text-white transition-all duration-300 hover:scale-110"
                                        aria-label="Social Link"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })
                        }


                    </div>
                </div>

                <div className='flex justify-center relative group'>
                    <div className="absolute -z-10 -inset-1 bg-linear-to-r from-[color:var(--portfolio-accent)] to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className='w-[100px] h-[100px] min-w-[250px] min-h-[250px] max-lg:min-w-[200px] max-lg:min-h-[200px] overflow-hidden rounded-full border-4 border-foreground object-cover'>
                        <img
                            className='w-full h-full object-cover'
                            src={profileInfo?.avatar && typeof profileInfo.avatar === 'string' ? profileInfo.avatar : "https://images.pexels.com/photos/36036924/pexels-photo-36036924.jpeg"} alt="Profile Avatar" />

                    </div>
                </div>
            </div >
        </section >
    )
}

export default HeroSection