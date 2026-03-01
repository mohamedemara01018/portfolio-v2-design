import DashboardProjectPage from "@/pages/dashboard-project-page/DashboardProjectPage"
import { projectService } from "@/services/project.service"


async function page() {
    const { status, data } = await projectService.getAllProjects();
    const projects = data.projects;
    console.log(projects)
    return (
        <DashboardProjectPage projects={projects} />
    )
}

export default page