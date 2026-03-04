import DashboardProjectPage from "@/pages/dashboard-project-page/DashboardProjectPage"
import { projectService } from "@/services/project.service"


async function page() {
    let projects = [];
    try {
        const result = await projectService.getAllProjects();
        const projectsArr = result?.data.projects || result.data || [];
        projects = Array.isArray(projectsArr) ? projectsArr : []
    } catch (error: any) {
        console.error(error.message || 'failed to fetch projects');
        throw error
    }
    console.log(projects)
    return (
        <DashboardProjectPage projects={projects} />
    )
}

export default page