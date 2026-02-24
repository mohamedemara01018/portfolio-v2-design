import React from 'react'
interface TitleOfSectionProps {
    title: string
}
function TitleOfSection({ title }: TitleOfSectionProps) {
    return (
        <div>
            <h2 className="text-4xl font-bold text-foreground mb-2 text-center">{title}</h2>
            <div className="w-20 h-1 bg-(--portfolio-accent) mx-auto rounded-full"></div>
        </div>
    )
}

export default TitleOfSection