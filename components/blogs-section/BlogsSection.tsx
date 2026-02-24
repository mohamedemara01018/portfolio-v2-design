import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ArrowRight, Calendar, Clock } from 'lucide-react';

function BlogsSection() {
    const blogPosts = [
        {
            title: "Building Scalable React Applications",
            excerpt:
                "Learn best practices for structuring large-scale React applications with modern patterns and techniques.",
            image:
                "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNDE4ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
            date: "February 15, 2026",
            readTime: "8 min read",
            category: "React",
        },
        {
            title: "Mastering TypeScript for Better Code",
            excerpt:
                "Deep dive into TypeScript features that help you write safer and more maintainable code.",
            image:
                "https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBqYXZhc2NyaXB0fGVufDF8fHx8MTc3MTUxNDk5NHww&ixlib=rb-4.1.0&q=80&w=1080",
            date: "February 10, 2026",
            readTime: "6 min read",
            category: "TypeScript",
        },
        {
            title: "The Future of Web Development",
            excerpt:
                "Exploring emerging technologies and trends that will shape the future of web development.",
            image:
                "https://images.unsplash.com/photo-1771189956777-575006b6b145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc3MTQ0MzcwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
            date: "February 5, 2026",
            readTime: "10 min read",
            category: "Technology",
        },
        {
            title: "Optimizing Web Performance",
            excerpt:
                "Practical tips and techniques to improve your website's loading speed and overall performance.",
            image:
                "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxNDU2NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
            date: "January 28, 2026",
            readTime: "7 min read",
            category: "Performance",
        },
    ];
    return (
        <section id='blog' className='bg-(--portfolio-bg-secondary) py-24'>
            <div className='wrapper space-y-12'>
                <div className='flex flex-col items-center gap-4'>
                    <TitleOfSection title={'Latest Articles'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Sharing knowledge and insights from my journey in tech
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.map((post, index) => (
                        <article
                            key={index}
                            className="group rounded-2xl bg-card border border-border hover:border-(--portfolio-accent) overflow-hidden transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) hover:-translate-y-1"
                        >
                            <div className="relative overflow-hidden aspect-video">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-medium bg-(--portfolio-accent) text-white rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-(--portfolio-accent) transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                                <button className="flex items-center gap-2 text-(--portfolio-accent) hover:gap-3 transition-all font-medium">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button className="px-6 py-3 border-2 border-(--portfolio-accent) text-(--portfolio-accent) hover:bg-(--portfolio-accent) hover:text-white rounded-lg transition-all duration-300 hover:scale-105">
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    )
}

export default BlogsSection