import React from 'react';
import { curriculumMap } from '../data/curriculumData';


export const CourseModal = ({ courseKey, onClose }: { courseKey: string, onClose: () => void }) => {
  const data = curriculumMap[courseKey];
  if (!data || !data.content) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-md" onClick={onClose}>
        <div className="bg-white rounded-[32px] p-10 max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="text-4xl mb-4">📂</div>
          <h3 className="text-xl font-bold mb-2">{data?.en || courseKey}</h3>
          <p className="text-neutral-500 text-sm mb-6">Archive for this module is currently being digitized. Check back soon.</p>
          <button onClick={onClose} className="w-full py-3 bg-black text-white rounded-full text-sm uppercase tracking-widest">Close</button>
        </div>
      </div>
    );
  }

  const c = data.content;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/30 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-8 sm:p-12 border-b border-neutral-100 flex justify-between items-start">
          <div>
            <span className="text-4xl mb-4 block">{c.icon}</span>
            <h2 className="text-3xl font-bold tracking-tighter uppercase">{c.title}</h2>
            <p className="text-neutral-400 font-mono text-sm">{data.ar}</p>
          </div>
          <button onClick={onClose} className="text-2xl hover:rotate-90 transition-transform">✕</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Books & Summaries */}
          <div className="space-y-10">
            <section>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-5">Reference Library</h4>
              <div className="space-y-3">
                {c.books.map((book: any, i: number) => (
                  <a key={i} href={book.url} target="_blank" className="flex items-center gap-4 p-3 rounded-2xl border border-neutral-100 hover:bg-neutral-50 transition-colors group">
                    <div className="w-10 h-14 bg-neutral-100 rounded shadow-sm overflow-hidden flex-shrink-0">
                       <img src={book.cover} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium">{book.label}</span>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-5">Summaries & Folders</h4>
              <div className="space-y-2">
                {c.summaries.map((s: any, i: number) => (
                  <div key={i} className="group">
                    {s.type === 'folder' ? (
                      <div className="p-4 bg-neutral-50 rounded-2xl">
                        <span className="text-xs font-bold uppercase mb-3 block opacity-40">{s.label}</span>
                        <div className="grid grid-cols-1 gap-1">
                          {s.items.map((sub: any, si: number) => (
                            <a key={si} href={sub.url} className="text-sm py-1 hover:underline flex justify-between">
                              {sub.label} <span className="opacity-30">PDF</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a href={s.url} className="block p-4 border border-neutral-100 rounded-2xl hover:border-black transition-colors text-sm">
                        {s.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Exams */}
          <div className="space-y-10">
            <section>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-5">Midterm Archive</h4>
              <div className="flex flex-wrap gap-2">
                {c.mid.map((exam: any, i: number) => (
                  <a key={i} href={exam.url} className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-bold hover:bg-black hover:text-white transition-all">{exam.label}</a>
                ))}
              </div>
            </section>
            <section>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-5">Final Examination</h4>
              <div className="flex flex-wrap gap-2">
                {c.final.map((exam: any, i: number) => (
                  <a key={i} href={exam.url} className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-bold hover:bg-black hover:text-white transition-all">{exam.label}</a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
