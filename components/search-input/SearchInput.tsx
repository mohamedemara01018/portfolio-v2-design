'use client';

import { Search } from 'lucide-react'
import React, { useState } from 'react'

interface SearchInputProbs {
    id: string,
    placeholder: string,
    onClick: () => void
}
function SearchInput({ id, placeholder, onClick }: SearchInputProbs) {
    const [isFoucs, setFoucs] = useState(false)

    return (
        <div className={`flex items-center gap-2 p-2 w-100 bg-(--portfolio-bg-secondary) dark:bg-background border border-border rounded-md  ${isFoucs ? 'ring-2 ring-sidebar-ring' : 'ring-0'}  `}>
            <label htmlFor={id}>
                <Search className='text-muted-foreground w-5 h-5' />
            </label>
            <input id={id} type="text" className='border-none outline-none w-full' placeholder={placeholder} onFocus={() => setFoucs(true)} onBlur={() => setFoucs(false)} onClick={onClick} />
        </div>
    )
}

export default SearchInput