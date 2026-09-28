import React, { useState, useEffect, useMemo } from 'react';
import { useTypewriter } from '../useTypewriter.ts';
import { PageId } from '../types.ts';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

// ═══════════════ GPA CONSTANTS ═══════════════
const GRADE_LABELS = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
const NEW_WEIGHTS = [4, 3.75, 3.5, 3.25, 3, 2.75, 2.5, 2, 1.75, 1.25, 1, 0.5];
const OLD_WEIGHTS = [4, 3.75, 3.5, 3, 2.75, 2.5, 2, 1.75, 1.5, 1, 0.75, 0.5];

interface CourseState {
  id: number;
  enabled: boolean;
  name: string;
  hours: number;
  gradeIndex: number;
  isRepeated: boolean;
  isOldWeight: boolean;
  oldGradeIndex: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<'socials' | 'gpa' | null>(null);

  // ═══════════════ GPA CALCULATOR STATE ═══════════════
  const [currentH, setCurrentH] = useState<string>('');
  const [currentG, setCurrentG] = useState<string>('');
  const [courses, setCourses] = useState<CourseState[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      enabled: i < 4,
      name: '',
      hours: 3,
      gradeIndex: 0,
      isRepeated: false,
      isOldWeight: false,
      oldGradeIndex: 0,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => setButtonsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const { displayed, done } = useTypewriter(
    'ATHAR\nAdvanced Technologies in Hardware, Automation, and Robotics.',
    38,
    600
  );

  // ═══════════════ GPA CALCULATION LOGIC ═══════════════
  const gpaResult = useMemo(() => {
    const curH = parseFloat(currentH) || 0;
    const curG = parseFloat(currentG) || 0;
    let totalPts = curH * curG;
    let totalH = curH;

    courses.forEach((c) => {
      if (!c.enabled) return;
      const h = c.hours;
      const g = NEW_WEIGHTS[c.gradeIndex];

      if (c.isRepeated && curH > 0) {
        const oldWeightValue = c.isOldWeight ? OLD_WEIGHTS[c.oldGradeIndex] : NEW_WEIGHTS[c.oldGradeIndex];
        totalPts = totalPts - (h * oldWeightValue) + (h * g);
      } else {
        totalPts += h * g;
        totalH += h;
      }
    });

    const res = totalH > 0 ? Math.min(Math.max(totalPts / totalH, 0), 4) : 0;
    
    let rate = '---';
    if (totalH > 0) {
      if (res >= 3.65) rate = 'Excellent';
      else if (res >= 3.00) rate = 'Good';
      else if (res >= 2.50) rate = 'Satisfactory';
      else if (res >= 2.00) rate = 'Minimally Acceptable';
      else rate = 'Fail';
    }

    return { gpa: res.toFixed(2), hours: totalH, rate };
  }, [courses, currentH, currentG]);

  const updateCourse = (id: number, updates: Partial<CourseState>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

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
        <p className="text-black mb-5 sm:mb-6 font-normal min-h-[54px] whitespace-pre-line text-[clamp(18px,4vw,26px)] leading-[1.35]">
          <span>{displayed}</span>
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink" />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          
          <button onClick={() => setActiveModal('socials')} className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            Follow our socials
          </button>

          <button onClick={() => onNavigate('join-us')} className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            Work with us
          </button>

          <button onClick={() => setActiveModal('gpa')} className="inline-flex items-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors hover:bg-black hover:text-white cursor-pointer shadow-xs">
            GPA Calculator
          </button>

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
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 text-black overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                ATHAR // {activeModal === 'socials' ? 'SOCIALS' : 'GPA CALCULATOR'}
              </span>
              <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-black text-xl">✕</button>
            </div>

            {activeModal === 'socials' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'LinkedIn', url: '' },
                  { name: 'Instagram', url: 'https://www.instagram.com/team_athar_?stkn=MXRhbWx2ZmttNjVtZw%3D%3D' },
                  { name: 'Facebook', url: '' },
                  { name: 'YouTube', url: '' }
                ].map(social => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors flex justify-between items-center group">
                    <span className="font-medium">{social.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl">
                  <div>
                    <label className="block text-[10px] uppercase tracking-tighter text-neutral-500 mb-1">Total Earned Hours</label>
                    <input type="number" value={currentH} onChange={e => setCurrentH(e.target.value)} placeholder="0" className="w-full bg-transparent border-b border-neutral-300 focus:border-black outline-none py-1" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-tighter text-neutral-500 mb-1">Current Cumulative GPA</label>
                    <input type="number" value={currentG} onChange={e => setCurrentG(e.target.value)} placeholder="0.00" className="w-full bg-transparent border-b border-neutral-300 focus:border-black outline-none py-1" />
                  </div>
                </div>

                <div className="space-y-3">
                  {courses.map((course, idx) => (
                    <div key={idx} className={`p-3 border rounded-xl transition-all ${course.enabled ? 'border-neutral-200 shadow-sm' : 'border-neutral-100 opacity-40'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <input type="checkbox" checked={course.enabled} onChange={e => updateCourse(idx, { enabled: e.target.checked })} className="accent-black w-4 h-4" />
                        <input type="text" placeholder={`Course ${idx + 1} Name`} value={course.name} onChange={e => updateCourse(idx, { name: e.target.value })} disabled={!course.enabled} className="flex-1 text-sm bg-transparent outline-none border-b border-transparent focus:border-neutral-200" />
                      </div>
                      
                      {course.enabled && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="flex flex-col">
                            <label className="text-neutral-500 mb-1">Hours</label>
                            <select value={course.hours} onChange={e => updateCourse(idx, { hours: parseInt(e.target.value) })} className="bg-white border rounded p-1 outline-none">
                              {[3, 2, 1, 0].map(h => <option key={h} value={h}>{h} Hours</option>)}
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label className="text-neutral-500 mb-1">Expected Grade</label>
                            <select value={course.gradeIndex} onChange={e => updateCourse(idx, { gradeIndex: parseInt(e.target.value) })} className="bg-white border rounded p-1 outline-none">
                              {GRADE_LABELS.map((g, i) => <option key={g} value={i}>{g} ({NEW_WEIGHTS[i]})</option>)}
                            </select>
                          </div>
                          <div className="flex flex-col justify-end">
                            <label className="flex items-center gap-2 cursor-pointer py-1">
                              <input type="checkbox" checked={course.isRepeated} onChange={e => updateCourse(idx, { isRepeated: e.target.checked })} className="accent-black" />
                              Repeating?
                            </label>
                          </div>
                        </div>
                      )}

                      {course.enabled && course.isRepeated && (
                        <div className="mt-3 pt-3 border-t border-dashed border-neutral-100">
                           <div className="flex flex-wrap gap-4 items-end">
                              <div className="flex gap-4">
                                 <label className="flex items-center gap-1 text-[10px] cursor-pointer"><input type="radio" checked={!course.isOldWeight} onChange={() => updateCourse(idx, { isOldWeight: false })} className="accent-black" /> New Weight</label>
                                 <label className="flex items-center gap-1 text-[10px] cursor-pointer"><input type="radio" checked={course.isOldWeight} onChange={() => updateCourse(idx, { isOldWeight: true })} className="accent-black" /> Old Weight</label>
                              </div>
                              <select value={course.oldGradeIndex} onChange={e => updateCourse(idx, { oldGradeIndex: parseInt(e.target.value) })} className="text-[10px] bg-white border rounded p-1 outline-none">
                                 <option value="-1">Previous Grade</option>
                                 {GRADE_LABELS.map((g, i) => (
                                   <option key={g} value={i}>{g} ({course.isOldWeight ? OLD_WEIGHTS[i] : NEW_WEIGHTS[i]})</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-white pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex gap-8 text-center sm:text-left w-full sm:w-auto">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Expected GPA</div>
                      <div className="text-3xl font-bold font-mono tracking-tighter">{gpaResult.gpa}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Rating</div>
                      <div className={`text-sm font-medium ${gpaResult.rate === 'Fail' ? 'text-red-600' : 'text-black'}`}>
                        {gpaResult.rate}
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] border border-neutral-100 p-2.5 rounded-lg bg-neutral-50 font-mono w-full sm:w-auto">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      <span>Excellent: ≥ 3.65</span>
                      <span>Good: ≥ 3.00</span>
                      <span>Satisfactory: ≥ 2.50</span>
                      <span>Minimally Acceptable: ≥ 2.00</span>
                      <span className="text-red-600 font-bold">Fail: &lt; 2.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
