import React, { useState } from 'react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  return (
    // ضفنا antialiased عشان يخلي الخطوطคม وواضحة جداً
<div className="relative z-[5] min-h-screen bg-[#fafafa] pt-32 pb-20 px-5 sm:px-10 antialiased">
  <div className="max-w-7xl mx-auto">
        
        {/* الجزء العلوي: العنوان والزر (صاروا واضحين وبدون تغبيش) */}
        <div className="mb-12 border-b border-black/10 pb-8">
          {/* غيرنا اللون لـ text-neutral-600 عشان يكون أوضح */}
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-600 mb-4">
            Curriculum Journey
          </h2>
          
          <div className="flex justify-between items-center">
            {/* ضفنا text-black عشان الكلمة تكون حادة */}
            <h1 className="text-5xl font-black tracking-tighter uppercase text-black">
              Academic Library
            </h1>
            
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
              // كبرنا الخط لـ text-xs وعملناه font-bold عشان ما يغبش
              className="px-8 py-3 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 hover:bg-neutral-800 transition-all shadow-md"
            >
              {lang === 'EN' ? 'VIEW ARABIC' : 'VIEW ENGLISH'}
            </button>
          </div>
        </div>

        {/* الخريطة والأزرار الشفافة */}
        <div className="relative w-full border border-black/10 shadow-2xl rounded-[40px] overflow-hidden bg-white">
          <img 
            src={lang === 'EN' ? '/flowchart-en.svg' : '/flowchart-ar.svg'} 
            className="w-full h-auto block pointer-events-none select-none" 
            alt="Curriculum Flowchart" 
          />
          <div className="absolute inset-0">
            {Object.entries(curriculumData).map(([key, course]) => (
              <button
                key={key}
                onClick={(e) => { e.stopPropagation(); setSelectedCourse(key); }}
                className="absolute hover:bg-black/5 hover:border-2 hover:border-black/20 rounded-lg transition-all cursor-pointer"
                style={{
                  left: `${course.coords.x}%`,
                  top: `${course.coords.y}%`,
                  width: `${course.coords.w}%`,
                  height: `${course.coords.h}%`,
                }}
                title={lang === 'EN' ? course.content.titleEn : course.content.titleAr}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && curriculumData[selectedCourse] && (
        <CourseModal content={curriculumData[selectedCourse].content} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}
