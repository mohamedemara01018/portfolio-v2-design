'use server'

export async function authenticate(formData: any) {
    // These stay SECURE because they only run on the server
    const correctUser = process.env.AUTH_USERNAME;
    const correctPass = process.env.AUTH_PASSWORD;

    console.log(correctUser, correctPass);

    if (formData.username.trim() === correctUser && formData.password.trim() === correctPass) {
        return { success: true };
    }
    return { success: false };
}



