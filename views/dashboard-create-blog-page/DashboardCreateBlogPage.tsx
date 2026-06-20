'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader';
import InputForm from '@/components/input-form/InputForm';
import Notification, { NotificationState } from '@/components/notification/Notification';
import TextareaForm from '@/components/textarea-form/TextareaForm';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { blogData, blogService } from '@/services/blog.service';
import { blogValidationFormData } from '@/utils/validation';
import { Editor } from '@tiptap/core';
import { Save } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';

function DashboardCreateBlogPage({ isEdit, blog }: { isEdit?: boolean, blog?: blogData }) {
    const [tag, setTag] = useState('');
    const [notification, setNotification] = useState<NotificationState | null>(null);
    const [error, setError] = useState<Partial<Record<keyof blogData, string>>>();
    const [loading, setLoading] = useState(false)
    const [editor, setEditor] = useState<Editor | null>(null)
    const [formData, setFormData] = useState<blogData>(() => {
        return blog ? { ...blog, tags: blog.tags || [] } : {
            title: '',
            excerpt: '',
            content: '',
            tags: [] as string[],
            published: false,
            views: 0,
            createdAt: new Date(),
        };
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: checked }))
    }



    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (tag.trim()) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }));
                setTag('');
            }
        }
    };

    const handleRemoveTags = (tag: string) => {
        let tags = formData.tags;
        tags = tags.filter((t) => {
            return t != tag
        })

        setFormData(prev => ({ ...prev, tags: tags }))
    }

    const handleSubmit = async () => {
        const content = editor?.getHTML() ?? "";

        const validationErrors = blogValidationFormData({
            ...formData,
            content,
        });

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        setError({});
        setLoading(true);

        try {
            const payload = {
                ...formData,
                content,
            };

            if (isEdit) {
                if (!blog?._id) {
                    throw new Error("Blog ID is missing");
                }

                await blogService.updateBlog(blog._id, payload);

                setNotification({
                    message: "Blog updated successfully",
                    type: "success",
                });
            } else {
                await blogService.createBlog(payload);

                setNotification({
                    message: "Blog created successfully",
                    type: "success",
                });
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to save blog";

            console.error(message);

            setNotification({
                message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className='flex flex-col space-y-8 w-full '>
                <DashboardPageHeader
                    title='Blog Editor'
                    desc='Create or edit a blog post'
                />

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Left Side Form */}
                    <form action={handleSubmit} className='lg:col-span-2 space-y-6 border border-border rounded-xl p-6 bg-card'>
                        <div>
                            <InputForm
                                id='title'
                                label='Title'
                                name='title'
                                placeholder='Enter post title...'
                                value={formData.title}
                                handleChange={handleChange}
                            />
                            {error?.title && <span className='text-red-400'>{error?.title}</span>}
                        </div>

                        <div>
                            <TextareaForm
                                id='excerpt'
                                label='Excerpt'
                                name='excerpt'
                                placeholder='Brief description for preview...'
                                value={formData.excerpt}
                                handleChange={handleChange}
                            />
                            {error?.excerpt && <span className='text-red-400'>{error?.excerpt}</span>}
                        </div>

                        <div>
                            <div className='space-y-2'>
                                <InputForm id={'technologies'} label='Technologies' placeholder="Project technologies" value={tag} name='technologies' handleChange={(e) => setTag(e.target.value)} onKeyDown={onKeyDown} />
                                <div className='flex items-center gap-2 flex-wrap'>

                                    {
                                        formData.tags.map((tech, index) => (
                                            <span onClick={() => handleRemoveTags(tech)} key={index} className='bg-accent py-1 px-2 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer'>{tech}</span>
                                        ))
                                    }

                                </div>
                            </div>
                            {error?.tags && <span className='text-red-400'>{error?.tags}</span>}

                        </div>
                    </form>

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
                                        name='published'
                                        checked={formData.published}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--portfolio-accent)"></div>
                                </label>
                            </div>

                            <div className='space-y-3 pt-2'>
                                <button onClick={handleSubmit} className='w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-(--primary)/90 flex justify-center gap-2 items-center'>
                                    <Save className='w-4 h-4' />
                                    {loading ? 'Publishing...' : isEdit ? 'update post' : 'Publish post'}
                                </button>
                                {!isEdit && <button className='w-full py-2 px-4 bg-background border border-border text-foreground font-medium rounded-md hover:bg-accent flex justify-center items-center'>
                                    Save as Draft
                                </button>}
                            </div>
                        </div>

                        {/* Post Info Card */}
                        <div className='border border-border rounded-xl p-6 bg-card space-y-6'>
                            <h3 className='font-semibold text-lg'>Post Info</h3>

                            <div className='space-y-3 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-muted-foreground'>Status:</span>
                                    <span className='font-medium'>{isEdit ? 'Editing    ' : formData.published ? 'Published' : 'Draft'}</span>
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
                <div>
                    <SimpleEditor isEdit={isEdit} onEditReady={setEditor} content={formData.content} />
                </div>
            </div>
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </>
    )
}

export default DashboardCreateBlogPage;
