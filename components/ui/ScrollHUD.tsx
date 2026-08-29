import React from 'react';

const SECTIONS = [
  { num: '01', id: 'home', label: 'HERO' },
  { num: '02', id: 'about', label: 'ABOUT' },
  { num: '03', id: 'experience', label: 'EXPERIENCE' },
  { num: '04', id: 'skills', label: 'SKILLS' },
  { num: '05', id: 'projects', label: 'PROJECTS' },
  { num: '06', id: 'contact', label: 'CONTACT' },
];

interface ScrollHUDProps {
  activeSection: string;
  totalProgress: number;
}

export default function ScrollHUD({ activeSection, totalProgress }: ScrollHUDProps) {
  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="scroll-hud"
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '1.25rem',
        pointerEvents: 'auto',
      }}
    >
      {/* Laser Progress Tracker Line */}
      <div
        style={{
          position: 'absolute',
          right: '5px',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(147, 197, 253, 0.12)',
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: `${Math.min(100, Math.max(0, totalProgress * 100))}%`,
            background: 'linear-gradient(to bottom, var(--gold-dark), var(--gold-light))',
            boxShadow: '0 0 10px var(--gold)',
            transition: 'height 0.1s linear',
          }}
        />
      </div>

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'none',
              border: 'none',
              padding: '0.2rem 0',
              cursor: 'none',
              position: 'relative',
              zIndex: 1,
              transition: 'all 0.3s ease',
            }}
            data-cursor-hover
            title={`Jump to ${sec.label}`}
          >
            {/* Section Label (reveals on hover / active) */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                transition: 'all 0.3s ease',
                fontWeight: isActive ? 600 : 400,
              }}
              className="hud-label"
            >
              {sec.label}
            </span>

            {/* Glowing Dot / Step Indicator */}
            <div
              style={{
                width: isActive ? '11px' : '5px',
                height: isActive ? '11px' : '5px',
                borderRadius: '50%',
                background: isActive ? 'var(--gold-light)' : 'rgba(147, 197, 253, 0.3)',
                boxShadow: isActive ? '0 0 14px var(--gold-light), 0 0 25px var(--gold)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </button>
        );
      })}

      <style>{`
        @media (max-width: 1024px) {
          .scroll-hud { display: none !important; }
        }
        .scroll-hud button:hover .hud-label {
          opacity: 0.85 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </aside>
  );
}
