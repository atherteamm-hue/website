import React, { useState } from 'react';
import { X, Folder, FileText, ChevronDown, BookOpen } from 'lucide-react';
import { PDFCover } from './PDFCover';

const CollapsibleFolder = ({ label, items }: { label: string; items: any[] }) => {
  const [isOpen, setIsOpen] = useState(false); // Collapsed by default
  return (
    <div className="mb-2 border border-neutral-100 rounded-xl overflow-hidden bg-neutral-50/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Folder size={18} className="text-neutral-400" />
          <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-3 bg-white space-y-1 border-t border-neutral-100">
          {items.map((item, i) => (
            <a key={i} href={item.url} target="_blank" className="flex items-center gap-3 p-2 text-sm hover:bg-neutral-50 rounded group">
              <FileText size={14} className="opacity-20 group-hover:opacity-100" />
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CourseModal = ({ content, onClose }: { content: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-5xl max-h-[85vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-10 border-b flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">{content.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-all"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Section: Books with Auto Covers */}
          <section>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">Textbooks</h4>
            <div className="space-y-6">
              {content.books.map((book: any, i: number) => (
                <a key={i} href={book.url} target="_blank" className="flex gap-4 group">
                  <div className="w-20 h-28 flex-shrink-0">
                    <PDFCover url={book.url} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-bold leading-tight group-hover:underline">{book.label}</span>
                    <span className="text-[9px] font-mono opacity-40 mt-1">OPEN PDF</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Section: Folders & Files */}
          <section>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">Materials</h4>
            {content.summaries.map((item: any, i: number) => (
              item.type === 'folder' ? (
                <CollapsibleFolder key={i} label={item.label} items={item.items} />
              ) : (
                <a key={i} href={item.url} target="_blank" className="flex items-center gap-3 p-4 border border-neutral-100 rounded-2xl mb-2 hover:border-black transition-all text-sm font-medium">
                  <FileText size={16} /> {item.label}
                </a>
              )
            ))}
          </section>

          {/* Section: Exams */}
          <section className="space-y-8">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">Midterm Archive</h4>
              <div className="grid grid-cols-2 gap-2">
                {content.mid.map((exam: any, i: number) => (
                  <a key={i} href={exam.url} className="py-3 px-4 border border-neutral-100 rounded-xl text-center text-[10px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-tighter">{exam.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">Final Exams</h4>
              <div className="grid grid-cols-2 gap-2">
                {content.final.map((exam: any, i: number) => (
                  <a key={i} href={exam.url} className="py-3 px-4 border border-neutral-100 rounded-xl text-center text-[10px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-tighter">{exam.label}</a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
