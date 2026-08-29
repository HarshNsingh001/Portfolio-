import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

export interface ThemeConfig {
  id: string;
  name: string;
  category: string;
  dotColor: string;
  gold: string;
  goldLight: string;
  goldDark: string;
  lightColor1: string;
  lightColor2: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'ice',
    name: 'Frost Titanium',
    category: 'Nordic Minimal & Ice Blue',
    dotColor: '#93C5FD',
    gold: '#93C5FD',
    goldLight: '#E0F2FE',
    goldDark: '#3B82F6',
    lightColor1: '#93C5FD',
    lightColor2: '#E0F2FE',
  },
  {
    id: 'slate',
    name: 'Apple Space Slate',
    category: 'Silicon Valley Pro',
    dotColor: '#60A5FA',
    gold: '#60A5FA',
    goldLight: '#93C5FD',
    goldDark: '#1D4ED8',
    lightColor1: '#93C5FD',
    lightColor2: '#3B82F6',
  },
  {
    id: 'cobalt',
    name: 'Stripe Indigo',
    category: 'Fintech & Infra',
    dotColor: '#6366F1',
    gold: '#6366F1',
    goldLight: '#A5B4FC',
    goldDark: '#3730A3',
    lightColor1: '#818CF8',
    lightColor2: '#4F46E5',
  },
  {
    id: 'platinum',
    name: 'OpenAI Platinum',
    category: 'AI Research Lab',
    dotColor: '#E2D9C8',
    gold: '#D4C8B5',
    goldLight: '#F5EFE6',
    goldDark: '#8C7F6B',
    lightColor1: '#F5EFE6',
    lightColor2: '#D4C8B5',
  },
  {
    id: 'chrome',
    name: 'Vercel Monochrome',
    category: 'Minimalist Engineering',
    dotColor: '#F8FAFC',
    gold: '#E2E8F0',
    goldLight: '#FFFFFF',
    goldDark: '#475569',
    lightColor1: '#FFFFFF',
    lightColor2: '#94A3B8',
  },
  {
    id: 'sage',
    name: 'Deep Forest Sage',
    category: 'Enterprise Backend',
    dotColor: '#34D399',
    gold: '#10B981',
    goldLight: '#6EE7B7',
    goldDark: '#065F46',
    lightColor1: '#6EE7B7',
    lightColor2: '#059669',
  },
  {
    id: 'gold',
    name: 'Royal Black & Gold',
    category: 'Executive Luxury',
    dotColor: '#C9A84C',
    gold: '#C9A84C',
    goldLight: '#E8C87A',
    goldDark: '#8B6914',
    lightColor1: '#FFE090',
    lightColor2: '#C9A84C',
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
            background: 'rgba(8, 10, 14, 0.94)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid var(--border-hover)',
            borderRadius: '16px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px var(--gold-glow)',
            minWidth: '240px',
            animation: 'themeFadeIn 0.25s ease-out',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '0.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                fontWeight: 600,
              }}
            >
              Professional Palettes
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'var(--text-muted)',
              }}
            >
              6 STYLES
            </span>
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
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '10px',
                  background: isSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: isSelected ? '1px solid var(--border-hover)' : '1px solid transparent',
                  color: isSelected ? 'var(--gold-light)' : 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.2s ease',
                  width: '100%',
                  textAlign: 'left',
                }}
                data-cursor-hover
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: theme.dotColor,
                      boxShadow: isSelected ? `0 0 12px ${theme.dotColor}` : 'none',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ color: isSelected ? '#ffffff' : 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 500 }}>
                      {theme.name}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.62rem', fontFamily: 'var(--font-mono)' }}>
                      {theme.category}
                    </div>
                  </div>
                </div>

                {isSelected && <Check size={14} color="var(--gold-light)" />}
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
          gap: '0.65rem',
          padding: '0.75rem 1.35rem',
          borderRadius: '9999px',
          background: 'rgba(10, 12, 16, 0.85)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid var(--border)',
          color: 'var(--gold)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 600,
          boxShadow: '0 12px 35px rgba(0,0,0,0.7), 0 0 25px var(--gold-glow)',
          transition: 'all 0.3s ease',
        }}
        data-cursor-hover
        title="Change Portfolio Color Theme"
      >
        <Palette size={16} color="var(--gold)" />
        <span>Palette</span>
      </button>

      <style>{`
        @keyframes themeFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
