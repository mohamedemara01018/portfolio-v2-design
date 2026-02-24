import React from 'react'

function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2026 Mohamed Emara. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-(--portfolio-accent) transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-(--portfolio-accent) transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer