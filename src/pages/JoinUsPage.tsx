import React, { useState } from 'react';

interface TeamTrack {
  title: string;
  category: string;
  type: string;
  description: string;
  requirements: string[];
}

const TRACKS: TeamTrack[] = [
  {
    title: 'Technical Team (Core)',
    category: 'Engineering & Development',
    type: 'Mandatory Base',
    description: 'The core of ATHAR. Dive deep into robotics, embedded systems, control systems, and mechanical design. Build real-world projects and expand your engineering horizons.',
    requirements: ['Passion for engineering and continuous learning', 'Commitment to the team\'s technical projects', 'Basic knowledge in programming, hardware, or CAD is a plus']
  },
  {
    title: 'Media Team (+ Technical)',
    category: 'Core + Volunteer Track',
    type: 'Dual Track',
    description: 'Combine your engineering skills with creative vision. Join the technical team while volunteering to produce motion graphics, manage social media, and document our engineering achievements.',
    requirements: ['All Technical Team requirements', 'Interest in video editing, graphic design, or PR', 'Creative mindset and attention to detail']
  },
  {
    title: 'Academic Team (+ Technical)',
    category: 'Core + Volunteer Track',
    type: 'Dual Track',
    description: 'Master technical engineering while empowering others. Join the technical team and volunteer to organize workshops, create study materials, and lead educational tutoring sessions.',
    requirements: ['All Technical Team requirements', 'Strong understanding of core engineering subjects', 'Desire to teach, present, and help students succeed']
  }
];

export const JoinUsPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@athar.team');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative z-1 min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 md:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-500 uppercase mb-3">
          <span>RECRUITMENT & VOLUNTEERING</span>
          <span>∙</span>
          <span>ATHAR TEAM</span>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Join ATHAR
        </h1>
        <p className="text-lg sm:text-xl text-neutral-700 max-w-3xl font-light leading-relaxed mb-4">
          ATHAR is primarily a <strong className="font-medium text-black">Technical Engineering Office</strong>. All admitted members must join the Technical Team to learn, design, and build engineering systems.
        </p>
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl font-light leading-relaxed">
          However, we offer voluntary tracks. You can choose to apply for the <strong className="text-black">Media</strong> or <strong className="text-black">Academic</strong> teams to work on creative or educational projects <span className="italic">alongside</span> your primary technical duties.
        </p>
      </div>

      {/* Tracks List */}
      <div className="space-y-4 mb-14">
        {TRACKS.map((track) => (
          <div
            key={track.title}
            className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xs hover:border-black transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  {track.category} ∙ {track.type}
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-black">
                  {track.title}
                </h3>
              </div>
              
              {/* الكبسة حالياً معطلة وما بتعمل اشي */}
              <button
                type="button"
                onClick={() => {
                  console.log("Waiting for the external form links...");
                }}
                className="self-start sm:self-center px-5 py-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-mono uppercase tracking-wider cursor-default"
              >
                Apply Now &rarr;
              </button>

            </div>
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
              {track.description}
            </p>
          </div>
        ))}
      </div>

      {/* General Dispatch Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
            GENERAL INQUIRIES
          </span>
          <h3 className="text-2xl font-normal tracking-tight mb-2">
            Have a different proposition?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
            If you have an exceptional project idea, want to collaborate with ATHAR, or offer a unique skill set, feel free to reach out directly.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="shrink-0 px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-100 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          {copiedEmail ? '✓ Copied info@athar.team' : 'Email: info@athar.team'}
        </button>
      </div>

    </div>
  );
};
