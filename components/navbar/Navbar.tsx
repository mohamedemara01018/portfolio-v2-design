'use client';
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { List } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";
import { scrollToSection } from "@/utils/scrollToSection";

const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
];



export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState<Boolean>(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width:768px)");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleChange = (e: any) => {
            setSidebarCollapsed(e.matches);
        };

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSidebarCollapsed(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {

        const handleScroll = () => {
            const sections = [
                "home",
                "about",
                "skills",
                "experience",
                "projects",
                "blog",
                "contact",
                "admin",
            ];
            const scrollPosition = window.scrollY + 150;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4 border-b-2 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'} `}>
                <div className="wrapper flex items-center justify-between">
                    <button >
                        <h1 className="hover:text-(--portfolio-accent)">portfolio</h1>
                    </button>

                    {!sidebarCollapsed && <div className="flex items-center gap-8 max-md:hidden">
                        {navItems.map((item) => (
                            <button
                                onClick={() => scrollToSection(item.id)}
                                key={item.id}
                                className={`relative group transition-colors  hover:text-foreground ${activeSection == item.id ? 'text-portfolio-accent' : 'text-muted-foreground'}`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 w-0 rounded-2xl group-hover:w-full ${activeSection == item.id ? 'w-full' : ''} transition-all duration-300 bg-(--portfolio-accent)`}></span>
                            </button>
                        ))}
                    </div>}

                    <div className="flex gap-2">
                        <ThemeToggle />
                        {
                            sidebarCollapsed && <button
                                onClick={() => setSidebarOpen(true)}
                                className='p-2 rounded-xl hover:bg-accent transition-all duration-300 hover:scale-110'>
                                <List className="w-5 h-5 text-foreground" />
                            </button>
                        }
                    </div>
                </div>
            </nav>
            <Sidebar
                isOpen={sidebarOpen}
                setClose={() => setSidebarOpen(false)}
            />
        </>
    );
}