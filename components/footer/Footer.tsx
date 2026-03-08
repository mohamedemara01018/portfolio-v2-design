import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-border bg-card/10">
            <div className="wrapper">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="text-xl font-bold lowercase tracking-tighter hover:text-(--portfolio-accent) transition-colors">
                            portfolio
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Mohamed Emara. Built with Next.js & Framer Motion.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link
                            href="/privacy"
                            className="text-sm font-medium text-muted-foreground hover:text-(--portfolio-accent) transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm font-medium text-muted-foreground hover:text-(--portfolio-accent) transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer