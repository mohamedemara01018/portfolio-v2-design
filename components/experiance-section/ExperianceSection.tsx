import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { Briefcase, GraduationCap } from "lucide-react";

function ExperianceSection() {
    const timeline = [
        {
            type: "work",
            title: "Senior Full Stack Developer",
            organization: "Tech Innovations Inc.",
            period: "2022 - Present",
            description:
                "Leading development of enterprise-scale applications. Mentoring junior developers and driving architectural decisions.",
            achievements: [
                "Improved application performance by 40%",
                "Led team of 5 developers",
                "Implemented CI/CD pipeline",
            ],
        },
        {
            type: "work",
            title: "Full Stack Developer",
            organization: "Digital Solutions Co.",
            period: "2020 - 2022",
            description:
                "Developed and maintained multiple web applications using React, Node.js, and PostgreSQL.",
            achievements: [
                "Built 10+ client projects",
                "Reduced load time by 60%",
                "Implemented responsive designs",
            ],
        },
        {
            type: "education",
            title: "Master of Computer Science",
            organization: "Stanford University",
            period: "2018 - 2020",
            description: "Specialized in Software Engineering and Human-Computer Interaction.",
            achievements: ["GPA: 3.9/4.0", "Research in UI/UX", "Teaching Assistant"],
        },
        {
            type: "work",
            title: "Frontend Developer Intern",
            organization: "StartupHub",
            period: "2019 - 2020",
            description: "Worked on building responsive web applications and learned modern frontend practices.",
            achievements: [
                "Developed 5 production features",
                "Collaborated with design team",
                "Improved code quality",
            ],
        },
        {
            type: "education",
            title: "Bachelor of Computer Science",
            organization: "University of California",
            period: "2014 - 2018",
            description: "Foundation in computer science fundamentals and software development.",
            achievements: ["Dean's List", "Honors Program", "President of CS Club"],
        },
    ];
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
                                    {item.type === "work" ? (
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
                                            {item.period}
                                        </span>
                                        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-(--portfolio-accent) transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-(--portfolio-accent) font-medium mb-3">
                                            {item.organization}
                                        </p>
                                        <p className="text-muted-foreground mb-4">{item.description}</p>
                                        <ul className="space-y-1">
                                            {item.achievements.map((achievement, i) => (
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