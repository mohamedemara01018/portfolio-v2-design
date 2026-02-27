import DashboardHeroPage, { DashboardHeroPageProbs } from '@/pages/dashboard-hero-page/DashboardHeroPage'
import { ProfileInfoService } from '@/services/profileInfo.service';
import { baseUrl } from '@/utils/baseUrl';
import React from 'react'

async function page() {
    let profileInfo = undefined;

    try {
        const { data } = await ProfileInfoService.getAllProfileInfo();
        profileInfo = data?.profileInfo?.[0];
    } catch (error) {
        console.error("Failed to load profile info on server:", error);
    }

    return (
        <>
            <DashboardHeroPage profileInfoData={profileInfo} />
        </>
    )
}

export default page;