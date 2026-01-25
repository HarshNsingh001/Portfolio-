import React from 'react';
import { Download, FileText } from 'lucide-react';
import Section from '../components/Section';

const Resume: React.FC = () => {
  return (
    <Section className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Resume</h1>
           <p className="text-neutral-500">Last updated: October 2023</p>
        </div>
        <a 
          href="/resume.pdf" 
          download="Harsh_Singh_Resume.pdf"
          className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium"
        >
          <Download size={18} /> Download PDF
        </a>
      </div>

      <div className="bg-neutral-100 border border-neutral-200 rounded-lg w-full h-[800px] flex flex-col items-center justify-center text-neutral-400">
        <div className="text-center p-8">
            <FileText size={48} className="mx-auto mb-4 text-neutral-300" />
            <p className="text-lg font-medium text-neutral-600 mb-2">Preview Unavailable in Dev Mode</p>
            <p className="text-sm max-w-md mx-auto mb-6">
              In a production environment, the PDF would be embedded here. 
              Please use the download button above to view the full document.
            </p>
            <a 
              href="#" 
              className="text-neutral-900 underline hover:text-neutral-600"
              onClick={(e) => e.preventDefault()}
            >
              View text-only version
            </a>
        </div>
      </div>
    </Section>
  );
};

export default Resume;