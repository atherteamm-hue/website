import React, { useState, useEffect } from 'react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';
import { PdfMerger } from '../components/PdfMerger.tsx';
import { PdfSplitter } from '../components/PdfSplitter.tsx';
import { ImgToPdf } from '../components/ImgToPdf.tsx';
import { PdfWatermark } from '../components/PdfWatermark.tsx';
import { PdfRotate } from '../components/PdfRotate.tsx';
import { PdfPageNumbers } from '../components/PdfPageNumbers.tsx';
import { MaeSimulations } from '../components/MaeSimulations.tsx';

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  
  // State لحفظ المواد المنجزة
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  // استرجاع البيانات من ذاكرة المتصفح أول ما تفتح الصفحة
  useEffect(() => {
    const saved = localStorage.getItem('athar_completed_courses');
    if (saved) {
      try {
        setCompletedCourses(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing completed courses", e);
      }
    }
  }, []);

  // دالة لإضافة أو إزالة مادة من قائمة الإنجاز
  const toggleCourseCompletion = (courseKey: string) => {
    setCompletedCourses(prev => {
      const isCompleted = prev.includes(courseKey);
      const newCompleted = isCompleted 
        ? prev.filter(k => k !== courseKey) // إزالة إذا كانت موجودة
        : [...prev, courseKey];             // إضافة إذا لم تكن موجودة
      
      // حفظ التحديث في المتصفح
      localStorage.setItem('athar_completed_courses', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

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
            {Object.entries(curriculumData).map(([key, course]) => {
              const isCompleted = completedCourses.includes(key);
              return (
                <button
                  key={key}
                  onClick={(e) => { e.stopPropagation(); setSelectedCourse(key); }}
                  // هون السحر: إذا المادة منجزة بتتلون أخضر، غير هيك بتضل شفافة
                  className={`absolute rounded-lg transition-all cursor-pointer flex items-center justify-center
                    ${isCompleted 
                      ? 'bg-green-500/20 border-2 border-green-500 hover:bg-green-500/30 z-10' 
                      : 'hover:bg-black/5 hover:border-2 hover:border-black/20 z-0'
                    }`}
                  style={{
                    left: `${course.coords.x}%`,
                    top: `${course.coords.y}%`,
                    width: `${course.coords.w}%`,
                    height: `${course.coords.h}%`,
                  }}
                  title={lang === 'EN' ? course.content.titleEn : course.content.titleAr}
                >
                  {/* علامة صح بتطلع بزاوية المادة المنجزة */}
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-md animate-in zoom-in">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* قسم أدوات فريق أثر */}
        <div className="mt-24 border-t border-black/10 pt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 text-center">
            Athar Tools
          </h2>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-black text-center mb-10">
            Student Utilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <PdfMerger />
            <PdfSplitter />
            <ImgToPdf />
            <PdfWatermark />
            <PdfRotate />
            <PdfPageNumbers />
          </div>
        </div>

        {/* قسم المحاكيات */}
        <MaeSimulations />

      </div>

      {/* النافذة المنبثقة للمواد وتمرير حالة الإنجاز إلها */}
      {selectedCourse && curriculumData[selectedCourse] && (
        <CourseModal 
          content={curriculumData[selectedCourse].content} 
          onClose={() => setSelectedCourse(null)} 
          isCompleted={completedCourses.includes(selectedCourse)}
          onToggleComplete={() => toggleCourseCompletion(selectedCourse)}
        />
      )}
    </div>
  );
}
