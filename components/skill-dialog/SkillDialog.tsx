import React, { ChangeEvent, useEffect, useState } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputFile from '../input-file/InputFile'
import InputForm from '../input-form/InputForm'
import { SkillsData, SkillService } from '@/services/skill.service'
import { useRouter } from 'next/navigation'
import { NotificationState } from '../notification/Notification'

function SkillDialog({ isOpen, isEdit, setOpen, skill, setNotification }: { isOpen: boolean, isEdit: boolean, setOpen: (val: boolean) => void, skill: SkillsData, setNotification: (notification: NotificationState) => void },) {
    const [formData, setFormData] = useState(skill);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setFormData({ ...skill })
    }, [skill])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: name === 'level' ? Number(value) : value,
            };
        });
    };

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.currentTarget.files?.[0];

        if (!file) return;

        setFormData(prev => ({
            ...prev,
            icon: file
        }));

    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const newFormData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {

            if (key === 'icon') {

                if (value instanceof File) {
                    newFormData.append(key, value);
                }

            } else if (key !== '_id' && key !== 'id') {

                newFormData.append(key, String(value));

            }

        });


        setLoading(true)
        try {

            if (isEdit) {
                await SkillService.updateSkill(skill._id!, newFormData);
                setNotification({ message: 'success editing skill', type: 'success' })
            } else {
                await SkillService.createSkill(newFormData);
                setNotification({ message: 'success createing skill', type: 'success' })

            }

            router.refresh()
            setOpen(false)

        } catch (error: any) {

            console.error(error.message || `Error ${isEdit ? 'update' : 'create'} Skill`);
            setNotification({ message: String(error) || 'error createing skill', type: 'error' })

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4 justify-center z-50 ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='space-y-8 w-140 p-8 bg-background rounded-md border border-border shadow-accent-foreground'>
                <DialogHeader
                    title={isEdit ? 'Edit Skill' : 'Add New Skill'}
                    desc={isEdit ? 'Update the details of your technical skill' : 'Add a new technical skill to your portfolio'}
                    onClick={() => setOpen(false)}
                />

                <form onSubmit={handleSubmit} className='space-y-4'>

                    <InputFile id='file' label='Icon' name='icon' onChange={handleChangeFile} />

                    <InputForm
                        id={'name'}
                        label='Skill Name'
                        placeholder="e.g. React"
                        name='name'
                        value={formData.name}
                        handleChange={handleChange}
                    />

                    <div className='flex flex-col items-start gap-1 w-full'>
                        <label htmlFor={'category'} >{'Category'}</label>
                        <select id='category' name='category' value={formData.category} className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' onChange={handleChange}>
                            <option value="">select category</option>
                            <option value="frontend">frontend</option>
                            <option value="backend">backend</option>
                            <option value="database">database</option>
                            <option value="tools">tools</option>
                            <option value="devops">devops</option>
                            <option value="design">design</option>
                        </select>
                    </div>

                    <InputForm
                        id={'level'}
                        label='Level (%)'
                        placeholder="0-100"
                        name='level'
                        value={formData.level.toString()}
                        handleChange={handleChange}
                        type="number"
                        min="0"
                        max="100"
                    />

                    <div className='flex items-center justify-end gap-4 pt-4'>
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className='w-25 p-2 border border-border rounded-md hover:bg-accent hover:scale-110 transition duration-300'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='min-w-25 p-2 border border-border rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) hover:scale-110 transition duration-300 text-white'
                        >
                            {loading ? 'processing..' : isEdit ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SkillDialog
