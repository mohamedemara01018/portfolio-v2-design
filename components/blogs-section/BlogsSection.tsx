'use client';
import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ArrowRight, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion'

interface Blog {
    _id?: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string[];
    views: number;
    createdAt: string;
}

interface BlogsSectionProps {
    blogs: Blog[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function BlogsSection({ blogs }: BlogsSectionProps) {
    return (
        <section id='blog' className='py-24 bg-card/30 overflow-hidden'>
            <div className='wrapper space-y-16'>
                <motion.div
                    className='flex flex-col items-center gap-4'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title={'Latest Articles'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">
                        Thoughts on software development, technology trends, and coding best practices
                    </p>
                </motion.div>

                <motion.div
                    className={`grid grid-cols-1 ${blogs.length <= 0 ? '' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {blogs.length == 0 ? <BlogsNotFound />
                        : blogs.map((blog, index) => {
                            let parsedTags = [];
                            try {
                                parsedTags = typeof blog.tags?.[0] === 'string' ? JSON.parse(blog.tags[0]) : (blog.tags || []);
                            } catch (e) {
                                parsedTags = blog.tags || [];
                            }

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className='group bg-background rounded-3xl overflow-hidden border border-border hover:border-(--portfolio-accent) transition-all duration-500 hover:shadow-(--portfolio-glow) flex flex-col'
                                >
                                    <div className='relative aspect-video overflow-hidden'>
                                        <Image
                                            src={typeof blog.coverImage === 'string' ? blog.coverImage : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
                                            alt={blog.title}
                                            fill
                                            className='object-cover group-hover:scale-110 transition-transform duration-700'
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className='absolute top-4 left-4 flex gap-2'>
                                            {Array.isArray(parsedTags) && parsedTags.slice(0, 2).map((tag: string, tagIdx: number) => (
                                                <span key={tagIdx} className='px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/50 text-white rounded-lg backdrop-blur-md'>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='p-8 flex flex-col flex-grow space-y-4'>
                                        <div className='flex items-center gap-4 text-xs text-muted-foreground font-medium'>
                                            <span className='flex items-center gap-1.5'>
                                                <Calendar className='w-3.5 h-3.5' />
                                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Recent'}
                                            </span>
                                            <span className='flex items-center gap-1.5'>
                                                <Eye className='w-3.5 h-3.5' />
                                                {blog.views || 0}
                                            </span>
                                        </div>

                                        <div className='space-y-3 flex-grow'>
                                            <h3 className='text-xl font-bold text-foreground group-hover:text-(--portfolio-accent) transition-colors line-clamp-2'>
                                                {blog.title}
                                            </h3>
                                            <p className='text-sm text-muted-foreground line-clamp-3 leading-relaxed'>
                                                {blog.excerpt || "Click to read the full article about " + blog.title}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/ blog / ${blog._id}`}
                                            className='inline-flex items-center gap-2 text-sm font-bold text-(--portfolio-accent) hover:gap-3 transition-all group/btn'
                                            aria-label={`Read more about ${blog.title}`}
                                        >
                                            Read More
                                            <ArrowRight className='w-4 h-4 transition-transform group-hover/btn:translate-x-1' />
                                        </Link>
                                    </div>
                                </motion.div >
                            );
                        })}
                </motion.div >
            </div >
        </section >
    )
}

export default BlogsSection


const BlogsNotFound = () => {
    return (
        <div className="flex items-center justify-content-center min-h-85 bg-gray-50 dark:bg-gray-900 rounded-xl p-8 ">
            <div className="text-center max-w-xs mx-auto">

                {/* Icon circle */}
                <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3l18 18" />
                    </svg>
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No blogs found
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                    We couldnt find any blogs matching your search.
                    Try adjusting your filters or check back later.
                </p>

            </div>
        </div>
    );
};
