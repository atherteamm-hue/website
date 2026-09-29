import React from 'react';

export const TechnicalLibraryPage: React.FC = () => {
  return (
    <div className="relative z-1 min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      
      {/* القسم العلوي (Header) */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase mb-3">
          <span>ATHAR RESOURCES</span>
          <span>∙</span>
          <span>KNOWLEDGE BASE</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Technical Library
        </h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl font-light leading-relaxed">
          The ultimate repository for ATHAR's engineering projects, source codes, and technical documentation. Explore our open-source algorithms, hardware schematics, and embedded systems architectures.
        </p>
      </div>

      {/* المساحة المخصصة لمحتوى المكتبة اللي رح نبنيه هسا */}
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50 mt-10">
        <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
          [ WAITING FOR YOUR MODULES & IDEAS... ]
        </span>
      </div>

    </div>
  );
};
