const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface CertificateData {
    _id?: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    credentialId: string;
    certificateLink: string;
    coverImage: File | string | null;
    createdAt?: string;
    updatedAt?: string;
}

export const CertificateService = {
    /**
     * Get all certificates
     */
    getAllCertificates: async () => {
        try {
            const response = await fetch(`${baseUrl}/certificates`, {
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch certificates");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching certificates:", error);
            throw error;
        }
    },

    /**
     * Create new certificate
     */
    createCertificate: async (formData: FormData) => {
        try {
            const response = await fetch(`${baseUrl}/certificates`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to create certificate");
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating certificate:", error);
            throw error;
        }
    },

    /**
     * Update existing certificate
     */
    updateCertificate: async (id: string, formData: FormData) => {
        try {
            const response = await fetch(`${baseUrl}/certificates/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to update certificate");
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating certificate:", error);
            throw error;
        }
    },

    /**
     * Delete certificate
     */
    deleteCertificate: async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/certificates/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete certificate");
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting certificate:", error);
            throw error;
        }
    }
};
