export interface Project {
  title: string;
  category: string;
  description: string[];
  techStack: string[];
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type?: string; // e.g. "Professional Experience" or "Internship"
  responsibilities: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface NavItem {
  label: string;
  id: string; // for scroll anchoring
}