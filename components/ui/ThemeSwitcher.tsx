import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export interface ThemeConfig {
  id: string;
  name: string;
  dotColor: string;
  gold: string;
  goldLight: string;
  goldDark: string;
  lightColor1: string;
  lightColor2: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'gold',
    name: 'Black & Gold',
    dotColor: '#C9A84C',
    gold: '#C9A84C',
    goldLight: '#E8C87A',
    goldDark: '#8B6914',
    lightColor1: '#FFE090',
    lightColor2: '#C9A84C',
  },
  {
    id: 'cyan',
    name: 'Linear Obsidian',
    dotColor: '#38BDF8',
    gold: '#38BDF8',
    goldLight: '#818CF8',
    goldDark: '#1E40AF',
    lightColor1: '#38BDF8',
    lightColor2: '#818CF8',
  },
  {
    id: 'emerald',
    name: 'Cyber Emerald',
    dotColor: '#10B981',
    gold: '#10B981',
    goldLight: '#34D399',
    goldDark: '#047857',
    lightColor1: '#00FF87',
    lightColor2: '#10B981',
  },
  {
    id: 'purple',
    name: 'Deep Nebula',
    dotColor: '#A855F7',
    gold: '#A855F7',
    goldLight: '#EC4899',
    goldDark: '#6B21A8',
    lightColor1: '#F43F5E',
    lightColor2: '#A855F7',
  },
  {
    id: 'orange',
    name: 'Solar Flare',
    dotColor: '#FF6B00',
    gold: '#FF6B00',
    goldLight: '#FFA133',
    goldDark: '#B43B00',
    lightColor1: '#FF8000',
    lightColor2: '#FFA133',
  },
  {
    id: 'ice',
    name: 'Frost Titanium',
    dotColor: '#93C5FD',
    gold: '#93C5FD',
    goldLight: '#E0F2FE',
    goldDark: '#3B82F6',
    lightColor1: '#93C5FD',
    lightColor2: '#E0F2FE',
  },
];

interface ThemeSwitcherProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeSwitcher({ currentTheme, onSelectTheme }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
      }}
    >
      {/* Theme Options Flyout */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(10, 12, 16, 0.92)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px var(--gold-glow)',
            minWidth: '180px',
            animation: 'themeFadeIn 0.25s ease-out',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.25rem',
              paddingBottom: '0.35rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Switch Theme
          </div>

          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: isSelected ? '1px solid var(--border-hover)' : '1px solid transparent',
                  color: isSelected ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                  width: '100%',
                  textAlign: 'left',
                }}
                data-cursor-hover
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: theme.dotColor,
                    boxShadow: isSelected ? `0 0 10px ${theme.dotColor}` : 'none',
                    flexShrink: 0,
                  }}
                />
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.7rem 1.2rem',
          borderRadius: '9999px',
          background: 'rgba(12, 14, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          color: 'var(--gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
          boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px var(--gold-glow)',
          transition: 'all 0.3s ease',
        }}
        data-cursor-hover
        title="Change Portfolio Color Theme"
      >
        <Palette size={16} color="var(--gold)" />
        <span>Theme</span>
      </button>

      <style>{`
        @keyframes themeFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
