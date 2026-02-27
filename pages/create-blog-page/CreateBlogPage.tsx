'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader';
import InputFile from '@/components/input-file/InputFile';
import InputForm from '@/components/input-form/InputForm';
import TextareaForm from '@/components/textarea-form/TextareaForm';
import { Eye, Upload, Save } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';

function CreateBlogPage() {
    const [tag, setTag] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        coverImage: '',
        content: '',
        tags: [] as string[]
    });

    const [isPublished, setIsPublished] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (tag.trim()) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
                setTag('');
            }
        }
    };

    return (
        <div className='space-y-8 w-full '>
            <DashboardPageHeader
                title='Blog Editor'
                desc='Create or edit a blog post'
            />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left Side Form */}
                <div className='lg:col-span-2 space-y-6 border border-border rounded-xl p-6 bg-card'>
                    <InputFile id='coverImage' label='Cover Image' onClick={() => { }} />
                    <InputForm
                        id='title'
                        label='Title'
                        name='title'
                        placeholder='Enter post title...'
                        value={formData.title}
                        handleChange={handleChange}
                    />


                    <TextareaForm
                        id='excerpt'
                        label='Excerpt'
                        name='excerpt'
                        placeholder='Brief description for preview...'
                        value={formData.excerpt}
                        handleChange={handleChange}
                    />



                    <div className='flex flex-col items-start gap-1 w-full'>
                        <label htmlFor='content'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            placeholder='Write your blog post content here...&#10;&#10;You can use Markdown formatting:&#10;# Heading 1&#10;## Heading 2&#10;**bold text**&#10;*italic text*&#10;[link](url)&#10;![image](url)'
                            value={formData.content}
                            onChange={handleChange}
                            rows={10}
                            className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) min-h-62.5 font-mono text-sm'
                        ></textarea>
                        <span className='text-xs text-muted-foreground mt-1'>Supports Markdown formatting</span>
                    </div>
                    <div className='space-y-2'>
                        <InputForm id={'technologies'} label='Technologies' placeholder="Project technologies" value={tag} name='technologies' handleChange={(e) => setTag(e.target.value)} onKeyDown={onKeyDown} />
                        <div className='flex items-center gap-2 flex-wrap'>

                            {
                                formData.tags.map((tech, index) => (
                                    <span key={index} className='bg-accent py-1 px-2 rounded-xl'>{tech}</span>
                                ))
                            }

                        </div>
                    </div>
                </div>

                {/* Right Side Cards */}
                <div className='space-y-6'>
                    {/* Publish Card */}
                    <div className='border border-border rounded-xl p-6 bg-card space-y-6'>
                        <h3 className='font-semibold text-lg'>Publish</h3>

                        <div className='flex items-center justify-between'>
                            <span className='text-sm font-medium'>Published</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={isPublished}
                                    onChange={() => setIsPublished(!isPublished)}
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--portfolio-accent)"></div>
                            </label>
                        </div>

                        <div className='space-y-3 pt-2'>
                            <button className='w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-(--primary)/90 flex justify-center gap-2 items-center'>
                                <Save className='w-4 h-4' />
                                Publish Post
                            </button>
                            <button className='w-full py-2 px-4 bg-background border border-border text-foreground font-medium rounded-md hover:bg-accent flex justify-center items-center'>
                                Save as Draft
                            </button>
                            <button className='w-full py-2 px-4 bg-background border border-border text-foreground font-medium rounded-md hover:bg-accent flex justify-center gap-2 items-center'>
                                <Eye className='w-4 h-4' />
                                Preview
                            </button>
                        </div>
                    </div>

                    {/* Post Info Card */}
                    <div className='border border-border rounded-xl p-6 bg-card space-y-6'>
                        <h3 className='font-semibold text-lg'>Post Info</h3>

                        <div className='space-y-3 text-sm'>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Status:</span>
                                <span className='font-medium'>{isPublished ? 'Published' : 'Draft'}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Words:</span>
                                <span className='font-medium'>{formData.content ? formData.content.split(/\s+/).filter(word => word.length > 0).length : 0}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Characters:</span>
                                <span className='font-medium'>{formData.content.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlogPage;
