import React from 'react';
import { 
  X, 
  BookOpen, 
  FileText, 
  PlaySquare, 
  History, 
  FolderOpen 
} from 'lucide-react';

interface CourseModalProps {
  content: {
    titleEn: string;
    titleAr: string;
  };
  onClose: () => void;
}

const EmptyState = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
    <FolderOpen size={28} className="text-neutral-300 mb-3" strokeWidth={1.5} />
    <p className="text-sm font-bold text-neutral-400">No {label} available yet</p>
  </div>
);

export function CourseModal({ content, onClose }: CourseModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#fafafa] rounded-[30px] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* Header: ضفنا هون الاسم بالعربي تحت الإنجليزي */}
        <div className="flex items-start justify-between p-8 bg-white border-b border-neutral-100 shrink-0">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-2">
              Course Details
            </h2>
            <h3 className="text-3xl font-black tracking-tighter uppercase text-black">
              {content.titleEn}
            </h3>
            {/* هذا السطر اللي كان ناقص */}
            <h4 className="text-xl font-bold text-neutral-500 mt-2" dir="rtl">
              {content.titleAr}
            </h4>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-neutral-100 hover:bg-red-50 hover:text-red-500 text-neutral-500 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          <section className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-black text-white rounded-xl">
                <BookOpen size={20} />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-black">Textbooks</h4>
            </div>
            <EmptyState label="textbooks" />
          </section>

          <section className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-black text-white rounded-xl">
                <FileText size={20} />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-black">Summaries & Notes</h4>
            </div>
            <EmptyState label="summaries" />
          </section>

          <section className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-black text-white rounded-xl">
                <PlaySquare size={20} />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-black">Video Lectures</h4>
            </div>
            <EmptyState label="video lectures" />
          </section>

          <section className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-black text-white rounded-xl">
                <History size={20} />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-black">Past Exams</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                  <h5 className="text-sm font-bold uppercase tracking-widest text-neutral-600">Midterm</h5>
                </div>
                <EmptyState label="midterm exams" />
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                  <h5 className="text-sm font-bold uppercase tracking-widest text-neutral-600">Final</h5>
                </div>
                <EmptyState label="final exams" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
