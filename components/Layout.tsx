import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-om-bg text-om-navy">
      {/* Sticky Header */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled ? 'bg-om-bg/95 backdrop-blur-md border-om-beige py-4 shadow-sm' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div 
            onClick={() => scrollToSection('home')} 
            className="cursor-pointer font-serif text-lg md:text-xl font-bold tracking-widest text-om-navy hover:text-om-gold transition-colors"
          >
            H.N.S.
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-om-charcoal hover:text-om-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-om-navy hover:text-om-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-om-bg border-b border-om-beige px-6 py-8 shadow-xl flex flex-col space-y-6 animate-fade-in">
             {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm uppercase tracking-widest font-medium text-om-navy text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-om-navy py-8 text-center border-t border-om-charcoal/20">
        <p className="text-om-beige/60 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Harsh Narayan Singh. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;