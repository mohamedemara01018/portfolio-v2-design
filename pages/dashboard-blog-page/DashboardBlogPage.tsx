'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import { blogData } from '@/services/blog.service';
import { BookText, SquarePen, Trash } from 'lucide-react'
import Link from 'next/link';
import { useState } from 'react';



function DashboardBlogPage({ blogs }: { blogs: blogData[] }) {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter((blog) => {
        return (blog.title.toLowerCase().includes(searchTerm))
            || (blog.excerpt.toLowerCase().includes(searchTerm)
                || (blog.tags.includes(searchTerm))
            )
    })

    return (
        <div className='space-y-8'>
            <DashboardPageHeader title='Blog Posts' desc='Manage your blog content New Post' action={{ label: 'New post', href: '/admin/blogs/create', icon: <BookText /> }} />
            <SearchInput id='search' placeholder={'Search blog posts...'} search={setSearchTerm} />
            <div className='w-full overflow-x-auto  '>
                <table className="min-w-full border border-border rounded-md text-sm">
                    <thead className="bg-muted">

                        <tr>
                            <th className="px-4 py-3 text-left">Cover image</th>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">excerpt</th>
                            <th className="px-4 py-3 text-left">Content</th>
                            <th className="px-4 py-3 text-left">tags</th>
                            <th className="px-4 py-3 text-left">published</th>
                            <th className="px-4 py-3 text-left">views</th>
                            <th className="px-4 py-3 text-left">Actions</th>


                        </tr>
                    </thead>

                    <tbody>

                        {
                            filteredBlogs.length <= 0 ?
                                <tr><td className='text-center p-6' colSpan={8}>blogs not founded</td></tr>
                                : filteredBlogs.map((blog, idx) => {
                                    return < tr key={idx} className="border-t border-border">
                                        <td className="px-4 py-3">
                                            {blog.coverImage ? <img
                                                src={typeof blog.coverImage == 'string' ? blog.coverImage : ''}
                                                alt="cover"
                                                className="w-16 h-16 rounded-md object-cover"
                                            /> : ''}
                                        </td>

                                        <td className="px-4 py-3 font-medium">
                                            {blog.title}
                                        </td>

                                        <td className="px-4 py-3 max-w-50 truncate">
                                            {blog.excerpt}
                                        </td>

                                        <td className="px-4 py-3 max-w-50 truncate">
                                            {blog.content}
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-1 max-w-50">
                                                {
                                                    blog.tags && blog.tags.map((tag) =>
                                                        <span className="bg-accent text-xs rounded-full px-2 py-1">{tag}</span>)
                                                }
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 capitalize">
                                            {Boolean(blog.published) ? 'true' : 'false'}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {blog.views}
                                        </td>
                                        <td className='px-4 py-3'>
                                            <div className="flex items-center justify-end gap-1">
                                                <button className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                    <SquarePen className='w-4 h-4' />
                                                </button>
                                                <button className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-destructive-foreground rounded-md flex items-center justify-center transition-colors'>
                                                    <Trash className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default DashboardBlogPage