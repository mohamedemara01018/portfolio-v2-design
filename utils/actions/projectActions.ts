import { projectService } from "@/services/project.service";



export async function createProject(formData: FormData) {
    await projectService.createNewProject(formData);
}

export async function updateProject(id: string, formData: FormData) {
    await projectService.updateProject(id!, formData);
}