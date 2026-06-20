'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import SearchInput from '@/components/search-input/SearchInput'
import ExperienceDialog from '@/components/experience-dialog/ExperienceDialog';
import { Plus, SquarePen, Trash, Calendar, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react';
import { ExperianceService, ExperienceData } from '@/services/experiance.service';
import { useRouter } from 'next/navigation';

function DashboardExperiencePage() {
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const [filteredExperiences, setFilteredExperiences] = useState<ExperienceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<ExperienceData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            const res = await ExperianceService.getAllExperiance();
            if (res?.data?.experiances) {
                setExperiences(res.data.experiances);
                setFilteredExperiences(res.data.experiances);
            } else if (Array.isArray(res)) {
                setExperiences(res); // fallback
                setFilteredExperiences(res);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch experiences');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredExperiences(experiences);
            return;
        }
        const query = searchQuery.toLowerCase();
        const filtered = experiences.filter(exp =>
            exp.role?.toLowerCase().includes(query) ||
            exp.company?.toLowerCase().includes(query) ||
            exp.description?.toLowerCase().includes(query)
        );
        setFilteredExperiences(filtered);
    }, [searchQuery, experiences]);

    const handleEdit = (exp: ExperienceData) => {
        setSelectedExperience(exp);
        setEdit(true);
        setOpen(true);
    };

    const handleCreate = () => {
        setSelectedExperience(null);
        setEdit(false);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;
        try {
            await ExperianceService.deleteExperiance(id);
            await fetchExperiences();

        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete experience');
        }
    };

    const handleSave = async (data: ExperienceData) => {
        try {
            if (isEdit && selectedExperience?._id) {
                await ExperianceService.updateExperiance(selectedExperience._id, data);
            } else {
                await ExperianceService.createExperiance(data);
            }
            await fetchExperiences();
        } catch (error) {
            console.error('Save failed:', error);
            alert('Failed to save experience');
            throw error;
        }
    };

    const formatDate = (dateString?: string | null) => {
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

                <SearchInput
                    id='searchexperience'
                    placeholder='Search experience...'
                    search={(val) => setSearchQuery(val)}
                />

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
                            {
                                filteredExperiences.length == 0 ?
                                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No experiences found.</td></tr>
                                    :
                                    filteredExperiences.map((exp, idx) => (
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
                                                    {exp.technologies?.map(tech => (
                                                        <span key={tech} className="bg-accent text-xs rounded-full px-2 py-1 border border-border/50">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className='px-4 py-3 align-top'>
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => handleEdit(exp)} className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                        <SquarePen className='w-4 h-4' />
                                                    </button>
                                                    <button onClick={() => exp._id && handleDelete(exp._id)} className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-destructive-foreground rounded-md flex items-center justify-center transition-colors'>
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

            <ExperienceDialog
                isOpen={isOpen}
                isEdit={isEdit}
                setOpen={setOpen}
                selectedExperience={selectedExperience}
                onSave={handleSave}
            />
        </>
    )
}

export default DashboardExperiencePage
