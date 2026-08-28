import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from './ui/CustomCursor';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Resume',     id: 'resume' },
  { label: 'Contact',    id: 'contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef<Lenis | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  /* ── Scroll state tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      let current = 'home';
      sections.forEach(section => {
        if (!section) return;
        if (window.scrollY >= section.offsetTop - 220) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Nav entrance animation ── */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, 
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === 'home') {
      lenisRef.current?.scrollTo(0, { duration: 1.2 });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      lenisRef.current?.scrollTo(el, { offset: -70, duration: 1.2 });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <CustomCursor />

      {/* ── Floating Header Navigation (No Logo, Centered Glass Pill) ── */}
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: '1.2rem',
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          padding: '0 1.5rem',
        }}
      >
        {/* Desktop Centered Glass Pill */}
        <nav
          className="desktop-nav"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem',
            padding: '0.65rem 1.75rem',
            background: scrolled ? 'rgba(10, 10, 12, 0.85)' : 'rgba(15, 15, 18, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '9999px',
            border: scrolled ? '1px solid rgba(201, 168, 76, 0.25)' : '1px solid rgba(201, 168, 76, 0.15)',
            boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.08)' : '0 10px 30px rgba(0,0,0,0.4)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Subtle Live Status Indicator */}
          <button
            onClick={() => scrollTo('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginRight: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
            data-cursor-hover
            title="Back to Top"
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                display: 'inline-block',
              }}
            />
            <span>PORTFOLIO</span>
          </button>

          <div style={{ width: '1px', height: '14px', background: 'rgba(201,168,76,0.2)' }} />

          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              data-cursor-hover
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Header Bar */}
        <div
          className="mobile-header"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
        >
          <div
            onClick={() => scrollTo('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(15,15,18,0.85)',
              backdropFilter: 'blur(20px)',
              borderRadius: '9999px',
              border: '1px solid rgba(201,168,76,0.2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--gold)',
              letterSpacing: '0.15em',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
            PORTFOLIO
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15,15,18,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--gold)',
            }}
            data-cursor-hover
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '5rem',
              left: '1.5rem',
              right: '1.5rem',
              background: 'rgba(10, 10, 12, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              pointerEvents: 'auto',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  textAlign: 'left',
                  color: activeSection === item.id ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                  padding: '0.25rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
                  0{i + 1}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: '2.5rem 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          background: 'var(--bg)',
        }}
      >
        <p className="footer-text">
          © {new Date().getFullYear()} &nbsp;·&nbsp; Harsh Narayan Singh &nbsp;·&nbsp; Engineered for Scale
        </p>
      </footer>

      <style>{`
        @media (min-width: 769px) {
          .mobile-header { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}