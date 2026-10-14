// src/components/CourseModal.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle } from 'lucide-react';
import { CourseContent } from '../data/curriculumData';
import { Book3D } from './Book3D'; // استدعينا الـ Function اللي بنيته

interface CourseModalProps {
  content: CourseContent;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function CourseModal({ content, onClose, isCompleted, onToggleComplete }: CourseModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose}>
      
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
        
        {/* الهيدر */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase">{content.titleEn}</h2>
            <h3 className="text-sm font-bold text-neutral-400">{content.titleAr}</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-widest uppercase transition-all border ${
                isCompleted 
                  ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' 
                  : 'bg-white text-neutral-400 border-neutral-200 hover:text-black hover:border-black'
              }`}
            >
              <CheckCircle size={16} />
              {isCompleted ? "COMPLETED" : "MARK AS COMPLETED"}
            </button>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:bg-neutral-100 hover:text-black rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* المحتوى */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="flex flex-col gap-12">
            
            {/* قسم الكتب - استدعاء المكون الجديد */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8 border-b border-neutral-100 pb-2">Textbooks</h4>
              {content.books && content.books.length > 0 ? (
                <div className="flex flex-wrap gap-14 justify-center sm:justify-start py-4">
                  {content.books.map((book, idx) => (
                    // هون سحر البرمجة: استدعينا الـ Function ومررناله القيم
                    <Book3D 
                      key={idx} 
                      title={book.label} 
                      url={book.url} 
                      coverUrl={book.coverUrl} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 font-bold">No textbooks available yet.</p>
              )}
            </div>

            {/* قسم الملخصات */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Materials & Summaries</h4>
              {content.summaries && content.summaries.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {content.summaries.map((summary, idx) => (
                    <a key={idx} href={'url' in summary ? summary.url : '#'} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all text-neutral-600 hover:text-black font-bold text-sm">
                      {summary.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 font-bold">No materials available yet.</p>
              )}
            </div>

            {/* قسم أسئلة السنوات */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Exam Archive</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Mid Exams */}
                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Mid Exams</h5>
                  {content.mid && content.mid.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {content.mid.map((exam, idx) => (
                        <a key={idx} href={exam.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-500 hover:text-black transition-colors">
                          {exam.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 font-bold">Empty</p>
                  )}
                </div>

                {/* Final Exams */}
                <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-black mb-4">Final Exams</h5>
                  {content.final && content.final.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {content.final.map((exam, idx) => (
                        <a key={idx} href={exam.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-500 hover:text-black transition-colors">
                          {exam.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 font-bold">Empty</p>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
