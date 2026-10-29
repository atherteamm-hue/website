import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../useTypewriter.ts';
import { PageId } from '../types.ts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

const HERO_TEXT = 'ATHAR\nAdvanced Technologies in Hardware, Automation, and Robotics.';

const TypewriterLine: React.FC = () => {
  const { displayed, done } = useTypewriter(HERO_TEXT, 38, 600);

  return (
    <p className="absolute inset-0 text-black font-normal whitespace-pre-line text-[clamp(18px,4vw,26px)] leading-[1.35] overflow-hidden">
      <span>{displayed}</span>
      {!done && (
        <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink" />
      )}
    </p>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<'socials' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setButtonsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@atharteam.org');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <section className="relative z-[1] flex flex-col justify-end pb-12 md:justify-center md:pb-0 h-screen px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="w-full max-w-xl relative z-10">
        {/* 1. Blurred intro label */}
        <div className="pointer-events-none select-none mb-5 sm:mb-6">
          <p className="text-black font-normal blur-[4px] text-[clamp(18px,4vw,26px)] leading-[1.3]">
            Meet,
          </p>
        </div>

        {/* 2. Typewriter text */}
        <div className="relative mb-5 sm:mb-6">
          <span
            aria-hidden="true"
            className="invisible block whitespace-pre-line font-normal text-[clamp(18px,4vw,26px)] leading-[1.35]"
          >
            {HERO_TEXT}
          </span>
          <TypewriterLine />
        </div>

        {/* 3. Action pill buttons */}
        <div className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          
          <button onClick={() => setActiveModal('socials')} className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            Follow our socials
          </button>

          <a href="https://tally.so/r/0Vrbz0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            work with us
          </a>

          <button onClick={() => onNavigate('about-us')} className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            Who we are
          </button>

          {/* Email Copy Button */}
          <button onClick={copyEmail} className="inline-flex items-center bg-transparent text-black border border-black rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer gap-2 sm:gap-3 group">
            <span>Reach us: <span className="underline underline-offset-1">hello@atharteam.org</span></span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 group-hover:scale-110 transition-transform">
              <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8.5 2.5V2C8.5 1.44772 8.05228 1 7.5 1H2C1.44772 1 1 1.44772 1 2V7.5C1 8.05228 1.44772 8.5 2 8.5H2.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        <div className={`mt-2 ml-2 transition-opacity duration-200 text-xs font-mono text-neutral-600 ${copied ? 'opacity-100' : 'opacity-0'}`}>
          ✓ Copied hello@atharteam.org to clipboard
        </div>
      </div>

      {/* ═══════════════ MODALS ═══════════════ */}
      {activeModal === 'socials' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 text-black overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                ATHAR // SOCIALS
              </span>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-black text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/company/team-athar/' },
                { name: 'Instagram', url: 'https://www.instagram.com/team_athar_?stkn=MXRhbWx2ZmttNjVtZw%3D%3D' },
                { name: 'Facebook', url: 'https://www.facebook.com/share/19k5AGXANy/?mibextid=wwXIfr' },
                { name: 'YouTube', url: 'https://youtube.com/@atharteam-9?si=yniI07m_GxcRiuVp' }
              ].map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors flex justify-between items-center group">
                  <span className="font-medium">{social.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
