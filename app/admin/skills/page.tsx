import DashboardSkillsPage from "@/pages/dashboard-skills-page/DashboardSkillsPage"
import { SkillsData, SkillService } from "@/services/skill.service";

async function page() {

    let skills: SkillsData[] = [];
    try {

        let resualt = await SkillService.getAllSkills();
        let skillArr = resualt.data?.skills || resualt.data || [];
        skills = Array.isArray(skillArr) ? skillArr : [];

    } catch (error: any) {
        console.error(error.message || 'Error fetch skills')
    }
    return (
        <DashboardSkillsPage skills={skills} />
    )
}

export default page
