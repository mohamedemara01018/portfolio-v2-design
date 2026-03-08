import DashboardBlogPage from '@/pages/dashboard-blog-page/DashboardBlogPage'
import { blogService } from '@/services/blog.service';
import React from 'react'

async function page() {

    let blogs = [];

    try {

        let result = await blogService.getAllBlogs();
        let blogsArr = result.data?.blogs || result.data || [];
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