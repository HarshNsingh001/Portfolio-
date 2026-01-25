import { ExperienceItem, Project, SkillCategory } from './types';

export const FULL_NAME = "HARSH NARAYAN SINGH";
export const TITLE = "Python Developer | Machine Learning Engineer | Backend Systems";
export const LOCATION = "India";
export const GITHUB_URL = "https://github.com/HarshNsingh001";
export const LINKEDIN_URL = "https://www.linkedin.com/in/harshnarayansingh/";
export const RECRUITER_EMAIL = "harshnarayansingh306@gmail.com";
export const GENERAL_EMAIL = "harshnarayansingh306@gmail.com";

export const HERO_INTRO = "I build scalable backend systems and machine learning solutions using real-world data. Experienced with SaaS platforms, cloud deployment, and POS system integrations.";

export const ABOUT_TEXT = [
  "I am a final-year B.Tech Computer Science Engineering student specializing in Data Science, graduating in 2026.",
  "My technical foundation is built on hands-on experience with Python backend development, machine learning models, and cloud services. I have worked extensively with large-scale production datasets, including analyzing over 90,000 order records to drive business insights.",
  "I focus on solving complex business problems using clean, scalable, and maintainable technical solutions. Whether it is integrating fragmented POS systems or optimizing machine learning pipelines, I approach every challenge with a production-first mindset."
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Backend",
    skills: ["Python", "REST APIs", "SQL", "Backend Architecture", "Authentication & OAuth"]
  },
  {
    title: "Machine Learning & Data",
    skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Evaluation", "Data Cleaning & Pipelines"]
  },
  {
    title: "Cloud & Tools",
    skills: ["AWS (EC2, S3, IAM)", "Supabase", "Git & GitHub", "Docker (Basics)", "Postman"]
  },
  {
    title: "POS & SaaS Integrations",
    skills: ["Square POS", "Clover POS", "Toast POS"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "role-1",
    role: "Python Developer / ML Engineer",
    company: "Startup / SaaS",
    location: "Remote / Hybrid",
    period: "Present",
    type: "Professional Experience",
    responsibilities: [
      "Built and maintained backend REST APIs handling real production data.",
      "Worked on machine learning workflows involving large-scale order datasets (90,000+ records).",
      "Designed and optimized data pipelines for analytics and ML experimentation.",
      "Integrated restaurant POS systems into backend services for order and item synchronization.",
      "Collaborated closely with business and product teams to convert requirements into scalable technical solutions.",
      "Focused on system scalability, security, and long-term maintainability.",
      "Gained hands-on experience with cloud deployment and production system monitoring."
    ]
  },
  {
    id: "role-2",
    role: "Software Development Engineer Intern",
    company: "V4K Entertainment Pvt. Ltd.",
    location: "New Delhi",
    period: "June 2025 – August 2025",
    type: "Internship",
    responsibilities: [
      "Owned and delivered 6 production-grade backend APIs using Django REST Framework.",
      "Implemented JWT-based authentication and role-based access control.",
      "Optimized ORM queries and applied caching strategies, reducing P95 API latency by ~20%.",
      "Containerized backend services using Docker for consistent deployments.",
      "Implemented CI pipelines with automated testing and code quality checks.",
      "Worked with real production datasets and backend systems."
    ]
  },
  {
    id: "role-3",
    role: "Data Science Intern",
    company: "CodSoft",
    location: "Remote",
    period: "November 2024 – December 2024",
    type: "Internship",
    responsibilities: [
      "Built machine learning pipelines on real datasets.",
      "Performed feature engineering and model evaluation.",
      "Deployed ML inference using Flask-based REST APIs.",
      "Learned how to bridge machine learning models with backend services.",
      "Focused on practical ML deployment rather than academic-only models."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Restaurant POS Integration Platform",
    category: "System Integration",
    description: [
      "Unified Square, Clover, and Toast POS systems.",
      "Centralized orders, items, payments, and customer data.",
      "Secure OAuth-based integrations.",
      "Designed for real restaurant operations."
    ],
    techStack: ["Python", "OAuth", "REST API", "PostgreSQL"]
  },
  {
    title: "Machine Learning Order Analytics",
    category: "Data Science",
    description: [
      "ML models trained on 90,000+ order records.",
      "Feature engineering on item-level and order-level data.",
      "Sales trend and demand analysis.",
      "Real-world data handling and cleaning."
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "Data Pipelines"]
  },
  {
    title: "SaaS Backend Infrastructure",
    category: "Backend Architecture",
    description: [
      "Scalable REST APIs handling high concurrency.",
      "Authentication and role-based access control.",
      "Cloud deployment with automated workflows.",
      "Production-ready architecture designed for scale."
    ],
    techStack: ["AWS", "Docker", "API Gateway", "Supabase"]
  },
  {
    title: "Dynamic Pricing Engine",
    category: "Machine Learning",
    description: [
      "Built an ML-driven dynamic pricing engine using demand signals and external factors such as weather and events.",
      "Integrated with Clover and Square POS systems, supporting dynamic pricing across 100+ restaurants.",
      "Deployed on Hostinger VPS with CI/CD pipelines enabling automated testing and zero-downtime updates."
    ],
    techStack: ["Python", "XGBoost", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/HarshNsingh001/AI-Pricing"
  },
  {
    title: "Cloud File Sharing Platform",
    category: "Cloud Engineering",
    description: [
      "Designed a secure file-sharing system with RBAC, encrypted storage, and presigned URLs.",
      "Implemented scalable REST APIs and automated deployments using GitHub Actions."
    ],
    techStack: ["Django", "Azure Blob Storage", "Azure App Service"],
    githubUrl: "https://github.com/HarshNsingh001/Cloud-File-Sharing-Platform-"
  },
  {
    title: "AI Code Review Assistant",
    category: "AI Services",
    description: [
      "Built a backend service to analyze source code and expose REST APIs for automated reviews."
    ],
    techStack: ["Python", "Django REST"],
    githubUrl: "https://github.com/HarshNsingh001/ai_code_review"
  }
];

export const INTERESTS = [
  "Playing Video Games (Strategy & Competitive)",
  "Chess (Strategic Thinking & Problem-solving)",
  "Video and Photo Editing",
  "Photography"
];