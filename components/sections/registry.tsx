import HomeSection from "./HomeSection";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

export const SECTION_REGISTRY = {
  home: HomeSection,
  about: AboutSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  contact: ContactSection,
} as const;

export type SectionKey = keyof typeof SECTION_REGISTRY;
