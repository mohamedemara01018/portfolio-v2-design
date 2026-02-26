import React, { ChangeEvent, useState } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputFile from '../input-file/InputFile'
import InputForm from '../input-form/InputForm'
import TextareaForm from '../textarea-form/TextareaForm'
import SelectInput from '../select-input/SelectInput'

function ProjectDialog({ isOpen, isEdit, setOpen }: { isOpen: boolean, isEdit: boolean, setOpen: (val: boolean) => void }) {
    const [technology, setTechnology] = useState('');

    const [formData, setFormData] = useState({
        title: "hi Platform",
        description: "Fullstack app with authentication, cart, payments",
        category: "fullstack",
        coverImage: "https://example.com/images/ecommerce-cover.png",
        liveUrl: "https://myecommerceapp.com",
        githubUrl: "https://github.com/username/ecommerce-platform",
        featured: true,
        views: 0,
        technologies: ['reat', 'typescript', 'vue']
    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
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

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4  justify-center ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='space-y-8 w-140 p-8 bg-background rounded-md border border-border  shadow-accent-foreground'>
                <DialogHeader title={isEdit ? 'Edit Project' : 'Create New Project'} desc={isEdit ? 'Update the project details below' : 'Add a new project to your portfolio'} onClick={() => setOpen(false)} />
                <form action="" className='space-y-4'>
                    <InputFile id='file' label='Upload image' onClick={() => { }} />
                    <InputForm id={'title'} label='Title' placeholder="Project title" name='title' value={formData.title} handleChange={handleChange} />
                    <TextareaForm id={'description'} label='Description' placeholder="Brief description" name='description' value={formData.description} handleChange={handleChange} />
                    <InputForm id={'category'} label='Category' placeholder="Project category" name='category' value={formData.category} handleChange={handleChange} />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <InputForm id={'liveUrl'} label='Live Url' placeholder="Project live Url" name='liveUrl' value={formData.liveUrl} handleChange={handleChange} />
                        <InputForm id={'githubUrl'} label='Github Url' placeholder="Project githubUrl" name='githubUrl' value={formData.githubUrl} handleChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <InputForm id={'technologies'} label='Technologies' placeholder="Project technologies" value={technology} name='technologies' handleChange={(e) => setTechnology(e.target.value)} onKeyDown={onKeyDown} />
                        <div className='flex items-center gap-2 flex-wrap'>
                            {
                                formData.technologies.map((tech, idx) => {
                                    return <>
                                        <span key={idx} className='bg-accent py-1 px-2 rounded-xl'>{tech}</span>
                                    </>
                                })
                            }

                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <button type='button' onClick={() => setOpen(false)} className='w-25 p-2 border border-border rounded-md  hover:bg-accent hover:scale-110 transition duration-300'>Cancel</button>
                        <button className='w-25 p-2 border border-border rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) hover:scale-110 transition duration-300 text-white'>Create</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ProjectDialog