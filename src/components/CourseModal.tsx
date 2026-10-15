// src/components/CourseModal.tsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, ChevronDown, ChevronLeft, FileText, ExternalLink, PlayCircle } from 'lucide-react';
import { CourseContent } from '../data/curriculumData';
import { Book3D } from './Book3D';

interface CourseModalProps {
  content: CourseContent;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function CourseModal({ content, onClose, isCompleted, onToggleComplete }: CourseModalProps) {
  const [openFolders, setOpenFolders] = useState<Record<number, boolean>>({});

  const toggleFolder = (idx: number) => {
    setOpenFolders(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose} dir="rtl">
      
      <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
        
        {/* الهيدر */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
          <div>
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase" dir="ltr">{content.titleEn}</h2>
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
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
          <div className="flex flex-col gap-12">
            
            {/* قسم الكتب */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8 border-b border-neutral-100 pb-2">Textbooks</h4>
              {content.books && content.books.length > 0 ? (
                <div className="flex flex-wrap gap-14 justify-center sm:justify-start py-4">
                  {content.books.map((book, idx) => (
                    <Book3D 
                      key={idx} 
                      title={book.label} 
                      url={book.url} 
                      coverUrl={book.coverUrl} 
                      isArabic={book.isArabic}
                      isSolution={book.isSolution}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 font-bold">No textbooks available yet.</p>
              )}
            </div>

            {/* قسم الفيديوهات والشروحات */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Lectures & Videos</h4>
              {content.videos && content.videos.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {content.videos.map((video, idx) => (
                    <a key={idx} href={video.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-colors group">
                      <div className="flex items-center gap-3">
                        <PlayCircle size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
                        <span className="font-bold text-neutral-700 group-hover:text-black">{video.label}</span>
                      </div>
                      <ExternalLink size={16} className="text-neutral-400 group-hover:text-black" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-400 font-bold">No videos available yet.</p>
              )}
            </div>

            {/* قسم الملخصات والدوسيات */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 border-b border-neutral-100 pb-2">Materials & Summaries</h4>
              {content.summaries && content.summaries.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {content.summaries.map((summary, idx) => {
                    if ('type' in summary && summary.type === 'folder') {
                      return (
                        <div key={idx} className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 transition-all">
                          <button 
                            onClick={() => toggleFolder(idx)}
                            className="w-full flex justify-between items-center p-4 hover:bg-neutral-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText size={18} className="text-neutral-400" />
                              <span className="font-bold text-neutral-700">{summary.label}</span>
                              <span className="text-xs bg-neutral-200 text-neutral-500 px-2 py-0.5 rounded-md font-mono">
                                {summary.items.length}
                              </span>
                            </div>
                            {openFolders[idx] ? <ChevronDown size={16} className="text-neutral-400"/> : <ChevronLeft size={16} className="text-neutral-400"/>}
                          </button>
                          
                          <div className={`transition-all duration-300 ease-in-out ${openFolders[idx] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                            <div className="border-t border-neutral-200 bg-white p-2 flex flex-col">
                              {summary.items.map((item, i) => (
                                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 text-sm font-bold text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-lg transition-colors">
                                  <ExternalLink size={14} className="text-neutral-300" />
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    } 
                    else {
                      return (
                        <a key={idx} href={summary.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl transition-colors group">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
                            <span className="font-bold text-neutral-700 group-hover:text-black">{summary.label}</span>
                          </div>
                          <ExternalLink size={16} className="text-neutral-400 group-hover:text-black" />
                        </a>
                      );
                    }
                  })}
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
                        <a key={idx} href={exam.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm font-bold text-neutral-500 hover:text-black hover:bg-neutral-100 p-2 rounded-lg transition-colors group">
                          <span>{exam.label}</span>
                          <ExternalLink size={14} className="text-neutral-300 opacity-0 group-hover:opacity-100" />
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
                        <a key={idx} href={exam.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm font-bold text-neutral-500 hover:text-black hover:bg-neutral-100 p-2 rounded-lg transition-colors group">
                          <span>{exam.label}</span>
                          <ExternalLink size={14} className="text-neutral-300 opacity-0 group-hover:opacity-100" />
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
