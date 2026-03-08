import { baseUrl } from "../utils/baseUrl";

export interface MessageData {
    _id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const MessageService = {
    /**
     * Get all messages
     */
    getAllMessages: async () => {
        try {
            const response = await fetch(`${baseUrl}/contacts`, {
                cache: 'no-store'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    },

    /**
     * Get message by ID
     */
    getMessageById: async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/contacts/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch message");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching message:", error);
            throw error;
        }
    },

    /**
     * Create new message
     */
    createMessage: async (data: MessageData) => {
        try {
            const response = await fetch(`${baseUrl}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to create message");
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating message:", error);
            throw error;
        }
    },

    /**
     * Update existing message
     */
    updateMessage: async (id: string, data: Partial<MessageData>) => {
        try {
            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to update message");
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating message:", error);
            throw error;
        }
    },

    /**
     * Delete message
     */
    deleteMessage: async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to delete message");
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting message:", error);
            throw error;
        }
    }
};
