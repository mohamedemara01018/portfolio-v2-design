import ThemeToggle from "../theme-toggle/ThemeToggle";


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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b-2">
            <div className="wrapper flex items-center justify-between">
                <button>
                    <h1 className="hover:text-(--portfolio-accent)">portfolio</h1>
                </button>

                <div className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className="relative group transition-colors text-muted-foreground hover:text-foreground"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-2xl group-hover:w-full transition-all duration-300 bg-[var(--portfolio-accent)]"></span>
                        </button>
                    ))}
                </div>
                    
                <ThemeToggle />
            </div>
        </nav>
    );
}