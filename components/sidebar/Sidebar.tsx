import { Code2, Github, Linkedin, Sun, Trophy, X } from 'lucide-react'
import React, { useState } from 'react'
import ThemeToggle from '../theme-toggle/ThemeToggle';
import { scrollToSection } from '@/utils/scrollToSection';

interface SidebarProbs {
    isOpen: Boolean,
    setClose: () => void
}
function Sidebar({ isOpen, setClose }: SidebarProbs) {

    const [isActiveLink, setIsActiveLink] = useState('home')
    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "blog", label: "Blog" },
        { id: "certificates", label: "Certificates" },
        { id: "contact", label: "Contact" },

    ];
    const socialLinks = [
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Code2, href: "https://leetcode.com", label: "LeetCode" },
        { icon: Trophy, href: "https://codeforces.com", label: "Codeforces" },
    ];

    const handleOnClick = (id: string) => {
        setIsActiveLink(id)
        scrollToSection(id);
        setClose()
    }
    return (
        <div className={`${!isOpen ? 'hidden' : ''} md:hidden`} >
            <div onClick={() => setClose()} className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40' />
            {/* sidebar */}
            <div className='fixed left-0 top-0 bottom-0 bg-background  border border-r border-border z-45 p-6 w-80'>
                <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-semibold text-foreground">Menu</span>
                    <button
                        className="p-2 rounded-lg hover:bg-accent transition-all duration-200 active:scale-95"
                        aria-label="Close menu"
                    >
                        <X onClick={() => setClose()} className="w-6 h-6 text-foreground" />
                    </button>
                </div>
                <nav>
                    <ul className='space-y-2 mb-8'>
                        {
                            navItems && navItems.map((item) => {
                                return (
                                    <li key={item.id}
                                        onClick={() => handleOnClick(item.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 active:scale-97 hover:cursor-pointer
                                       ${isActiveLink == item.id
                                                ? "bg-(--portfolio-accent) text-white"
                                                : "text-foreground hover:bg-accent"
                                            }`}>
                                        {item.label}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div
                    className="mb-8 p-4 rounded-lg bg-accent"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Theme</span>
                        <div onClick={() => setClose()}>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                        Connect
                    </p>
                    <div className="flex gap-3">
                        {socialLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    onClick={() => setClose()}
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"

                                    className="p-3 rounded-lg bg-accent hover:bg-(--portfolio-accent) hover:text-white transition-all duration-200"
                                    aria-label={link.label}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar