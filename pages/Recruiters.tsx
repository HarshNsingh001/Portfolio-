import React from 'react';
import { CheckCircle2, XCircle, Briefcase, Zap, Code2 } from 'lucide-react';
import Section from '../components/Section';
import ContactBanner from '../components/ContactBanner';

const Recruiters: React.FC = () => {
  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <div className="bg-white border-b border-neutral-200">
         <Section className="py-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
              For Recruiters
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl">
              A quick snapshot of why I am the right technical fit for your backend and data engineering roles, without the fluff.
            </p>
         </Section>
      </div>

      <Section>
        {/* Quick Snapshot */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Briefcase className="text-neutral-400" /> The Profile
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Education</span>
                <span className="text-neutral-900 font-medium text-right">B.Tech CSE (Data Science), 2026</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Core Stack</span>
                <span className="text-neutral-900 font-medium text-right">Python, SQL, AWS, REST APIs</span>
              </div>
              <div className="flex justify-between border-b border-neutral-100 pb-2">
                <span className="text-neutral-500">Domain</span>
                <span className="text-neutral-900 font-medium text-right">Backend, SaaS, ML Pipelines</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-neutral-500">Availability</span>
                <span className="text-green-600 font-medium text-right">Immediate</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
             <h3 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
              <Zap className="text-neutral-400" /> Why Hire Me?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle2 size={20} className="text-neutral-800 shrink-0" />
                <span className="text-neutral-600 text-sm">
                  <strong className="text-neutral-900 block mb-0.5">Real-World Experience</strong>
                  I've worked with production data (90k+ orders) and integrated messy legacy POS systems, not just tutorial datasets.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={20} className="text-neutral-800 shrink-0" />
                 <span className="text-neutral-600 text-sm">
                  <strong className="text-neutral-900 block mb-0.5">Production Mindset</strong>
                  I build for scalability and maintainability. I understand auth, CI/CD, and cloud deployment.
                </span>
              </li>
              <li className="flex gap-3">
                 <CheckCircle2 size={20} className="text-neutral-800 shrink-0" />
                 <span className="text-neutral-600 text-sm">
                  <strong className="text-neutral-900 block mb-0.5">Hybrid Skillset</strong>
                  Strong backend engineering foundations mixed with practical machine learning capabilities.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* What I actually do vs Buzzwords */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">What I Actually Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-lg border border-neutral-200">
               <div className="flex items-center gap-2 mb-4 text-green-700 font-medium">
                 <CheckCircle2 size={18} /> Practical Execution
               </div>
               <ul className="space-y-3 text-neutral-600 text-sm">
                 <li>• Designing schema for multi-tenant SaaS applications.</li>
                 <li>• Writing efficient SQL queries for large datasets.</li>
                 <li>• Cleaning dirty data to make ML models actually work.</li>
                 <li>• Securing APIs with OAuth and Role-Based Access.</li>
               </ul>
             </div>
             
             <div className="bg-white p-6 rounded-lg border border-neutral-200 opacity-70">
               <div className="flex items-center gap-2 mb-4 text-neutral-500 font-medium">
                 <XCircle size={18} /> No Fluff / Buzzwords
               </div>
               <ul className="space-y-3 text-neutral-500 text-sm line-through decoration-neutral-300">
                 <li>• "Ninja Rockstart Developer"</li>
                 <li>• blindly using AI without understanding the code</li>
                 <li>• Over-engineering simple CRUD apps with Microservices</li>
                 <li>• Claiming 10 years experience in a 2 year old framework</li>
               </ul>
             </div>
          </div>
        </div>

        <ContactBanner />
      </Section>
    </div>
  );
};

export default Recruiters;