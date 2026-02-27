'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import { Plus, SquarePen, Trash } from 'lucide-react'
import { useState } from 'react';

import SkillDialog from '@/components/skill-dialog/SkillDialog';

function DashboardSkillsPage() {
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

    const skills = [
        { name: 'React', category: 'Frontend', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'TypeScript', category: 'Frontend', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'Node.js', category: 'Backend', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Tailwind CSS', category: 'Frontend', level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'PostgreSQL', category: 'Backend', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
        { name: 'Docker', category: 'DevOps', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    ];

    return (
        <>
            <div className='space-y-8 w-full '>
                <DashboardPageHeader
                    title='Skills'
                    desc='Manage your technical skills'
                    action={{ label: 'Add Skill', icon: <Plus className="w-4 h-4" />, onClick: handleCreate }}
                />

                <SearchInput id='searchskills' placeholder='Search skills...' onClick={() => { }} />

                <div className='w-full overflow-x-auto '>
                    <table className="min-w-full border border-border rounded-md text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Skill</th>
                                <th className="px-4 py-3 text-center font-medium">Category</th>
                                <th className="px-4 py-3 text-left w-1/3 font-medium">Level</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {skills.map((skill, idx) => (
                                <tr key={idx} className="border-t border-border">
                                    <td className="px-4 py-3 font-medium">
                                        <div className="flex items-center gap-3">
                                            <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                                            {skill.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="bg-transparent text-xs rounded-full px-3 py-1 border border-border text-foreground font-medium">
                                            {skill.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-[color:var(--portfolio-accent)] rounded-full transition-all duration-500" style={{ width: `${skill.level}%` }}></div>
                                            </div>
                                            <span className="text-sm text-muted-foreground w-8">{skill.level}%</span>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3'>
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

            <SkillDialog isOpen={isOpen} isEdit={isEdit} setOpen={setOpen} />
        </>
    )
}

export default DashboardSkillsPage
