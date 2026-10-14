// src/components/CourseModal.tsx
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
      
      {/* النافذة - ألوان أبيض ورمادي وأسود */}
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
            
            {/* قسم الكتب - 3D Ultra Realism */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8 border-b border-neutral-100 pb-2">Textbooks</h4>
              {content.books && content.books.length > 0 ? (
                <div className="flex flex-wrap gap-14 justify-center sm:justify-start py-4">
                  {content.books.map((book, idx) => (
                    <a key={idx} href={book.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-5 w-36 outline-none">
                      
                      {/* حاوية الـ 3D مع Perspective عالي */}
                      <div className="relative w-32 h-46 [perspective:1200px] [transform-style:preserve-3d]">
                        
                        {/* مجسم الكتاب الرئيسي */}
                        <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] [transform:rotateY(-18deg)_rotateX(6deg)_rotateZ(-1deg)] group-hover:[transform:rotateY(-26deg)_rotateX(10deg)_rotateZ(-2deg)_translateY(-8px)]">
                          
                          {/* الغلاف الأمامي للكتاب */}
                          <div className="absolute inset-0 rounded-r-md overflow-hidden bg-white border border-neutral-300 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] z-20 [transform-style:preserve-3d]">
                            <img 
                              src={book.coverUrl} 
                              alt={book.label} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).parentElement!.classList.add('bg-neutral-100', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-neutral-400', 'text-center', 'p-2');
                                (e.target as HTMLImageElement).parentElement!.innerText = 'Cover Not Found';
                              }}
                            />
                            {/* لمعة وإضاءة الغلاف ثلاثية الأبعاد */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
                            {/* ظل انحناء الغلاف الداخلي على اليسار (Spine bend) */}
                            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none"></div>
                          </div>

                          {/* كعب الكتاب الجانبي (Spine) - يعطي عمق ثلاثي الأبعاد من اليسار */}
                          <div className="absolute top-0 left-0 bottom-0 w-[14px] bg-gradient-to-r from-neutral-200 to-neutral-50 border-y border-l border-neutral-300 rounded-l-sm shadow-inner origin-right -translate-x-3.5 skew-y-12 z-10 flex justify-center">
                            <div className="w-[1px] h-[92%] bg-neutral-300/60"></div>
                          </div>

                          {/* طبقات أوراق الكتاب (Pages Stack) - تعطي السمك الحقيقي للـ 40 ميجا من اليمين */}
                          <div className="absolute top-[3px] right-[-10px] bottom-[3px] w-[10px] bg-gradient-to-l from-white via-neutral-100 to-neutral-200 border-y border-r border-neutral-300/50 rounded-r-sm z-0 [transform:rotateY(90deg)_translateZ(-5px)] shadow-[1px_0_3px_rgba(0,0,0,0.1)] flex flex-col justify-between p-[2px]">
                            {/* خطوط وهمية للأوراق */}
                            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_1px,#e5e5e5_1px)] bg-[size:100%_2px]"></div>
                          </div>

                          {/* الجزء السفلي من الأوراق (Bottom Pages Edge) */}
                          <div className="absolute bottom-[-10px] left-[5px] right-[-1px] h-[10px] bg-neutral-100 border-x border-b border-neutral-300 rounded-b-sm z-0 [transform:rotateX(90deg)_translateZ(5px)] flex flex-col justify-between p-[1px]">
                            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5e5_1px)] bg-[size:2px_100%]"></div>
                          </div>

                          {/* الظل الخلفي الساقط (Drop Shadows) */}
                          <div className="absolute -inset-4 bg-black/10 blur-md rounded-xl transition-opacity duration-300 group-hover:bg-black/20 -z-10 [transform:translateZ(-15px)_translateY(8px)]"></div>
                          
                        </div>
                      </div>

                      {/* اسم الكتاب */}
                      <span className="text-black text-xs font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors mt-2" dir="ltr">
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
