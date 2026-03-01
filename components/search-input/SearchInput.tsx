'use client';

import { Search } from 'lucide-react'
import React, { useState } from 'react'

interface SearchInputProbs {
    id: string,
    placeholder: string,
    search: (title: string) => void
}
function SearchInput({ id, placeholder, search }: SearchInputProbs) {
    const [isFoucs, setFoucs] = useState(false)

    return (
        <div className={`flex items-center gap-2 p-2 w-100 bg-(--portfolio-bg-secondary) dark:bg-background border border-border rounded-md  ${isFoucs ? 'ring-2 ring-sidebar-ring' : 'ring-0'}  `}>
            <label htmlFor={id}>
                <Search className='text-muted-foreground w-5 h-5' />
            </label>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                onFocus={() => setFoucs(true)}
                onBlur={() => setFoucs(false)}
                onChange={(e) => search(e.target.value)}
                className='border-none outline-none w-full'
            />
        </div>
    )
}

export default SearchInput