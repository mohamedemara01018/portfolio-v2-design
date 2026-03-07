'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import Notification, { NotificationState } from '@/components/notification/Notification';
import ProjectDialog from '@/components/project-dialog/ProjectDialog';
import SearchInput from '@/components/search-input/SearchInput'
import { projectService } from '@/services/project.service';
import { Plus, SquarePen, Trash } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export interface Project {
    _id?: string;
    id?: number | string;
    title: string;
    description: string;
    technologies: string[];
    category: string;
    coverImage: File | string;
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
    views: number;
}


function DashboardProjectPage({ projects }: { projects: Project[] }) {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [project, setProject] = useState<Project>({
        title: '',
        description: '',
        technologies: [],
        category: '',
        coverImage: '',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        views: 0
    });

    const [notification, setNotification] = useState<NotificationState | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();



    const filteredProjects = (projects || []).filter((project) => {
        return project.title?.toLowerCase().includes(searchTerm.toLowerCase())
            || (project.technologies || []).includes(searchTerm)
    })



    const handleEdit = (project: Project) => {
        setEdit(true)
        setOpen(true)
        setProject(project)
    }

    const handleDelete = async (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
            try {
                const id = project._id || project.id;
                await projectService.deleteProject(id!);
                router.refresh();
                setNotification({ message: 'delete project success', type: 'success' })
            } catch (error) {
                setNotification({ message: 'Error delete project', type: 'error' })
                console.error('Error deleting project:', error);
            }
        }
    }

    const openCreate = () => {

        setEdit(false);

        setProject({
            title: '',
            description: '',
            technologies: [],
            category: '',
            coverImage: '',
            liveUrl: '',
            githubUrl: '',
            featured: true,
            views: 0,
        });

        setOpen(true);
    }

    const handleSubmit = async (formData: FormData) => {
        try {
            setLoading(true)
            if (isEdit) {
                const id = project?._id || project?.id;
                await projectService.updateProject(id!, formData);
                setNotification({ message: 'update project success', type: 'success' })
            } else {
                await projectService.createNewProject(formData);
                setNotification({ message: 'create project success', type: 'success' })
            }
            setOpen(false);
            router.refresh();
        } catch (error: any) {
            setNotification({ message: error.message || 'update project success', type: 'error' })
            console.error('Error submitting project:', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='space-y-8 w-full max-w-full overflow-hidden'>
                <DashboardPageHeader title='Projects' desc='Manage your portfolio projects' action={{ label: 'New Project', icon: <Plus />, onClick: openCreate }} />
                <SearchInput id='searchprojects' placeholder='Search projects...' search={setSearchTerm} />

                <div className='w-full overflow-x-auto border border-border rounded-md custom-scrollbar'>
                    <table className="min-w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Cover</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Title</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Description</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Category</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Live URL</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">GitHub</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Technologies</th>
                                <th className="px-4 py-3 text-left whitespace-nowrap">Views</th>
                                <th className="px-4 py-3 text-right sticky right-0 bg-muted whitespace-nowrap shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">Actions</th>
                            </tr>
                        </thead>

                        <tbody className='divide-y divide-border'>
                            {
                                filteredProjects.length <= 0 ?
                                    <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No projects found.</td></tr>
                                    : filteredProjects.map((project: Project, idx) => {
                                        return (

                                            <tr key={idx} className="hover:bg-accent/30 transition-colors">
                                                <td className="px-4 py-3">
                                                    <img
                                                        src={(typeof project.coverImage === 'string' ? project.coverImage : '') || "https://images.pexels.com/photos/35751130/pexels-photo-35751130.jpeg"}
                                                        alt="cover image"
                                                        className="w-16 h-16 rounded-md object-cover"
                                                    />
                                                </td>

                                                <td className="px-4 py-3 font-medium whitespace-nowrap">
                                                    {project.title}
                                                </td>

                                                <td className="px-4 py-3 max-w-xs truncate">
                                                    {project.description}
                                                </td>

                                                <td className="px-4 py-3 capitalize whitespace-nowrap">
                                                    {project.category}
                                                </td>

                                                <td className="px-4 py-3 max-w-xs truncate text-blue-500">
                                                    <Link href={typeof project.liveUrl === 'string' ? project.liveUrl : '/'} target='_blank'>
                                                        {project.liveUrl}
                                                    </Link>
                                                </td>

                                                <td className="px-4 py-3 max-w-xs truncate text-blue-500">
                                                    <Link href={typeof project.githubUrl === 'string' ? project.githubUrl : '/'} target='_blank'>
                                                        {project.githubUrl}
                                                    </Link>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex flex-wrap gap-1 min-w-37.5">
                                                        {
                                                            project && project.technologies && (
                                                                Array.isArray(project.technologies) ?
                                                                    (project.technologies.length > 0 && typeof project.technologies[0] === 'string' && project.technologies[0].startsWith('[') ?
                                                                        JSON.parse(project.technologies[0]) : project.technologies
                                                                    ).map((technology: string, tIdx: number) => (
                                                                        <span key={tIdx} className="bg-accent text-[10px] rounded-full px-2 py-0.5 whitespace-nowrap">{technology}</span>
                                                                    )) : null
                                                            )
                                                        }
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    {project.views}
                                                </td>
                                                <td className='px-4 py-3 sticky right-0 bg-background/80 backdrop-blur-sm shadow-[-2px_0_5px_rgba(0,0,0,0.05)]'>
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button type='button' onClick={() => handleEdit(project)} className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                            <SquarePen className='w-4 h-4' />
                                                        </button>
                                                        <button type='button' onClick={() => handleDelete(project)} className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-white rounded-md flex items-center justify-center transition-colors'>
                                                            <Trash className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr >
                                        )
                                    })
                            }

                        </tbody>
                    </table>
                </div>
            </div >

            <ProjectDialog isOpen={isOpen} isEdit={isEdit} loading={loading} setOpen={setOpen} onSubmit={handleSubmit} project={project} />
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </>
    )
}

export default DashboardProjectPage