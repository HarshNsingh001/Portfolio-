import React from 'react';
import { ArrowUpRight, Download, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';
import Section from '../components/Section';
import {
  FULL_NAME, TITLE, HERO_INTRO, LOCATION, GITHUB_URL, LINKEDIN_URL,
  ABOUT_TEXT, SKILL_CATEGORIES, EXPERIENCES, PROJECTS, INTERESTS,
  RECRUITER_EMAIL, GENERAL_EMAIL
} from '../constants';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6 bg-om-bg border-b border-om-beige/30 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center text-center z-10 animate-fade-in-up md:pt-0 pt-20 pb-20 md:pb-0">

          {/* Label */}
          <p className="text-om-gold text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-6 md:mb-8">
            IT’S ME
          </p>

          {/* Name */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-om-navy tracking-tight leading-none font-bold mb-4 md:mb-6 px-4">
            {FULL_NAME}
          </h1>

          {/* Title */}
          <h2 className="text-lg md:text-2xl text-om-charcoal font-medium tracking-wide mb-6 md:mb-8 px-4">
            {TITLE}
          </h2>

          {/* Intro */}
          <p className="text-om-charcoal/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10 md:mb-12 px-4">
            {HERO_INTRO}
          </p>

          {/* Links */}
          <div className="flex flex-row items-center justify-center gap-4 text-xs md:text-sm tracking-widest uppercase text-om-charcoal/90">
            <span className="font-semibold text-om-navy">{LOCATION}</span>
            <span className="text-om-gold">•</span>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-om-gold transition-colors font-medium hover:underline decoration-om-gold/50 underline-offset-4">GitHub</a>
            <span className="text-om-gold">•</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-om-gold transition-colors font-medium hover:underline decoration-om-gold/50 underline-offset-4">LinkedIn</a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-om-gold/60 z-10 hidden md:block">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" dark>
        <div className="max-w-3xl mx-auto text-lg md:text-xl text-om-charcoal leading-relaxed space-y-6 font-light text-center">
          {ABOUT_TEXT.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Professional Experience">
        <div className="space-y-16 max-w-4xl mx-auto">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-8 md:pl-0">
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[150px] top-2 bottom-0 w-px bg-om-beige"></div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Date Column */}
                <div className="md:w-[150px] md:text-right shrink-0">
                  <span className="text-sm font-semibold tracking-widest text-om-gold uppercase block mb-1">
                    {exp.period}
                  </span>
                </div>

                {/* Content Column */}
                <div className="flex-grow relative">
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute -left-[41px] top-1.5 w-3 h-3 rounded-full bg-om-bg border-2 border-om-gold"></div>

                  <h3 className="font-serif text-2xl text-om-navy mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-lg text-om-charcoal mb-6 font-medium">
                    {exp.company} <span className="text-om-beige mx-2">|</span> <span className="text-om-charcoal/70 font-normal">{exp.location}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-om-charcoal/90 leading-relaxed flex items-start gap-3">
                        <span className="text-om-gold mt-2 text-[10px]">♦</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Proficiency" dark>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="border-t border-om-beige pt-6">
              <h3 className="font-serif text-xl text-om-navy mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="text-om-charcoal/80 text-sm md:text-base border-b border-transparent hover:border-om-gold transition-colors pb-0.5 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Selected Works">
        <div className="grid gap-12 max-w-4xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group bg-white border border-om-beige p-8 md:p-10 hover:shadow-lg hover:border-om-gold/30 transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-om-gold uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-om-navy group-hover:text-om-gold transition-colors">
                    {project.title}
                  </h3>
                </div>
                {project.githubUrl && (
                  <div className="flex gap-2 shrink-0">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-om-charcoal/40 hover:text-om-navy transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                )}
              </div>

              <ul className="space-y-2 mb-8 text-om-charcoal/80 leading-relaxed">
                {project.description.map((desc, dIdx) => (
                  <li key={dIdx}>• {desc}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 bg-om-bg text-om-charcoal text-xs tracking-wider uppercase border border-om-beige">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resume Section */}
      <Section id="resume" title="Resume" dark>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-om-charcoal/70 mb-8 max-w-xl mx-auto">
              A comprehensive overview of my academic background, professional experience, and technical capabilities.
            </p>
            <a
              href="https://drive.google.com/file/d/1RDcy8dcDlOVRArxpikfwSl0RjbbL01iQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-om-navy text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-om-charcoal transition-colors min-w-[200px]"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>

          {/* Rendered Resume Document */}
          <div className="bg-white w-full max-w-[850px] mx-auto shadow-2xl border border-om-beige/30 p-8 md:p-16 text-left transform transition-all hover:scale-[1.01] duration-500">
            {/* Resume Header */}
            <div className="text-center border-b-2 border-gray-900 pb-6 mb-6">
              <h1 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold tracking-tight mb-3">HARSH NARAYAN SINGH</h1>
              <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-gray-700 font-medium">
                <span>harshnarayansingh306@gmail.com</span>
                <span className="hidden md:inline">•</span>
                <span>+91 9354928723</span>
                <span className="hidden md:inline">•</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-om-gold underline decoration-gray-400">LinkedIn</a>
                <span className="hidden md:inline">•</span>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-om-gold underline decoration-gray-400">GitHub</a>
                <span className="hidden md:inline">•</span>
                <span>Portfolio</span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
              <p className="text-gray-800 text-sm leading-relaxed text-justify">
                Backend-focused Software Engineer with experience building production-grade REST services, ML-driven systems,
                and cloud-native deployments. Strong in backend system design, data structures, CI/CD, and scalable API
                development.
              </p>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h2>
              <div className="mb-3">
                <div className="flex justify-between items-baseline font-semibold text-gray-900 text-sm">
                  <span>B.Tech in Computer Science Engineering</span>
                  <span>2022 – 2026</span>
                </div>
                <div className="flex justify-between items-baseline text-sm text-gray-700">
                  <span>Ajay Kumar Garg Engineering College, Ghaziabad</span>
                  <span className="font-medium">CGPA: 7.5 / 10</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline text-sm text-gray-700 mb-1">
                <span><span className="font-semibold">Class XII (CBSE)</span> – Maharishi Vidya Mandir, Fatehpur</span>
                <span>2021 — 88%</span>
              </div>
              <div className="flex justify-between items-baseline text-sm text-gray-700">
                <span><span className="font-semibold">Class X (CBSE)</span> – Maharishi Vidya Mandir, Fatehpur</span>
                <span>2019 — 94%</span>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Technical Skills</h2>
              <div className="text-sm text-gray-700 space-y-1.5">
                <p><span className="font-bold text-gray-900">Backend:</span> Django REST, FastAPI, Flask, REST APIs, JWT, Caching, Pagination</p>
                <p><span className="font-bold text-gray-900">Machine Learning:</span> XGBoost, Feature Engineering, Model Evaluation</p>
                <p><span className="font-bold text-gray-900">Databases:</span> PostgreSQL, MySQL, MongoDB, SQLite</p>
                <p><span className="font-bold text-gray-900">Cloud & DevOps:</span> Azure App Service, Azure Blob Storage, Docker, GitHub Actions, CI/CD, VPS Hosting</p>
                <p><span className="font-bold text-gray-900">Languages & Tools:</span> Python, C++, Linux, Git, Postman</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">Experience</h2>

              {/* Job 1 */}
              <div className="mb-5">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">Software Development Engineer Intern <span className="font-normal text-gray-600">— V4K Entertainment Pvt. Ltd.</span></span>
                  <span className="text-gray-900 text-sm font-medium whitespace-nowrap">Jun 2025 – Aug 2025</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  <li>Owned and delivered 6 production-grade Django REST APIs with JWT authentication and role-based access control.</li>
                  <li>Optimized ORM queries and caching, reducing P95 API latency by <span className="font-semibold">20%</span>.</li>
                  <li>Containerized backend services using Docker and implemented CI pipelines (pytest, flake8).</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">Data Science Intern <span className="font-normal text-gray-600">— CodSoft</span></span>
                  <span className="text-gray-900 text-sm font-medium whitespace-nowrap">Nov 2024 – Dec 2024</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  <li>Built ML pipelines and deployed inference using Flask-based REST APIs.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">Projects</h2>

              <div className="mb-4">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">Dynamic Pricing Engine</span>
                  <span className="text-gray-600 text-xs italic">Python, XGBoost, FastAPI, PostgreSQL</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  <li>Built an ML-driven dynamic pricing engine using demand signals and external factors such as weather and events.</li>
                  <li>Integrated with Clover and Square POS systems, supporting dynamic pricing across <span className="font-semibold">100+ restaurants</span>.</li>
                  <li>Deployed on Hostinger VPS with CI/CD pipelines enabling automated testing and zero-downtime updates.</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">Cloud File Sharing Platform</span>
                  <span className="text-gray-600 text-xs italic">Django, Azure Blob Storage, Azure App Service</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  <li>Designed a secure file-sharing system with RBAC, encrypted storage, and presigned URLs.</li>
                  <li>Implemented scalable REST APIs and automated deployments using GitHub Actions.</li>
                </ul>
              </div>

              <div>
                <div className="flex flex-col md:flex-row justify-between md:items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">AI Code Review Assistant</span>
                  <span className="text-gray-600 text-xs italic">Python, Django REST</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                  <li>Built a backend service to analyze source code and expose REST APIs for automated reviews.</li>
                </ul>
              </div>
            </div>

            {/* DSA & Certs */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">DSA & Competitive Programming</h2>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700">
                  <li>Solved 250+ problems on LeetCode, HackerRank, and CodeChef(1741).</li>
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Certifications</h2>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700">
                  <li>MongoDB Basics (Udemy), Python Programming (Infosys), Fundamentals of ML – scikit-learn (Infosys)</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* Interests Section */}
      <Section id="interests" title="Interests">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16">
            {INTERESTS.map((interest, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-om-bg border border-om-gold flex items-center justify-center text-om-gold font-serif text-xl shadow-sm">
                  {idx + 1}
                </div>
                <span className="text-om-charcoal font-light text-lg max-w-xs">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Unified Recruiter Contact Section (Target for Navigation) */}
      <section id="contact" className="bg-om-navy text-om-bg py-20 px-6 border-t-4 border-om-gold">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">
            Contact
          </h3>
          <p className="text-om-gold text-sm tracking-widest uppercase mb-10">
            Hiring & Interview Communication
          </p>

          <div className="bg-om-charcoal/30 border border-om-charcoal/50 p-8 md:p-12 rounded-sm backdrop-blur-sm mb-12">
            <a
              href={`mailto:${RECRUITER_EMAIL}`}
              className="text-xl md:text-3xl font-serif text-white hover:text-om-gold transition-colors border-b-2 border-om-gold/30 hover:border-om-gold pb-1 inline-block mb-8 break-all"
            >
              {RECRUITER_EMAIL}
            </a>

            <p className="text-om-bg/70 text-sm md:text-base mb-2">
              Please include role name, company name, and tech stack.
            </p>
            <p className="text-om-gold/80 text-xs tracking-widest uppercase">
              Typically responds within 24 hours
            </p>
          </div>

          <div className="flex justify-center gap-8">
            <a href={`mailto:${GENERAL_EMAIL}`} className="flex flex-col items-center gap-2 text-om-bg/70 hover:text-om-gold transition-colors group">
              <Mail size={24} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-om-bg/70 hover:text-om-gold transition-colors group"
            >
              <Github size={24} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-om-bg/70 hover:text-om-gold transition-colors group"
            >
              <Linkedin size={24} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;