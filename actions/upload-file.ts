"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "portfolio/postsImages",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error ?? new Error("upload failed"));
                        return;
                    }

                    resolve(result);
                }
            )
            .end(buffer);
    });

    return result.secure_url;
}