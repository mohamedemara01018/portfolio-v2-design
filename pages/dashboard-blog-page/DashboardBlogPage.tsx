'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import { BookText, SquarePen, Trash } from 'lucide-react'
import Link from 'next/link';

function DashboardBlogPage() {
    return (
        <div className='space-y-8'>
            <DashboardPageHeader title='Blog Posts' desc='Manage your blog content New Post' action={{ label: 'New post', href: '/admin/blogs/create', icon: <BookText /> }} />
            <SearchInput id='search' placeholder={'Search blog posts...'} onClick={() => { }} />
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
                        <tr className="border-t border-border">
                            <td className="px-4 py-3">
                                <img
                                    src="https://images.pexels.com/photos/35751130/pexels-photo-35751130.jpeg"
                                    alt="cover"
                                    className="w-16 h-16 rounded-md object-cover"
                                />
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Hi Platform
                            </td>

                            <td className="px-4 py-3 max-w-50 truncate">
                                Fullstack app with authentication, cart, payments
                            </td>

                            <td className="px-4 py-3 max-w-50 truncate">
                                fullstack
                            </td>

                            <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1 max-w-50">
                                    <span className="bg-accent text-xs rounded-full px-2 py-1">React</span>
                                    <span className="bg-accent text-xs rounded-full px-2 py-1">Node</span>
                                    <span className="bg-accent text-xs rounded-full px-2 py-1">Stripe</span>
                                    <span className="bg-accent text-xs rounded-full px-2 py-1">MongoDB</span>
                                </div>
                            </td>

                            <td className="px-4 py-3 capitalize">
                                True
                            </td>

                            <td className="px-4 py-3 text-center">
                                0
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardBlogPage