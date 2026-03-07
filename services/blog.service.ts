import { baseUrl } from '../utils/baseUrl'


export interface blogData {
    _id?: string,
    coverImage: File | string | null,
    title: string,
    content: string,
    excerpt: string,
    tags: string[],
    published: boolean,
    views: number,
    createdAt: Date
}


export const blogService = {


    getAllBlogs: async () => {

        try {
            let response = await fetch(`${baseUrl}/blogs`);
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            return response.json();

        } catch (error) {
            console.error('Error fetching blogs', error);
            throw error
        }
    },

    getBlogById: async (id: string) => {

        try {
            let response = await fetch(`${baseUrl}/blogs/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            return response.json();

        } catch (error) {
            console.error('Error fetching blog', error);
            throw error
        }
    },

    createBlog: async (formData: FormData) => {

        try {
            let response = await fetch(`${baseUrl}/blogs`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to create blog");
            }
            return response.json();

        } catch (error) {
            console.error('Error creating blog', error);
            throw error
        }
    },

    updateBlog: async (id: string, formData: FormData) => {
        try {
            let response = await fetch(`${baseUrl}/blogs/${id}`, {
                method: "PUT",
                body: formData
            })

            if (!response.ok) {
                throw new Error("Failed to upate blog");
            }

            return response.json();

        } catch (error) {
            console.error("Error updateing blog")
            throw error
        }
    },

    deleteBlog: async (id: string) => {

        try {
            let response = await fetch(`${baseUrl}/blogs/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error("Failed to delete blog");
            }

            return response.json();

        } catch (error) {
            console.error("Error deleting blog")
            throw error
        }
    }

}