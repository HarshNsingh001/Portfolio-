import React from 'react';
import { Mail, Clock, ArrowRight } from 'lucide-react';
import { RECRUITER_EMAIL } from '../constants';

const ContactBanner: React.FC = () => {
  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 md:p-12 my-12">
      <div className="max-w-3xl">
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          Recruiter Contact <span className="hidden md:inline text-neutral-400 font-normal text-lg">| Hiring & Interview Communication</span>
        </h3>
        
        <p className="text-neutral-600 mb-8 max-w-xl leading-relaxed">
          I am currently open to mid-level and high-growth opportunities. 
          Please include the role name, company name, and tech stack in your initial message.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <a 
            href={`mailto:${RECRUITER_EMAIL}`}
            className="group flex items-center gap-3 bg-neutral-900 text-white px-6 py-3 rounded-md font-medium hover:bg-neutral-800 transition-all hover:pr-8"
          >
            <Mail size={18} />
            {RECRUITER_EMAIL}
            <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
          </a>
          
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Clock size={16} />
            <span>Responds within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;