'use client';
import React, { useState } from 'react'
import ThemeToggle from '../theme-toggle/ThemeToggle'
import { Search } from 'lucide-react'
import SearchInput from '../search-input/SearchInput';

function DashboardHeader() {
    const [isFoucs, setFoucs] = useState(false)
    return (
        <header className='wrapper py-4 border-b border-border bg-background dark:bg-(--portfolio-bg-secondary) '>
            <div className='flex justify-between'>
                <div>
                    <h1>Mohamed Emara</h1>
                </div>
                <div className='flex gap-4'>
                    <SearchInput id='search' placeholder='search...' search={() => { }} />
                    <ThemeToggle />
                </div>
            </div >
        </header >
    )
}

export default DashboardHeader