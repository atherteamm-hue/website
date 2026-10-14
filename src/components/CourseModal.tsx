// src/components/CourseModal.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, Book, ExternalLink, FileText } from 'lucide-react';
import { CourseContent } from '../data/curriculumData';

interface CourseModalProps {
  content: CourseContent;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function CourseModal({ content, onClose, isCompleted, onToggleComplete }: CourseModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm" onClick={onClose} dir="rtl">
      
      {/* النافذة - ألوان أبيض ورمادي وأسود */}
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-[30px] shadow-2xl flex flex-col overflow-hidden border border-neutral-200" onClick={e => e.stopPropagation()}>
        
        {/* الهيدر */}
        <div className="flex justify-between items-center p-5 md:p-6 bg-neutral-50 border-b border-neutral-200 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-black text-white p-3 rounded-xl shadow-md">
              <Book size={24} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-black tracking-tight" dir="ltr">{content.titleEn}</h2>
              <h3 className="text-sm font-bold text-neutral-500">{content.titleAr}</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* زر تحديد المادة كمنجزة */}
            <button 
              onClick={onToggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                isCompleted 
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                  : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              <CheckCircle size={18} className={isCompleted ? "text-green-600" : "text-neutral-400"} />
              {isCompleted ? "تم الإنجاز" : "تحديد كمنجزة"}
            </button>
            
            <button onClick={onClose} className="p-2 bg-neutral-200/50 hover:bg-red-50 hover:text-red-500 text-neutral-500 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* المحتوى */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar bg-white">
          
          {/* قسم الكتب - مع تأثير الـ 3D */}
          {content.books && content.books.length > 0 && (
            <div>
              <h3 className="text-lg font-black uppercase text-neutral-400 tracking-widest border-b-2 border-neutral-100 pb-2 mb-8 flex items-center gap-2">
                TEXTBOOKS
              </h3>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-12">
                {content.books.map((book, idx) => (
                  <a key={idx} href={book.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 w-40 outline-none">
                    
                    {/* الحاوية الـ 3D */}
                    <div className="relative w-32 h-44 transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-105 perspective-1000">
                      {/* الغلاف الأمامي */}
                      <div className="absolute inset-0 rounded-r-md overflow-hidden shadow-[5px_5px_15px_rgba(0,0,0,0.15)] border border-neutral-300 bg-white transition-all duration-300">
                        {/* استخدمنا coverUrl وإذا مش موجود بنحط لون رمادي */}
                        {book.coverUrl ? (
                          <img src={book.coverUrl} alt={book.label} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 font-bold text-xs p-2 text-center">No Cover</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none"></div>
                      </div>
                      
                      {/* التجليد (Spine) ليعطي عمق الـ 3D */}
                      <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-neutral-200 to-neutral-100 border-y border-l border-neutral-300 rounded-l-sm shadow-inner -translate-x-1.5 skew-y-12 origin-right flex justify-center">
                        <div className="w-[1px] h-[90%] bg-neutral-300"></div>
                      </div>
                      
                      {/* ظل الكتاب */}
                      <div className="absolute -bottom-3 left-2 right-0 h-4 bg-black/5 blur-md rounded-[100%] group-hover:bg-black/15 transition-colors duration-300 -z-10"></div>
                    </div>

                    <span className="text-black text-sm font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors" dir="ltr">
                      {book.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* قسم الملخصات والدوسيات */}
          {content.summaries && content.summaries.length > 0 && (
            <div>
               <h3 className="text-lg font-black uppercase text-neutral-400 tracking-widest border-b-2 border-neutral-100 pb-2 mb-6 flex items-center gap-2">
                MATERIALS & SUMMARIES
              </h3>
              <div className="flex flex-col gap-2">
                {content.summaries.map((summary, idx) => (
                  <a key={idx} href={'url' in summary ? summary.url : '#'} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
                      <span className="font-bold text-neutral-700 group-hover:text-black">{summary.label}</span>
                    </div>
                    <ExternalLink size={16} className="text-neutral-400 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}
