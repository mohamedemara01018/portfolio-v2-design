'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import ProjectDialog from '@/components/project-dialog/ProjectDialog';
import SearchInput from '@/components/search-input/SearchInput'
import { Plus, SquarePen, Trash } from 'lucide-react'
import Link from 'next/link';
import { useState } from 'react';


function DashboardProjectPage() {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false)

    const handleEdit = () => {
        setEdit(true)
        setOpen(true)
    }
    return (
        <>
            <div className='space-y-8 w-full '>
                <DashboardPageHeader title='Projects' desc='Manage your portfolio projects' action={{ label: 'New Project', icon: <Plus />, onClick: () => setOpen(true) }} />
                <SearchInput id='searchprojects' placeholder='Search projects...' onClick={() => { }} />
                <div className='w-full overflow-x-auto  '>
                    <table className="min-w-full border border-border rounded-md text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left">Cover</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Live URL</th>
                                <th className="px-4 py-3 text-left">GitHub</th>
                                <th className="px-4 py-3 text-left">Technologies</th>
                                <th className="px-4 py-3 text-left">Views</th>
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

                                <td className="px-4 py-3 capitalize">
                                    fullstack
                                </td>

                                <td className="px-4 py-3 max-w-50 truncate text-blue-500">
                                    <Link href={' https://myecommerceapp.com'}>
                                        https://myecommerceapp.com
                                    </Link>
                                </td>

                                <td className="px-4 py-3 max-w-50 truncate text-blue-500">
                                    <Link href={'https://github.com/username/ecommerce-platform'}>
                                        https://github.com/username/ecommerce-platform
                                    </Link>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1 max-w-50">
                                        <span className="bg-accent text-xs rounded-full px-2 py-1">React</span>
                                        <span className="bg-accent text-xs rounded-full px-2 py-1">Node</span>
                                        <span className="bg-accent text-xs rounded-full px-2 py-1">Stripe</span>
                                        <span className="bg-accent text-xs rounded-full px-2 py-1">MongoDB</span>
                                    </div>
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
            <ProjectDialog isOpen={isOpen} isEdit={isEdit} setOpen={setOpen} />
        </>
    )
}

export default DashboardProjectPage