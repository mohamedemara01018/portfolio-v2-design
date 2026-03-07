import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { blogData } from '@/services/blog.service';

interface BlogsSectionProps {
    blogs: blogData[]; // Replace with exact interface from blog.service if needed
}

function BlogsSection({ blogs }: BlogsSectionProps) {
    const validBlogs = Array.isArray(blogs) ? blogs.filter(b => b.published !== false) : [];

    if (validBlogs.length === 0) return null;
    console.log(validBlogs)
    return (
        <section id='blog' className='bg-(--portfolio-bg-secondary) py-24'>
            <div className='wrapper space-y-12'>
                <div className='flex flex-col items-center gap-4'>
                    <TitleOfSection title={'Latest Articles'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Sharing knowledge and insights from my journey in tech
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {validBlogs.slice(0, 3).map((post) => (
                        <Link href={`/blog/${post._id}`} key={post._id} className="block group">
                            <article
                                className="h-full rounded-2xl bg-card border border-border hover:border-(--portfolio-accent) overflow-hidden transition-all duration-300 shadow-(color:--portfolio-shadow) hover:shadow-(color:--portfolio-glow) hover:-translate-y-1 flex flex-col"
                            >
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={typeof post.coverImage === 'string' ? post.coverImage : "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzcxNDE4ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080"}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="absolute top-4 left-4 ">
                                            {
                                                JSON.parse(post.tags[0]).map((tag: string, idx: number) => {
                                                    return <span key={idx} className="px-3 py-1 mr-1 text-xs font-medium bg-(--portfolio-accent) text-white rounded-full">
                                                        {tag}
                                                    </span>
                                                })
                                            }

                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString().split('T')[0] : 'Recent'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {Math.ceil((post.content?.length || 0) / 1000) || 5} min read
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-(--portfolio-accent) transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                                    <div className="flex items-center gap-2 text-(--portfolio-accent) group-hover:gap-3 transition-all font-medium mt-auto">
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                {/* <div className="text-center mt-12">
                    <button className="px-6 py-3 border-2 border-(--portfolio-accent) text-(--portfolio-accent) hover:bg-(--portfolio-accent) hover:text-white rounded-lg transition-all duration-300 hover:scale-105">
                        View All Articles
                    </button>
                </div> */}
            </div>
        </section>
    )
}

export default BlogsSection