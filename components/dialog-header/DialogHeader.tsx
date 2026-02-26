import { X } from 'lucide-react'
import React, { ReactNode } from 'react'
interface DialogHeaderProps {
    title: string,
    desc: string,
    onClick: () => void,
}
function DialogHeader({ title, desc, onClick }: DialogHeaderProps) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start gap-2'>
                <h1 className='text-xl font-bold '>{title}</h1>
                <p className='text-muted-foreground'>{desc}</p>
            </div>

            <button onClick={onClick} className='flex gap-2 items-center p-1  rounded-full bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) hover:scale-110 transition duration-300 text-white'>
                <X />
            </button>
        </div>
    )
}

export default DialogHeader