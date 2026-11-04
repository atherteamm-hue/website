import React from 'react';

const UPCOMING = [
  {
    index: '01',
    title: 'Source Code',
    description: 'Repositories, algorithms, and firmware from our robotics and automation builds.',
  },
  {
    index: '02',
    title: 'Hardware & Schematics',
    description: 'Circuit diagrams, PCB layouts, and the electronics behind our prototypes.',
  },
  {
    index: '03',
    title: 'Technical Docs',
    description: 'Build guides, datasheets, and engineering notes written by the team.',
  },
];

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
          The ultimate repository for ATHAR&apos;s engineering projects, source codes, and technical documentation. Explore our open-source algorithms, hardware schematics, and embedded systems architectures.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        {/* Subtle grid backdrop, fades out towards the center */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 85%)',
          }}
          aria-hidden="true"
        />

        <div className="relative px-6 py-16 sm:px-10 sm:py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-4 py-1.5 shadow-xs mb-7">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-neutral-600">
              In development
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Coming soon
          </h2>
          <p className="mx-auto max-w-xl text-base sm:text-lg font-light leading-relaxed text-neutral-600">
            We&apos;re building a permanent home for the code, circuits, and documentation behind ATHAR&apos;s engineering work. Check back soon.
          </p>

          <div className="mt-10">
            <a
              href="#academic-library"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-neutral-800 hover:scale-[1.03]"
            >
              Explore the Academic Library
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {UPCOMING.map((item) => (
          <div
            key={item.index}
            className="rounded-2xl border border-neutral-200 bg-white/80 p-6 backdrop-blur-sm"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-3">
              {item.index} / Planned
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight text-black mb-2">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
