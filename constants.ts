import { ExperienceItem, Project, SkillCategory } from './types';

export const FULL_NAME = "HARSH NARAYAN SINGH";
export const TITLE = "Python Developer | Machine Learning Engineer | Backend Systems";
export const LOCATION = "India";
export const GITHUB_URL = "https://github.com/HarshNsingh001";
export const LINKEDIN_URL = "https://www.linkedin.com/in/harshnarayansingh/";
export const RECRUITER_EMAIL = "harshnarayansingh306@gmail.com";
export const GENERAL_EMAIL = "harshnarayansingh306@gmail.com";
export const RESUME_URL = "/Harsh_Narayan_Singh_Resume.pdf";

export const HERO_INTRO = "I build scalable backend systems and machine learning solutions using real-world data. Experienced with SaaS platforms, cloud deployment, and POS system integrations.";

export const ABOUT_TEXT = [
  "I'm a backend engineer who happens to be graduating with a B.Tech in 2026.",
  "While most of my classmates were doing academic projects, I was in the trenches — processing 90,000+ real restaurant orders, debugging OAuth integrations at 2 AM, and learning that production data is never as clean as tutorial datasets.",
  "I specialize in Python backend development, machine learning pipelines, and cloud deployments. But what I really do is solve business problems: reducing manual work, speeding up slow systems, and making sense of messy data. I believe great code isn't just elegant — it ships, scales, and makes money."
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Backend",
    skills: ["Python", "C++", "JavaScript", "Django REST", "FastAPI", "Flask", "REST APIs", "JWT", "RBAC", "Caching"]
  },
  {
    title: "Machine Learning & AI",
    skills: ["XGBoost", "Scikit-learn", "Computer Vision", "MediaPipe", "Feature Engineering", "Model Evaluation"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (EC2)", "Azure App Service", "Docker", "GitHub Actions", "CI/CD", "Linux", "Git"]
  },
  {
    title: "Databases & Core CS",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
  },
  {
    title: "Web Technologies & Tools",
    skills: ["HTML", "CSS", "CSS Preprocessors", "MVC", "JSON", "Postman", "Pytest"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "role-1",
    role: "Python Developer",
    company: "Dogra Technologies",
    location: "Remote",
    period: "Nov 2025 – Aug 2026",
    type: "Professional Experience",
    responsibilities: [
      "Developed a computer-vision-based virtual clothing try-on system using MediaPipe, applying body landmark detection and pixel-based measurement estimation to improve garment-fit accuracy.",
      "Built an XGBoost-based dynamic pricing module that used demand and business signals to support data-driven price recommendations.",
      "Implemented authentication and access-control workflows, including Google Sign-In and role-based access control, and deployed services on AWS EC2 with Supabase/PostgreSQL."
    ]
  },
  {
    id: "role-2",
    role: "Software Development Engineer Intern",
    company: "V4K Entertainment Pvt. Ltd.",
    location: "New Delhi",
    period: "Jun 2025 – Aug 2025",
    type: "Internship",
    responsibilities: [
      "Built and delivered multiple Django REST APIs with JWT authentication and role-based access control.",
      "Optimized ORM queries and introduced caching, reducing P95 API latency by 20%.",
      "Containerized backend services using Docker and set up CI pipelines (pytest, flake8) for automated testing."
    ]
  },
  {
    id: "role-3",
    role: "Data Science Intern",
    company: "CodSoft",
    location: "Remote",
    period: "Nov 2024 – Dec 2024",
    type: "Internship",
    responsibilities: [
      "Built and evaluated machine learning pipelines for prediction tasks, covering data preprocessing, feature engineering, and model selection.",
      "Deployed trained models via Flask-based REST APIs for inference."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Dynamic Pricing Engine (Multi-Restaurant POS Platform)",
    category: "Machine Learning & Integration",
    description: [
      "Built an ML-driven dynamic pricing engine using demand signals and external factors such as weather and local events to generate price recommendations.",
      "Integrated with Clover and Square POS systems to support configurable dynamic pricing across multiple restaurant accounts.",
      "Deployed on cloud infrastructure with CI/CD pipelines enabling automated testing and reliable rollouts."
    ],
    techStack: ["Python", "XGBoost", "FastAPI", "PostgreSQL", "AWS"],
    githubUrl: "https://github.com/HarshNsingh001/AI-Pricing"
  },
  {
    title: "Virtual Clothing Try-On System",
    category: "Computer Vision",
    description: [
      "Designed a real-time computer vision pipeline using MediaPipe for body landmark detection and pixel-to-real-world measurement estimation.",
      "Calculated body proportions from detected landmarks to improve clothing-fit accuracy; deployed the application on AWS for real-time inference."
    ],
    techStack: ["Python", "MediaPipe", "Computer Vision", "AWS"]
  },
  {
    title: "HealthCloud: IoT-Enabled Cloud Platform for Wearable Health Monitoring",
    category: "IoT & Cloud",
    description: [
      "Developed a three-tier health monitoring platform with a Spring Boot backend, React dashboard, and Capacitor-based Android application.",
      "Integrated Bluetooth Low Energy (BLE) smartwatch communication and GPS-based location tracking, with an automated alert engine for abnormal health readings.",
      "Implemented JWT authentication, role-based access control, and multi-institution data isolation for secure multi-tenant usage."
    ],
    techStack: ["Spring Boot", "React 19", "Capacitor Android", "Supabase PostgreSQL", "BLE"]
  }
];

export const INTERESTS = [
  "Playing Video Games (Strategy & Competitive)",
  "Chess (Strategic Thinking & Problem-solving)",
  "Video and Photo Editing",
  "Photography"
];