import AboutSection from "@/components/about-section/AboutSection";
import BlogsSection from "@/components/blogs-section/BlogsSection";
import ContactSection from "@/components/contact-section/ContactSection";
import ExperianceSection from "@/components/experiance-section/ExperianceSection";
import CertificatesSection from "@/components/certificates-section/CertificatesSection";
import HeroSection from "@/components/here-section/HeroSection";
import ProjectsSection from "@/components/projects-section/ProjectsSection";
import SkillsSection from "@/components/skills-section/SkillsSection";


import { projectService } from "@/services/project.service";
import { CertificateService } from "@/services/certificate.service";
import { ExperianceService } from "@/services/experiance.service";
import { ProfileInfoService } from "@/services/profileInfo.service";
import { SkillService } from "@/services/skill.service";
import { blogService } from "@/services/blog.service";

export default async function Home() {
  let profileInfo = [];
  let skills = [];
  let experiences = [];
  let certificates = [];
  let projects = [];
  let blogs = [];

  try {
    const [profileRes, skillsRes, expRes, certRes, projRes, blogRes] = await Promise.all([
      ProfileInfoService.getAllProfileInfo().catch(() => ({ data: [] })),
      SkillService.getAllSkills().catch(() => ({ data: [] })),
      ExperianceService.getAllExperiance().catch(() => ({ data: [] })),
      CertificateService.getAllCertificates().catch(() => ({ data: [] })),
      projectService.getAllProjects().catch(() => ({ data: [] })),
      blogService.getAllBlogs().catch(() => ({ data: [] }))
    ]);

    profileInfo = profileRes?.data?.profileInfo || profileRes?.data || [];
    skills = skillsRes?.data?.skills || skillsRes?.data || [];
    experiences = expRes?.data?.experiances || expRes?.data || [];
    certificates = certRes?.data?.certificates || certRes?.data || [];
    projects = projRes?.data?.projects || projRes?.data || [];
    blogs = blogRes?.data?.blogs || blogRes?.data || [];
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }

  return (
    <main className="">
      {profileInfo && <HeroSection profileInfo={Array.isArray(profileInfo) ? profileInfo[0] : profileInfo} />}
      {profileInfo && <AboutSection profileInfo={Array.isArray(profileInfo) ? profileInfo[0] : profileInfo} />}
      {skills && <SkillsSection skills={skills} />}
      {experiences && <ExperianceSection experiences={experiences} />}
      {projects && <ProjectsSection projects={projects} />}
      {blogs && <BlogsSection blogs={blogs} />}
      {certificates && <CertificatesSection certificates={certificates} />}
      {<ContactSection profileInfo={Array.isArray(profileInfo) ? profileInfo[0] : profileInfo} />}
    </main>
  );
}
