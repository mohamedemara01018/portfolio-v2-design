import { blogData } from "@/services/blog.service";

export const blogValidationFormData = (formData: blogData) => {
    const errors: Partial<Record<keyof blogData, string>> = {};

    Object.entries(formData).forEach(([key, value]) => {

        if (
            value === null ||
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
        ) {
            errors[key as keyof blogData] = `Please fill ${key}`;
        }
    });

    return errors;
};