import DashboardCreateBlogPage from '@/pages/dashboard-create-blog-page/DashboardCreateBlogPage'
import { blogService } from '@/services/blog.service'
import React from 'react'

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let blog;
    try {
        const result = await blogService.getBlogById(id);
        blog = result.data?.blog || result.data || {};
        console.log(blog)
    } catch (error: any) {
        console.error(error.message || "Failed to fetch Blog")
        throw error
    }
    return (
        <DashboardCreateBlogPage isEdit={true} blog={blog} />
    )
}

export default page