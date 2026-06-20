import DashboardBlogPage from '@/views/dashboard-blog-page/DashboardBlogPage'
import { blogService } from '@/services/blog.service';
import React from 'react'

async function page() {

    let blogs = [];

    try {

        const result = await blogService.getAllBlogs();
        console.log('result', result)
        const blogsArr = result.data?.blogs || result.data || [];
        blogs = Array.isArray(blogsArr) ? blogsArr : []
        console.log(blogs)

    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
    return (
        <>
            <DashboardBlogPage blogs={blogs} />
        </>
    )
}

export default page