import React, { ChangeEvent, useEffect, useState } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputFile from '../input-file/InputFile'
import InputForm from '../input-form/InputForm'
import TextareaForm from '../textarea-form/TextareaForm'
import { Project } from '@/views/dashboard-project-page/DashboardProjectPage'


interface ProjectDialogProbs {
    isOpen: boolean,
    isEdit: boolean,
    loading: boolean,
    onSubmit: (formData: FormData) => void,
    setOpen: (val: boolean) => void,
    project: Project
}

function ProjectDialog({ isOpen, isEdit, loading, setOpen, onSubmit, project }: ProjectDialogProbs) {

    const [technology, setTechnology] = useState('');
    const [formData, setFormData] = useState<Project>({ ...project });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({ ...project })
    }, [project])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;

        if (name == 'coverImage') {
            const target = e.target as HTMLInputElement;

            if (target.files && target.files[0]) {
                setFormData(prev => ({ ...prev, coverImage: target.files![0] }));
                return
            }
        }
        setFormData((prev) => {

            return {
                ...prev,
                [name]: value,
            };

        });
    };


    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            const technologies = [...formData.technologies];
            if (technology) {
                technologies.push(technology)
            }
            setFormData((prev) => {
                return {
                    ...prev,
                    technologies
                }
            })
            setTechnology('');
        }
    }

    const removeTechnology = (index: number) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "technologies") {
                newFormData.append(key, JSON.stringify(value));
            } else if (key === "coverImage" && value instanceof File) {
                newFormData.append(key, value);
            } else if (key === "_id" || key === "id" || key === "views") {
                // skip or handle separately if needed
            } else {
                newFormData.append(key, String(value));
            }
        });

        onSubmit(newFormData)

    }

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4  justify-center ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm z-50 overflow-auto`}>
            <div className='space-y-8 w-140 p-8 bg-background rounded-md border border-border  shadow-accent-foreground'>
                <DialogHeader title={isEdit ? 'Edit Project' : 'Create New Project'} desc={isEdit ? 'Update the project details below' : 'Add a new project to your portfolio'} onClick={() => setOpen(false)} />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <InputFile id='file' label='Upload image' name="coverImage" onChange={handleChange} />
                    <InputForm id={'title'} label='Title' placeholder="Project title" name='title' value={formData.title} handleChange={handleChange} />
                    <TextareaForm id={'description'} label='Description' placeholder="Brief description" name='description' value={formData.description} handleChange={handleChange} />
                    {/* <InputForm id={'category'} label='Category' placeholder="Project category" name='category' value={formData.category} handleChange={handleChange} /> */}
                    <div className='flex flex-col items-start gap-1 w-full'>
                        <label htmlFor={'category'} >{'Category'}</label>
                        <select id='category' name='category' className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' onChange={handleChange}>
                            <option value="">select category</option>
                            <option value="frontend">frontend</option>
                            <option value="backend">backend</option>
                            <option value="fullstack">fullstack</option>
                        </select>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputForm id={'liveUrl'} label='Live Url' placeholder="Project live Url" name='liveUrl' value={formData.liveUrl} handleChange={handleChange} />
                        <InputForm id={'githubUrl'} label='Github Url' placeholder="Project githubUrl" name='githubUrl' value={formData.githubUrl} handleChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <InputForm id={'technologies'} label='Technologies' placeholder="Project technologies" value={technology} name='technologies' handleChange={(e) => setTechnology(e.target.value)} onKeyDown={onKeyDown} required={false} />
                        <div className='flex items-center gap-2 flex-wrap'>
                            {
                                formData.technologies.map((tech: string, idx: number) => {
                                    return (
                                        <span key={idx} onClick={() => removeTechnology(idx)} className='bg-accent py-1 px-2 rounded-xl cursor-pointer hover:bg-destructive hover:text-white transition-colors'>{tech}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <button type='button' disabled={loading} onClick={() => setOpen(false)} className='w-25 p-2 border border-border rounded-md  hover:bg-accent hover:scale-110 transition duration-300'>Cancel</button>
                        <button type="submit" disabled={loading} className='max-w-25 p-2 border border-border rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) hover:scale-110 transition duration-300 text-white'>
                            {loading ? 'processing...' : isEdit ? `Update` : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProjectDialog
