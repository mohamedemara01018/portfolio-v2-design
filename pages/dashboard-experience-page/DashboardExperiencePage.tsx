'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import ExperienceDialog from '@/components/experience-dialog/ExperienceDialog';
import { Plus, SquarePen, Trash, Calendar, Building2 } from 'lucide-react'
import { useState } from 'react';

function DashboardExperiencePage() {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
        setOpen(true);
    };

    const handleCreate = () => {
        setEdit(false);
        setOpen(true);
    };

    const experiences = [
        {
            company: "Google",
            role: "Frontend Developer",
            description: "Worked on building scalable web applications using React and improving performance and UI consistency.",
            startDate: "2022-06-01",
            endDate: "2024-01-01",
            current: false,
            technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
        }
    ];

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <>
            <div className='space-y-8 w-full '>
                <DashboardPageHeader
                    title='Experience'
                    desc='Manage your professional experience'
                    action={{ label: 'Add Experience', icon: <Plus className="w-4 h-4" />, onClick: handleCreate }}
                />

                <SearchInput id='searchexperience' placeholder='Search experience...' onClick={() => { }} />

                <div className='w-full overflow-x-auto '>
                    <table className="min-w-full border border-border rounded-md text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Role & Company</th>
                                <th className="px-4 py-3 text-left font-medium">Duration</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                                <th className="px-4 py-3 text-left font-medium">Technologies</th>
                                <th className="px-4 py-3 text-right font-medium min-w-[100px]">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {experiences.map((exp, idx) => (
                                <tr key={idx} className="border-t border-border">
                                    <td className="px-4 py-3 font-medium align-top">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base">{exp.role}</span>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Building2 className="w-3 h-3" />
                                                <span>{exp.company}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-top whitespace-nowrap">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 text-sm bg-accent/50 px-2 py-1 rounded-md w-fit">
                                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                                <span>{formatDate(exp.startDate)}</span>
                                                <span className="text-muted-foreground mx-1">-</span>
                                                <span>{exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <p className="text-muted-foreground text-sm line-clamp-2 max-w-md">
                                            {exp.description}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {exp.technologies.map(tech => (
                                                <span key={tech} className="bg-accent text-xs rounded-full px-2 py-1 border border-border/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className='px-4 py-3 align-top'>
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={handleEdit} className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                <SquarePen className='w-4 h-4' />
                                            </button>
                                            <button className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-destructive-foreground rounded-md flex items-center justify-center transition-colors'>
                                                <Trash className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ExperienceDialog isOpen={isOpen} isEdit={isEdit} setOpen={setOpen} />
        </>
    )
}

export default DashboardExperiencePage
