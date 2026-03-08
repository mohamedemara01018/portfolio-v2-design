'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import { Plus, SquarePen, Trash } from 'lucide-react'
import { useState } from 'react';

import SkillDialog from '@/components/skill-dialog/SkillDialog';
import { SkillsData, SkillService } from '@/services/skill.service';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Notification, { NotificationState } from '@/components/notification/Notification';

function DashboardSkillsPage({ skills }: { skills: SkillsData[] }) {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<NotificationState | null>(null)
    const [skill, setSkill] = useState<SkillsData>({
        name: "",
        category: '',
        level: 0,
        icon: "",
    });

    const router = useRouter();

    const handleEdit = (skill: SkillsData) => {
        setEdit(true);
        setOpen(true);
        setSkill(skill)

    };

    const handleCreate = () => {
        setEdit(false);
        setOpen(true);
        setSkill({
            name: "",
            category: '',
            level: 0,
            icon: "",
        })

    };

    const deleteSkill = async (id: string) => {
        try {
            if (confirm('are you sure to delete this skill')) {
                await SkillService.deleteSkill(id);
                setNotification({ message: 'success delete notification', type: 'success' })
            }
        } catch (error: any) {
            console.error(error.message || 'Error delete skill');
            setNotification({ message: 'Error delete notification', type: 'error' })
        } finally {
            router.refresh();
        }
    }

    const filteredSkills = skills.filter((skill) => {
        return skill.name.toLowerCase().includes(searchTerm) ||
            skill.category.toLowerCase().includes(searchTerm);

    })


    return (
        <>
            <div className='space-y-8 w-full '>
                <DashboardPageHeader
                    title='Skills'
                    desc='Manage your technical skills'
                    action={{ label: 'Add Skill', icon: <Plus className="w-4 h-4" />, onClick: handleCreate }}
                />

                <SearchInput id='searchskills' placeholder='Search skills...' search={setSearchTerm} />

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
                            {filteredSkills.length == 0 ?
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No skills found.</td></tr>
                                : filteredSkills.map((skill, idx) => (
                                    <tr key={idx} className="border-t border-border">
                                        <td className="px-4 py-3 font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-6 h-6">
                                                    <Image
                                                        src={typeof skill.icon == 'string' ? skill.icon : 'https://images.pexels.com/photos/417458/pexels-photo-417458.jpeg'}
                                                        alt={skill.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="24px"
                                                    />
                                                </div>
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
                                                    <div className="h-full bg-(--portfolio-accent) rounded-full transition-all duration-500" style={{ width: `${skill.level}%` }}></div>
                                                </div>
                                                <span className="text-sm text-muted-foreground w-8">{skill.level}%</span>
                                            </div>
                                        </td>
                                        <td className='px-4 py-3'>
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => handleEdit(skill)} className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors' aria-label={`Edit ${skill.name}`}>
                                                    <SquarePen className='w-4 h-4' />
                                                </button>
                                                <button onClick={() => deleteSkill(skill._id!)} className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-white rounded-md flex items-center justify-center transition-colors' aria-label={`Delete ${skill.name}`}>
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

            <SkillDialog isOpen={isOpen} isEdit={isEdit} setOpen={setOpen} skill={skill} setNotification={setNotification} />
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </>
    )
}

export default DashboardSkillsPage
