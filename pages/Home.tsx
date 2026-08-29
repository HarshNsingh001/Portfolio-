import React, { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Download, Mail, Github, Linkedin, ChevronDown, Sparkles } from 'lucide-react';
import {
  FULL_NAME, TITLE, HERO_INTRO, LOCATION, GITHUB_URL, LINKEDIN_URL,
  ABOUT_TEXT, SKILL_CATEGORIES, EXPERIENCES, PROJECTS,
  RECRUITER_EMAIL, GENERAL_EMAIL, RESUME_URL
} from '../constants';
import SceneJourney from '../components/3d/SceneJourney';
import ScrollHUD from '../components/ui/ScrollHUD';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Total Page Scroll Progress (0.0 at top -> 1.0 at footer)
  const [totalProgress, setTotalProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  /* ── GSAP hero entrance + scroll tracking across entire page ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1 });
      }
      if (nameRef.current) {
        tl.fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4');
      }
      if (titleRef.current) {
        tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
      }
      if (introRef.current) {
        tl.fromTo(introRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
      }
      if (scrollHintRef.current) {
        tl.fromTo(scrollHintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.2');
      }

      // Track entire document scroll for 3D Kinetic Journey
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setTotalProgress(self.progress);
        },
      });

      // Section triggers for active section detection
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'resume', 'contact'];
      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(secId),
          onEnterBack: () => setActiveSection(secId),
        });
      });

      // Section element reveal animations
      const revealSections = document.querySelectorAll('.section-reveal');
      revealSections.forEach((section) => {
        const elements = section.querySelectorAll('.gsap-reveal');
        const scaleEls = section.querySelectorAll('.gsap-reveal-scale');

        if (elements.length) {
          gsap.fromTo(elements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none none',
              }
            }
          );
        }

        if (scaleEls.length) {
          gsap.fromTo(scaleEls,
            { opacity: 0, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                toggleActions: 'play none none none',
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Shared section heading helper ── */
  const sectionHeading = (label: string, title: string) => (
    <div className="gsap-reveal" style={{ marginBottom: '3.5rem' }}>
      <span className="section-label" style={{ marginBottom: '0.75rem' }}>{label}</span>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        background: 'linear-gradient(135deg, #ffffff 0%, var(--gold-light) 60%, var(--gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {title}
      </h2>
      <div className="gold-divider" style={{ marginTop: '1.25rem' }} />
    </div>
  );

  return (
    <>
      {/* ════════════════════════════════════════
          PERSISTENT 3D KINETIC JOURNEY CANVAS
          ════════════════════════════════════════ */}
      <Suspense fallback={null}>
        <SceneJourney totalProgress={totalProgress} />
      </Suspense>

      {/* ════════════════════════════════════════
          DESKTOP INTERACTIVE SCROLL HUD RAIL
          ════════════════════════════════════════ */}
      <ScrollHUD activeSection={activeSection} totalProgress={totalProgress} />

      {/* ════════════════════════════════════════
          01. HERO SECTION
          ════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="home"
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'transparent',
          paddingTop: '6rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Ambient Gold/Ice Radial Glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse 65% 65% at 75% 45%, rgba(147,197,253,0.08) 0%, rgba(6,8,12,0) 70%)',
          pointerEvents: 'none',
        }} />

        {/* Hero Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="hero-text-wrapper" style={{ maxWidth: '680px' }}>
            
            {/* Status / Location Badge */}
            <div
              ref={badgeRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(147, 197, 253, 0.08)',
                border: '1px solid rgba(147, 197, 253, 0.25)',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                fontWeight: 500,
              }}>
                {LOCATION} · SOFTWARE & ML ENGINEER
              </span>
            </div>

            {/* Full Name */}
            <h1
              ref={nameRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 20%, var(--gold-light) 70%, var(--gold) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                HARSH NARAYAN
              </span>
              <span
                style={{
                  color: 'var(--gold)',
                  textShadow: '0 0 35px rgba(147, 197, 253, 0.35)',
                  display: 'block',
                }}
              >
                SINGH
              </span>
            </h1>

            {/* Title / Role Subtitle */}
            <p
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
                color: 'var(--gold-light)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span>Python Developer</span>
              <span style={{ color: 'var(--gold-dark)' }}>//</span>
              <span>Machine Learning</span>
              <span style={{ color: 'var(--gold-dark)' }}>//</span>
              <span>Backend Systems</span>
            </p>

            {/* Intro Bio */}
            <p
              ref={introRef}
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                lineHeight: 1.8,
                maxWidth: '540px',
                fontWeight: 300,
                marginBottom: '2.5rem',
              }}
            >
              {HERO_INTRO}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <button
                className="btn-gold"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor-hover
              >
                <span>Get in Touch</span>
                <span><ArrowUpRight size={15} /></span>
              </button>

              <a
                href={RESUME_URL}
                download="Harsh_Narayan_Singh_Resume.pdf"
                className="btn-gold"
                style={{ textDecoration: 'none' }}
                data-cursor-hover
              >
                <span>Resume</span>
                <span><Download size={15} /></span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>
            SCROLL
          </span>
          <div style={{
            width: '1px',
            height: '45px',
            background: 'linear-gradient(to bottom, var(--gold), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(0.9); }
            50% { opacity: 1; transform: scaleY(1.1); }
          }
          @media (max-width: 900px) {
            .hero-text-wrapper {
              max-width: 100% !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          02. ABOUT SECTION
          ════════════════════════════════════════ */}
      <section
        id="about"
        className="section-reveal"
        style={{
          padding: '8rem 0',
          background: 'rgba(6, 8, 12, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.08)',
        }}
      >
        <div className="section-bg-number">01</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4.5rem', alignItems: 'center' }} className="about-grid">
            <div>
              {sectionHeading('// 01. ABOUT ME', 'Engineering Scalable Systems with Production Data')}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {ABOUT_TEXT.map((para, i) => (
                  <p
                    key={i}
                    className="gsap-reveal"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '1.05rem',
                      lineHeight: 1.85,
                      fontWeight: 300,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
              {[
                { num: '90K+', label: 'Real Restaurant Orders Processed' },
                { num: '20%', label: 'P95 API Latency Reduction' },
                { num: '250+', label: 'Algorithmic DSA Problems Solved' },
                { num: '3+', label: 'Production Industry Deployments' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card-gold gsap-reveal-scale"
                  style={{
                    padding: '2rem 1.5rem',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div className="stat-number">{stat.num}</div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.04em',
                    marginTop: '0.65rem',
                    lineHeight: 1.5,
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 850px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          03. EXPERIENCE SECTION
          ════════════════════════════════════════ */}
      <section
        id="experience"
        className="section-reveal"
        style={{
          padding: '8rem 0',
          background: 'rgba(6, 8, 12, 0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.08)',
        }}
      >
        <div className="section-bg-number">02</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {sectionHeading('// 02. EXPERIENCE', 'Professional Track Record')}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="glass-card gsap-reveal"
                style={{
                  padding: '2.5rem',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: '2.5rem',
                  position: 'relative',
                }}
              >
                {/* Left Column: Metadata */}
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}>
                    {exp.period}
                  </span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                    {exp.location}
                  </p>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>
                    {exp.type}
                  </span>
                </div>

                {/* Right Column: Role & Impact */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.35rem',
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{
                    color: 'var(--gold-light)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    marginBottom: '1.25rem',
                  }}>
                    {exp.company}
                  </p>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          gap: '0.8rem',
                          color: 'var(--text-secondary)',
                          fontSize: '0.92rem',
                          lineHeight: 1.7,
                          fontWeight: 300,
                        }}
                      >
                        <span style={{ color: 'var(--gold)', marginTop: '0.45rem', flexShrink: 0, fontSize: '0.45rem' }}>◆</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #experience .glass-card {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
              padding: 1.75rem !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          04. SKILLS SECTION
          ════════════════════════════════════════ */}
      <section
        id="skills"
        className="section-reveal"
        style={{
          padding: '8rem 0',
          background: 'rgba(6, 8, 12, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.08)',
        }}
      >
        <div className="section-bg-number">03</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {sectionHeading('// 03. TECHNICAL PROFICIENCY', 'Tools & Architectural Capabilities')}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }} className="skills-grid">
            {SKILL_CATEGORIES.map((category, idx) => (
              <div
                key={idx}
                className="glass-card gsap-reveal"
                style={{
                  padding: '2.25rem',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Sparkles size={16} color="var(--gold)" />
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.01em',
                  }}>
                    {category.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .skills-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          05. PROJECTS SECTION
          ════════════════════════════════════════ */}
      <section
        id="projects"
        className="section-reveal"
        style={{
          padding: '8rem 0',
          background: 'rgba(6, 8, 12, 0.35)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.08)',
        }}
      >
        <div className="section-bg-number">04</div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {sectionHeading('// 04. SELECTED WORKS', 'Production Projects & Systems')}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="glass-card gsap-reveal"
                style={{
                  padding: '3rem',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                }}
              >
                {/* Large Background Project Index */}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '2rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  color: 'rgba(147, 197, 253, 0.06)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                  }}>
                    {project.category}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                    }}>
                      {project.title}
                    </h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        style={{
                          color: 'var(--gold)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.4rem 0.8rem',
                          border: '1px solid rgba(147, 197, 253, 0.3)',
                          borderRadius: '4px',
                          background: 'rgba(147, 197, 253, 0.05)',
                        }}
                      >
                        <Github size={15} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                    {project.description.map((desc, dIdx) => (
                      <li
                        key={dIdx}
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '0.92rem',
                          lineHeight: 1.75,
                          fontWeight: 300,
                          display: 'flex',
                          gap: '0.7rem',
                        }}
                      >
                        <span style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '0.45rem', marginTop: '0.5rem' }}>◆</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          06. RESUME SECTION
          ════════════════════════════════════════ */}
      <section
        id="resume"
        className="section-reveal"
        style={{
          padding: '8rem 0',
          background: 'rgba(6, 8, 12, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.08)',
        }}
      >
        <div className="section-bg-number">05</div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {sectionHeading('// 05. RESUME', 'Curriculum Vitae & Verified Credentials')}

          <p
            className="gsap-reveal"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '520px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            A comprehensive overview of my academic background, production experience, and technical capabilities.
          </p>

          <a
            href={RESUME_URL}
            download="Harsh_Narayan_Singh_Resume.pdf"
            className="btn-gold gsap-reveal"
            style={{ display: 'inline-flex', textDecoration: 'none', marginBottom: '4rem' }}
            data-cursor-hover
          >
            <span>Download Official PDF</span>
            <span><Download size={15} /></span>
          </a>

          {/* Rendered Dark Glass Resume Card */}
          <div
            className="glass-card gsap-reveal"
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              padding: '3.5rem',
              borderRadius: '8px',
              textAlign: 'left',
              border: '1px solid rgba(147, 197, 253, 0.2)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(147, 197, 253, 0.15)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                HARSH NARAYAN SINGH
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                <span>harshnarayansingh306@gmail.com</span>
                <span style={{ color: 'var(--gold)' }}>•</span>
                <span>+91 9354928723</span>
                <span style={{ color: 'var(--gold)' }}>•</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>LinkedIn</a>
                <span style={{ color: 'var(--gold)' }}>•</span>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>GitHub</a>
              </div>
            </div>

            {/* Professional Summary */}
            <div style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.85rem', borderBottom: '1px solid rgba(147, 197, 253, 0.1)', paddingBottom: '0.4rem', fontWeight: 600 }}>
                Professional Summary
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300 }}>
                Backend-focused Software Engineer with experience building production-grade REST services, ML-driven systems, and cloud-native deployments. Strong in backend system design, data structures, CI/CD, and scalable API development.
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.85rem', borderBottom: '1px solid rgba(147, 197, 253, 0.1)', paddingBottom: '0.4rem', fontWeight: 600 }}>
                Education
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                <span style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 600 }}>B.Tech in Computer Science Engineering (Data Science)</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>2022 – 2026</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Ajay Kumar Garg Engineering College, Ghaziabad <span style={{ color: 'var(--gold-light)', marginLeft: '0.5rem' }}>(CGPA: 7.71 / 10)</span>
              </p>
            </div>

            {/* Technical Skills breakdown */}
            <div style={{ marginBottom: '2.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.85rem', borderBottom: '1px solid rgba(147, 197, 253, 0.1)', paddingBottom: '0.4rem', fontWeight: 600 }}>
                Technical Competencies
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {[
                  ['Languages', 'Python, C++, JavaScript, CSS'],
                  ['Web Technologies', 'HTML, CSS, CSS Preprocessors, MVC, JSON'],
                  ['AI / ML', 'XGBoost, Scikit-learn, Computer Vision, MediaPipe, Feature Engineering'],
                  ['Backend', 'Django REST, FastAPI, Flask, REST APIs, JWT, RBAC, Caching'],
                  ['Cloud & DevOps', 'AWS (EC2), Azure App Service, Docker, GitHub Actions, CI/CD'],
                  ['Databases', 'PostgreSQL, MySQL, MongoDB, Supabase'],
                  ['Core CS', 'Data Structures, Algorithms, OOP, DBMS, OS, Computer Networks'],
                  ['Tools', 'Git, Linux, Postman, Pytest'],
                ].map(([key, val]) => (
                  <p key={key} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--gold-light)' }}>{key}: </strong>
                    {val}
                  </p>
                ))}
              </div>
            </div>

            {/* DSA & Certs */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.85rem', borderBottom: '1px solid rgba(147, 197, 253, 0.1)', paddingBottom: '0.4rem', fontWeight: 600 }}>
                Competitive Programming & Certifications
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '0.4rem' }}>
                • Solved <strong style={{ color: '#ffffff' }}>250+ algorithmic problems</strong> across LeetCode, HackerRank, and CodeChef (<span style={{ color: 'var(--gold)' }}>CodeChef Rating: 1741</span>).
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                • MongoDB Basics (Udemy) · Python Programming (Infosys Springboard) · Fundamentals of ML – Scikit-learn (Infosys Springboard).
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #resume .glass-card {
              padding: 2rem !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════
          07. CONTACT SECTION
          ════════════════════════════════════════ */}
      <section
        id="contact"
        className="section-reveal"
        style={{
          padding: '9rem 0 7rem',
          background: 'rgba(6, 8, 12, 0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(147, 197, 253, 0.12)',
        }}
      >
        <div className="section-bg-number">06</div>

        {/* Glowing radial background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(147,197,253,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {sectionHeading('// 06. CONTACT', 'Let’s Build Something Exceptional')}

          <p
            className="gsap-reveal"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '480px',
              margin: '0 auto 3rem',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Open to full-time Software Engineer and Data Science roles. Let’s discuss how I can contribute to your engineering team.
          </p>

          <a
            href={`mailto:${RECRUITER_EMAIL}`}
            className="glow-email gsap-reveal"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 4vw, 2.6rem)',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '3.5rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
            data-cursor-hover
          >
            {RECRUITER_EMAIL}
          </a>

          <div
            className="gsap-reveal"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '3.5rem',
              marginBottom: '2rem',
            }}
          >
            <a href={`mailto:${GENERAL_EMAIL}`} className="magnetic-link" data-cursor-hover>
              <Mail size={24} strokeWidth={1.5} />
              <span>Email</span>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="magnetic-link" data-cursor-hover>
              <Github size={24} strokeWidth={1.5} />
              <span>GitHub</span>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="magnetic-link" data-cursor-hover>
              <Linkedin size={24} strokeWidth={1.5} />
              <span>LinkedIn</span>
            </a>
          </div>

          <p
            className="gsap-reveal"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Typically responds within 24 hours
          </p>
        </div>
      </section>
    </>
  );
}