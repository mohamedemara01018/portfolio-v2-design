import { baseUrl } from "@/utils/baseUrl"
export interface ProjectData {
    _id?: string;
    title: string;
    description: string;
    category: "frontend" | "backend" | "fullstack" | string; // يمكنك تحديد التصنيفات المتاحة
    coverImage: string;
    featured: boolean;
    githubUrl: string;
    liveUrl: string;
    technologies: string[]; // مصفوفة التقنيات المستخدمة
    views?: number;
}

export const projectService = {

    getAllProjects: async () => {
        try {
            const response = await fetch(`${baseUrl}/projects`);
            if (!response.ok) {
                throw new Error('Failed to fetch projects')
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching projects:', error);
            throw error
        }
    },

    getProjectById: async (id: number) => {
        try {

            const response = await fetch(`${baseUrl}/project/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Project')
            }

            return response.json();

        } catch (error) {
            console.error('Error fetching project', error);
            throw error
        }
    },

    createNewProject: async (formData: FormData) => {
        try {

            const response = await fetch(`${baseUrl}/projects`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('Failed creating Project');
            }

            return await response.json();

        } catch (error) {
            console.error('Error creating project', error);
            throw error
        }
    },

    updateProject: async (id: number | string, formData: FormData) => {
        try {
            const response = await fetch(`${baseUrl}/projects/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed updating Project');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating project', error);
            throw error;
        }
    },

    deleteProject: async (id: number | string) => {
        try {
            const response = await fetch(`${baseUrl}/projects/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed deleting Project');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting project', error);
            throw error;
        }
    }
}