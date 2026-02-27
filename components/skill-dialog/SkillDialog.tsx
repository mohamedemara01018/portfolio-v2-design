import React, { ChangeEvent, useState } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputFile from '../input-file/InputFile'
import InputForm from '../input-form/InputForm'

function SkillDialog({ isOpen, isEdit, setOpen }: { isOpen: boolean, isEdit: boolean, setOpen: (val: boolean) => void }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        level: 0,
        icon: "",
    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: name === 'level' ? Number(value) : value,
            };
        });
    };

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4 justify-center z-50 ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='space-y-8 w-140 p-8 bg-background rounded-md border border-border shadow-accent-foreground'>
                <DialogHeader
                    title={isEdit ? 'Edit Skill' : 'Add New Skill'}
                    desc={isEdit ? 'Update the details of your technical skill' : 'Add a new technical skill to your portfolio'}
                    onClick={() => setOpen(false)}
                />

                <form action="" className='space-y-4'>
                    {/* Icon section - simple URL or File upload based on existing pattern */}
                    <InputForm
                        id={'icon'}
                        label='Icon URL'
                        placeholder="Provide an SVG URL for the skill icon"
                        name='icon'
                        value={formData.icon}
                        handleChange={handleChange}
                    />

                    <InputForm
                        id={'name'}
                        label='Skill Name'
                        placeholder="e.g. React"
                        name='name'
                        value={formData.name}
                        handleChange={handleChange}
                    />

                    <InputForm
                        id={'category'}
                        label='Category'
                        placeholder="e.g. Frontend, Backend, DevOps"
                        name='category'
                        value={formData.category}
                        handleChange={handleChange}
                    />

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
                            type='button'
                            className='w-25 p-2 border border-border rounded-md bg-[color:var(--portfolio-accent)] hover:bg-[color:var(--portfolio-accent-hover)] hover:scale-110 transition duration-300 text-white'
                        >
                            {isEdit ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SkillDialog
