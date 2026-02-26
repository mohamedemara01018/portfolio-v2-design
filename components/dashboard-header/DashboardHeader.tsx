'use client';
import React, { useState } from 'react'
import ThemeToggle from '../theme-toggle/ThemeToggle'
import { Search } from 'lucide-react'

function DashboardHeader() {
    const [isFoucs, setFoucs] = useState(false)
    return (
        <header className='wrapper py-4 border-b border-border bg-background dark:bg-(--portfolio-bg-secondary) '>
            <div className='flex justify-between'>
                <div>
                    <h1>Mohamed Emara</h1>
                </div>
                <div className='flex gap-4'>
                    <div className={`flex items-center gap-2 p-2 w-100 bg-(--portfolio-bg-secondary) dark:bg-background border border-border rounded-md  ${isFoucs ? 'ring-2 ring-sidebar-ring' : 'ring-0'}  `}>
                        <label htmlFor="search">
                            <Search className='text-muted-foreground w-5 h-5' />
                        </label>
                        <input id='search' type="text" className='border-none outline-none w-full' placeholder='search...' onFocus={() => setFoucs(true)} onBlur={() => setFoucs(false)} />
                    </div>
                    <ThemeToggle />
                </div>
            </div >
        </header >
    )
}

export default DashboardHeader