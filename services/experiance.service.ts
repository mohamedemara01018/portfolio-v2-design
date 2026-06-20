const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface ExperienceData {
    _id?: string;
    company: string;
    role: string;
    description: string;
    startDate: string;
    endDate?: string | null;
    current?: boolean;
    technologies?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export const ExperianceService = {
    /**
     * Get all experiences
     */
    getAllExperiance: async () => {
        try {
            const response = await fetch(`${baseUrl}/experiances`, {
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch experiences");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching experiences:", error);
            throw error;
        }
    },

    /**
     * Create new experience
     */
    createExperiance: async (data: ExperienceData) => {
        try {
            const response = await fetch(`${baseUrl}/experiances`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to create experience");
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating experience:", error);
            throw error;
        }
    },

    /**
     * Update existing experience
     */
    updateExperiance: async (id: string, data: Partial<ExperienceData>) => {
        try {
            const response = await fetch(`${baseUrl}/experiances/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to update experience");
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating experience:", error);
            throw error;
        }
    },

    /**
     * Delete experience
     */
    deleteExperiance: async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/experiances/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete experience");
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting experience:", error);
            throw error;
        }
    }
};
