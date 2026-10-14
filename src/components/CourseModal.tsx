import React from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle } from 'lucide-react';
import { CourseContent } from '../data/curriculumData';

interface CourseModalProps {
  content: CourseContent;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function CourseModal({ content, onClose, isCompleted, onToggleComplete }: CourseModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose}>
      
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200" onClick={e => e.stopPropagation()}>
        
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
            
            {/* قسم الكتب */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Textbooks</h4>
              {content.books && content.books.length > 0 ? (
                <div className="flex flex-wrap gap-10">
                  {content.books.map((book, idx) => (
                    <a key={idx} href={book.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 w-36 outline-none">
                      {/* حاوية الـ 3D */}
                      <div className="relative w-full h-48 transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 perspective-1000">
                        {/* الغلاف */}
                        <div className="absolute inset-0 rounded-r-md overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.1)] border border-neutral-200 bg-white transition-all duration-300 z-10">
                          <img 
                            src={book.coverUrl} 
                            alt={book.label} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // إذا الصورة مكسورة رح تطلع خلفية رمادية بدل الأيقونة المعطوبة
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.classList.add('bg-neutral-100', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-neutral-400', 'text-center', 'p-2');
                              (e.target as HTMLImageElement).parentElement!.innerText = 'Cover Not Found';
                            }}
                          />
                        </div>
                        {/* تجليد الكتاب الجانبي */}
                        <div className="absolute top-0 left-0 bottom-0 w-3 bg-neutral-200 border-y border-l border-neutral-300 rounded-l-sm -translate-x-1.5 skew-y-12 origin-right flex justify-center z-0">
                          <div className="w-[1px] h-[90%] bg-neutral-300"></div>
                        </div>
                      </div>
                      <span className="text-black text-xs font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors">
                        {book.label}
                      </span>
                    </a>
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
