import { DashboardHeroPageProbs } from "@/pages/dashboard-hero-page/DashboardHeroPage";
import { baseUrl } from "../utils/baseUrl";

export interface ProfileInfoData {
    _id?: string;
    fullName: string;
    title: string;
    bio: string;
    about: string;
    avatar: string;
    codeforces: string;
    github: string;
    leetcode: string;
    linkedin: string;
    location: string;
    phone: string;
    email: string;
    resume: string;

}

export const ProfileInfoService = {
    /**
     * Get the profile info
     */
    getAllProfileInfo: async () => {
        try {
            const response = await fetch(`${baseUrl}/profileinfo`);
            if (!response.ok) {
                throw new Error("Failed to fetch profile info");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching profile info:", error);
            throw error;
        }
    },

    /**
     * Create new profile info
     * Expects FormData because of the avatar image upload
     */
    createNewProfileInfo: async (formData: FormData) => {
        try {
            const response = await fetch(`${baseUrl}/profileinfo`, {
                method: 'POST',
                // Do NOT set Content-Type header when sending FormData
                // The browser will automatically set it with the correct boundary
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to create profile info");
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating profile info:", error);
            throw error;
        }
    },

    /**
     * Update existing profile info
     * Expects FormData because of the optional avatar image upload
     */
    updateProfileInfo: async (formData: FormData) => {
        try {
            const response = await fetch(`${baseUrl}/profileinfo`, {
                method: 'PUT',
                // Do NOT set Content-Type header when sending FormData
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to update profile info");
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating profile info:", error);
            throw error;
        }
    },

    /**
     * Delete profile info
     * Sent to the base route as per router configuration, optionally pass ID in query or body if required by backend
     */
    deleteProfileInfo: async (id?: string) => {
        try {
            // If the backend requires an ID even on the base route, it might be passed as a query param
            // adjust as necessary: `${baseUrl}/api/profile${id ? `?id=${id}` : ''}`
            const url = id ? `${baseUrl}/profileinfo?id=${id}` : `${baseUrl}/profileinfo`;

            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete profile info");
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting profile info:", error);
            throw error;
        }
    }
};
