const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export interface SkillsData {
    _id?: string,
    name: string,
    level: number
    category: string,
    icon: File | string | null
}
export const SkillService = {

    getAllSkills: async () => {
        try {
            const response = await fetch(`${baseUrl}/skills`, {
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch skills');
            }

            return response.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.message || 'Error fetch skills')
            throw error
        }
    },

    createSkill: async (formData: FormData) => {
        try {

            const response = await fetch(`${baseUrl}/skills`, {
                method: "POST",
                body: formData
            })

            if (!response.ok) {
                throw new Error('Failed to create skill');
            }

            return response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.message || 'Error create skill')
            throw error
        }
    },


    updateSkill: async (id: string, formData: FormData) => {
        try {

            const response = await fetch(`${baseUrl}/skills/${id}`, {
                method: "PUT",
                body: formData
            })

            if (!response.ok) {
                throw new Error('Failed to update skill');
            }

            return response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.message || 'Error update skill')
            throw error
        }
    },


    deleteSkill: async (id: string) => {
        try {

            const response = await fetch(`${baseUrl}/skills/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error('Failed to delete skill');
            }

            return response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error.message || 'Error delete skill')
            throw error
        }
    }
}