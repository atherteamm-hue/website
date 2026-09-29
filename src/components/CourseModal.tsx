import React, { useState } from 'react';
import { curriculumMap } from '../data/curriculumData';

const CollapsibleFolder = ({ label, items }: { label: string; items: any[] }) => {
  const [isOpen, setIsOpen] = useState(false); // Default contracted

  return (
    <div className="mb-2 border border-neutral-100 rounded-2xl bg-neutral-50/50 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 hover:bg-neutral-100 transition-all">
        <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-3">
          <span className="text-xl">{isOpen ? '📂' : '📁'}</span>{label}
        </span>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>↓</span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px] border-t border-neutral-100' : 'max-h-0'}`}>
        <div className="p-3 space-y-1">
          {items.map((item, i) => (
            <a key={i} href={item.url} target="_blank" className="flex justify-between items-center p-2 rounded-lg hover:bg-white text-sm">
              <span className="opacity-70">{item.label}</span>
              <span className="text-[9px] font-mono opacity-20 uppercase tracking-tighter">PDF</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CourseModal = ({ courseKey, onClose }: { courseKey: string, onClose: () => void }) => {
  const data = curriculumMap[courseKey];
  if (!data?.content) return null;
  const c = data.content;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-8 sm:p-10 border-b border-neutral-100 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <div className="text-5xl">{c.icon}</div>
            <div>
              <h2 className="text-2xl font-bold uppercase leading-none mb-1">{c.title}</h2>
              <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest">{data.ar}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-2xl opacity-30 hover:opacity-100 transition-opacity">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-6">Archive & Folders</h4>
            <div className="space-y-2">
              {c.summaries.map((s: any, i: number) => s.type === 'folder' ? (
                <CollapsibleFolder key={i} label={s.label} items={s.items} />
              ) : (
                <a key={i} href={s.url} target="_blank" className="block p-4 border border-neutral-100 rounded-2xl hover:border-black transition-all text-sm font-medium">{s.label}</a>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">Exam Vault</h4>
              <div className="grid grid-cols-2 gap-2">
                {c.mid.map((exam, i) => <a key={i} href={exam.url} className="px-4 py-3 rounded-xl border border-neutral-100 text-[11px] font-bold text-center hover:bg-black hover:text-white transition-all uppercase">Exam {exam.label}</a>)}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">Final Papers</h4>
              <div className="grid grid-cols-2 gap-2">
                {c.final.map((exam, i) => <a key={i} href={exam.url} className="px-4 py-3 rounded-xl border border-neutral-100 text-[11px] font-bold text-center hover:bg-black hover:text-white transition-all uppercase">Final {exam.label}</a>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
