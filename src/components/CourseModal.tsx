import React, { useState } from 'react';
import { X, Folder, FileText, ChevronDown, Video } from 'lucide-react';
import { CourseContent } from '../data/curriculumData.ts';

const CollapsibleFolder = ({ label, items }: { label: string; items: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-neutral-100 rounded-xl overflow-hidden mb-2 bg-neutral-50/30">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 hover:bg-neutral-100 transition-colors">
        <div className="flex items-center gap-3">
          <Folder size={18} className="text-neutral-400" />
          <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-2 bg-white space-y-1 border-t border-neutral-100">
          {items.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 text-sm hover:bg-neutral-50 rounded">
              <FileText size={14} className="opacity-30" /> {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export function CourseModal({ content, onClose }: { content: CourseContent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-5xl max-h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-8 sm:p-10 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">{content.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-all"><X size={20}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <section>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">Textbooks</h4>
            <div className="space-y-4">
              {content.books.map((book, i) => (
                <a key={i} href={book.url} target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-4 border rounded-2xl hover:border-black transition-all">
                  <BookOpen size={20} className="text-neutral-300" />
                  <span className="text-xs font-bold leading-tight">{book.label}</span>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">Materials</h4>
            {content.summaries.map((item, i) => (
              'type' in item && item.type === 'folder' ? (
                <CollapsibleFolder key={i} label={item.label} items={item.items} />
              ) : (
                <a key={i} href={(item as any).url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 border border-neutral-100 rounded-xl mb-2 hover:border-black transition-all text-sm font-medium">
                  <FileText size={16} /> {(item as any).label}
                </a>
              )
            ))}
          </section>

          <section className="space-y-8">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">Exam Archive</h4>
              <div className="grid grid-cols-2 gap-2">
                {content.mid.map((exam, i) => <a key={i} href={exam.url} className="py-3 px-4 border border-neutral-100 rounded-xl text-center text-[10px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-tighter">Mid {exam.label}</a>)}
                {content.final.map((exam, i) => <a key={i} href={exam.url} className="py-3 px-4 border border-neutral-100 rounded-xl text-center text-[10px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-tighter">Final {exam.label}</a>)}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function BookOpen({ size, className }: { size: number, className: string }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
