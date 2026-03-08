'use server';

import { ProfileInfoService } from "@/services/profileInfo.service";

export async function createProfileInfo(formData: FormData) {
    await ProfileInfoService.createNewProfileInfo(formData);
}


export async function updateProfileInfo(formData: FormData) {
    await ProfileInfoService.updateProfileInfo(formData);
}