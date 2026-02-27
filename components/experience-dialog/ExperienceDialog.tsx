import React, { ChangeEvent, useState } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputForm from '../input-form/InputForm'
import TextareaForm from '../textarea-form/TextareaForm'

function ExperienceDialog({ isOpen, isEdit, setOpen }: { isOpen: boolean, isEdit: boolean, setOpen: (val: boolean) => void }) {
    const [technology, setTechnology] = useState('');

    const [formData, setFormData] = useState({
        company: "Google",
        role: "Frontend Developer",
        description: "Worked on building scalable web applications using React and improving performance and UI consistency.",
        startDate: "2022-06-01",
        endDate: "2024-01-01",
        current: false,
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.currentTarget as HTMLInputElement;
        const { name, value, type, checked } = target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            e.preventDefault();
            const technologies = [...formData.technologies];
            if (technology && !technologies.includes(technology)) {
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

    const removeTechnology = (techToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            technologies: prev.technologies.filter(tech => tech !== techToRemove)
        }));
    }

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4 justify-center z-50 ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='space-y-6 w-140 p-8 bg-background rounded-md border border-border shadow-accent-foreground max-h-[90vh] overflow-y-auto mt-10 mb-10'>
                <DialogHeader
                    title={isEdit ? 'Edit Experience' : 'Add New Experience'}
                    desc={isEdit ? 'Update the details of your professional experience' : 'Add a new role to your portfolio'}
                    onClick={() => setOpen(false)}
                />

                <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputForm
                            id={'role'}
                            label='Role / Title'
                            placeholder="e.g. Frontend Developer"
                            name='role'
                            value={formData.role}
                            handleChange={handleChange}
                        />
                        <InputForm
                            id={'company'}
                            label='Company'
                            placeholder="e.g. Google"
                            name='company'
                            value={formData.company}
                            handleChange={handleChange}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputForm
                            id={'startDate'}
                            label='Start Date'
                            placeholder=""
                            name='startDate'
                            type="date"
                            value={formData.startDate}
                            handleChange={handleChange}
                        />
                        <div className='flex flex-col justify-start gap-1'>
                            <InputForm
                                id={'endDate'}
                                label='End Date'
                                placeholder=""
                                name='endDate'
                                type="date"
                                value={formData.current ? '' : formData.endDate}
                                handleChange={handleChange}
                            // Disable if current is true (though InputForm doesn't support disabled yet, we can handle purely in state or pass an empty string)
                            />
                            <div className="flex items-center gap-2 mt-2 ml-1">
                                <input
                                    type="checkbox"
                                    id="current"
                                    name="current"
                                    checked={formData.current}
                                    onChange={handleChange}
                                    className="rounded border-border text-[color:var(--portfolio-accent)] focus:ring-[color:var(--portfolio-accent)]"
                                />
                                <label htmlFor="current" className="text-sm font-medium">I currently work here</label>
                            </div>
                        </div>
                    </div>

                    <TextareaForm
                        id={'description'}
                        label='Description'
                        placeholder="Describe your responsibilities and achievements..."
                        name='description'
                        value={formData.description}
                        handleChange={handleChange}
                    />

                    <div className='space-y-2'>
                        <InputForm
                            id={'technologies'}
                            label='Technologies (Press Enter to add)'
                            placeholder="e.g. React, Node.js"
                            value={technology}
                            name='technologies'
                            handleChange={(e) => setTechnology(e.target.value)}
                            onKeyDown={onKeyDown}
                        />
                        <div className='flex items-center gap-2 flex-wrap mt-2'>
                            {formData.technologies.map((tech, idx) => (
                                <span key={idx} className='bg-accent text-sm py-1 px-3 rounded-full flex items-center gap-1 border border-border/50'>
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => removeTechnology(tech)}
                                        className="text-muted-foreground hover:text-destructive ml-1 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                            {formData.technologies.length === 0 && (
                                <span className="text-xs text-muted-foreground italic">No technologies added yet</span>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center justify-end gap-4 pt-6'>
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

export default ExperienceDialog
