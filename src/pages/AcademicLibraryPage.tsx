import React, { useState } from 'react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';
// 1. استدعينا أداة دمج الـ PDF الجديدة هون
import { PdfMerger } from '../components/PdfMerger.tsx';

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  return (
    <div className="relative z-[5] min-h-screen bg-[#fafafa] pt-32 pb-20 px-5 sm:px-10 antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* الجزء العلوي: العنوان والزر */}
        <div className="mb-12 border-b border-black/10 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-600 mb-4">
            Curriculum Journey
          </h2>
          
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-black tracking-tighter uppercase text-black">
              Academic Library
            </h1>
            
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
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

        {/* 2. قسم أدوات فريق أثر (تم إضافته تحت الخريطة) */}
        <div className="mt-24 border-t border-black/10 pt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 text-center">
            Athar Tools
          </h2>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-black text-center mb-10">
            Student Utilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* أداة دمج الملفات اللي برمجناها */}
            <PdfMerger />

            {/* بطاقة محجوزة لأداة قص الملفات (قريباً) */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-[30px] p-8 flex flex-col items-center justify-center border-dashed min-h-[250px]">
              <p className="text-sm font-bold text-neutral-400">PDF Splitter</p>
              <p className="text-xs text-neutral-400 mt-2">(Coming soon...)</p>
            </div>

            {/* بطاقة محجوزة لأداة تعديل الملفات (قريباً) */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-[30px] p-8 flex flex-col items-center justify-center border-dashed min-h-[250px]">
              <p className="text-sm font-bold text-neutral-400">PDF Editor</p>
              <p className="text-xs text-neutral-400 mt-2">(Coming soon...)</p>
            </div>

          </div>
        </div>

      </div>

      {selectedCourse && curriculumData[selectedCourse] && (
        <CourseModal content={curriculumData[selectedCourse].content} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}
