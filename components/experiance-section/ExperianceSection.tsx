import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { Briefcase, GraduationCap } from "lucide-react";
import { ExperienceData } from "@/services/experiance.service";

interface ExperianceSectionProps {
    experiences: ExperienceData[];
}

function ExperianceSection({ experiences }: ExperianceSectionProps) {
    // If we receive an array, we map it, otherwise just in case it's something went wrong we provide a fallback empty array.
    const timeline = Array.isArray(experiences) ? experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()) : [];
    console.log(timeline)
    if (timeline.length === 0) return null;
    return (
        <section id='experience' className='bg-(--portfolio-bg-secondary) py-24'>
            <div className='wrapper flex flex-col items-center gap-12'>
                <div className='flex flex-col items-center gap-4'>
                    <TitleOfSection title={'Experience & Education'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        My professional journey
                    </p>
                </div>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Icon */}
                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-(--portfolio-accent) flex items-center justify-center shadow-lg shadow-(--portfolio-accent)/30 z-10">
                                    {item.role && item.company ? ( // Assuming this simple check makes it work
                                        <Briefcase className="w-8 h-8 text-white" />
                                    ) : (
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    )}
                                </div>

                                {/* Content */}
                                <div
                                    className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                                        }`}
                                >
                                    <div className="p-6 rounded-xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) group">
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-(--portfolio-accent) text-white rounded-full mb-3">
                                            {new Date(item.startDate).getFullYear()} - {item.current ? 'Present' : (item.endDate ? new Date(item.endDate).getFullYear() : 'N/A')}
                                        </span>
                                        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-(--portfolio-accent) transition-colors">
                                            {item.role}
                                        </h3>
                                        <p className="text-(--portfolio-accent) font-medium mb-3">
                                            {item.company}
                                        </p>
                                        <p className="text-muted-foreground mb-4">{item.description}</p>

                                        {/* Optional: Add achievements to backend model if want to render exactly like fake data */}
                                        {(item as any).technologies && Array.isArray((item as any).technologies) && (
                                            <ul className="space-y-1">
                                                {(item as any).technologies.map((achievement: string, i: number) => (
                                                    <li
                                                        key={i}
                                                        className={`text-sm text-muted-foreground flex items-center gap-2 ${index % 2 === 0 ? "md:justify-end" : ""
                                                            }`}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-(--portfolio-accent)"></span>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperianceSection