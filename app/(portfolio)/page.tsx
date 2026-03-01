import AboutSection from "@/components/about-section/AboutSection";
import BlogsSection from "@/components/blogs-section/BlogsSection";
import ContactSection from "@/components/contact-section/ContactSection";
import ExperianceSection from "@/components/experiance-section/ExperianceSection";
import CertificatesSection from "@/components/certificates-section/CertificatesSection";
import HeroSection from "@/components/here-section/HeroSection";
import ProjectsSection from "@/components/projects-section/ProjectsSection";
import SkillsSection from "@/components/skills-section/SkillsSection";


export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperianceSection />
      <CertificatesSection />
      <ProjectsSection />
      <BlogsSection />
      <ContactSection />
    </main>
  );
}
