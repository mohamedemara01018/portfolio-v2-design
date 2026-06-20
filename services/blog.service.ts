import { baseUrl } from '../utils/baseUrl'


export interface blogData {
    _id?: string,
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
            const response = await fetch(`${baseUrl}/blogs`, {
                cache: 'no-store'
            });

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
            const response = await fetch(`${baseUrl}/blogs/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            return response.json();

        } catch (error) {
            console.error('Error fetching blog', error);
            throw error
        }
    },

    createBlog: async (formData: blogData) => {
        console.log(formData);

        try {
            const response = await fetch(`${baseUrl}/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create blog");
            }

            return data;
        } catch (error) {
            console.error("Error creating blog", error);
            throw error;
        }
    },

    updateBlog: async (id: string, data: blogData) => {
        const response = await fetch(`${baseUrl}/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();

        if (!response.ok) {
            throw new Error(res.message || "Failed to update blog");
        }
        return res;
    },

    deleteBlog: async (id: string) => {

        try {
            const response = await fetch(`${baseUrl}/blogs/${id}`, {
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