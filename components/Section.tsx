import React from 'react';

interface SectionProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  id?: string;
  dark?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, className = "", children, id, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-24 md:py-32 ${dark ? 'bg-white' : 'bg-om-bg'} ${className}`}
    >
      <div className="max-w-5xl mx-auto px-6">
        {title && (
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-om-navy mb-4 tracking-tight">
              {title}
            </h2>
            <div className="h-px w-16 bg-om-gold mx-auto"></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;