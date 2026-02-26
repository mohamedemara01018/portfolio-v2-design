'use client';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader'
import InputForm from '@/components/input-form/InputForm'
import TextareaForm from '@/components/textarea-form/TextareaForm'
import { Plus } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'

function page() {

    const [formData, setFormData] = useState({
        fullName: "ahmed",
        title: "frontend react developer",
        bio: "passionate frontend developer with strong experience in react, next.js…",
        about: "passionate frontend developer with strong experience in react, next.js… passionate frontend developer with strong experience in react, next.js… passionate frontend developer with strong experience in react, next.js…",
        email: "mohamed.amara@example.com",
        phone: "+201234567890",
        location: "cairo, egypt",
        avatar: "https://res.cloudinary.com/dwvojiuha/image/upload/v1771598036/portfoli…",
        resume: "https://example.com/files/mohamed-amara-resume.pdf",

        socialLinks: {
            github: "githublink",
            linkedin: "link",
            leetcode: "leetcodelink",
            codeforces: "codeforceslink"
        }
    });


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;

        setFormData((prev) => {
            if (Object.keys(prev.socialLinks).includes(name)) {
                return {
                    ...prev,
                    socialLinks: {
                        ...prev.socialLinks,
                        [name]: value,
                    },
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <>
            <div>
                <DashboardPageHeader
                    title={'Hero Section'}
                    desc={"Manage your portfolio hero/landing section"}
                />
            </div>
            <div className='mt-8 space-y-8'>
                <form className='border border-border p-4 rounded-md bg-card flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <InputForm id={'fullname'} label='Full Name' placeholder="Your name" name='fullName' value={formData.fullName} handleChange={handleChange} />
                        <InputForm id={'title'} label='Title' placeholder="Your role" name='title' value={formData.title} handleChange={handleChange} />
                        <TextareaForm id={'bio'} label='Bio' placeholder="Brief description" name='bio' value={formData.bio} handleChange={handleChange} />
                        <TextareaForm id={'about'} label='About' placeholder="About me" name='about' value={formData.about} handleChange={handleChange} />
                    </div>

                    <div className='grid grid-cols-2 gap-8'>
                        <InputForm id={'email'} label='Email' placeholder="Your email" name='email' value={formData.email} handleChange={handleChange} />
                        <InputForm id={'phone'} label='Phone' placeholder="Your phone" name='phone' value={formData.phone} handleChange={handleChange} />
                        <InputForm id={'location'} label='Location' placeholder="Your location" name='location' value={formData.location} handleChange={handleChange} />
                        <InputForm id={'resume'} label='Resume' placeholder="Your resume" name='resume' value={formData.resume} handleChange={handleChange} />
                        <InputForm id={'github'} label='Github' placeholder="Your github link" name='github' value={formData.socialLinks.github} handleChange={handleChange} />
                        <InputForm id={'linkedin'} label='LinkedIn' placeholder="Your linkedin link" name='linkedin' value={formData.socialLinks.linkedin} handleChange={handleChange} />
                        <InputForm id={'leetcode'} label='Leetcode' placeholder="Your leetcode link" name='leetcode' value={formData.socialLinks.leetcode} handleChange={handleChange} />
                        <InputForm id={'codeforces'} label='Codeforces' placeholder="Your codeforces link" name='codeforces' value={formData.socialLinks.codeforces} handleChange={handleChange} />
                    </div>
                    {/* image */}
                    <div className='flex flex-col items-start gap-1 w-full mt-4'>
                        <label htmlFor='avatar' >Avatar</label>
                        <input id={'avatar'} type="file" className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' />
                    </div>
                    <hr className='w-full h-0.5 bg-border' />
                    <button className='py-2 px-4  rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white w-fit'>
                        Save Change
                    </button>

                </form>
                <div className='border border-border p-4 rounded-md bg-card flex flex-col gap-4'>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
                    <div className="p-8 rounded-lg bg-linear-to-br from-accent to-accent/50 text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-2">
                            {formData.fullName || "Title"}
                        </h1>
                        <p className="text-xl text-(--portfolio-accent) mb-4">
                            {formData.title || "Subtitle"}
                        </p>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {formData.bio || "Description"}
                        </p>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            {formData.about || "Description"}
                        </p>

                    </div>

                </div>
            </div>
        </>
    )
}

export default page