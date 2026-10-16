import React, { useState, useEffect } from 'react';
import { FileArchive, FileEdit } from 'lucide-react'; // ضفنا استدعاء أيقونات الأدوات الجديدة
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

        {/* قسم أدوات فريق أثر وأدوات مساعدة */}
        <div className="mt-24 border-t border-black/10 pt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 text-center">
            Athar Tools & More
          </h2>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-black text-center mb-10">
            Student Utilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* 1. أدوات فريق أثر (مع شارة By Athar) */}
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <PdfMerger />
            </div>
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <PdfSplitter />
            </div>
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <ImgToPdf />
            </div>
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <PdfWatermark />
            </div>
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <PdfRotate />
            </div>
            <div className="relative group">
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <PdfPageNumbers />
            </div>

            {/* 2. أدوات خارجية (Sejda - بدون شارة By Athar) */}
            <a 
              href="https://www.sejda.com/compress-pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-2xl hover:border-black hover:shadow-xl transition-all group"
            >
              <FileArchive size={32} className="text-neutral-400 group-hover:text-black mb-4 transition-colors" />
              <h4 className="font-black text-lg text-black uppercase tracking-tight mb-2">Compress PDF</h4>
              <p className="text-sm font-medium text-neutral-500 text-center">Reduce file size while optimizing for maximal PDF quality.</p>
            </a>

            <a 
              href="https://www.sejda.com/pdf-editor" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-2xl hover:border-black hover:shadow-xl transition-all group"
            >
              <FileEdit size={32} className="text-neutral-400 group-hover:text-black mb-4 transition-colors" />
              <h4 className="font-black text-lg text-black uppercase tracking-tight mb-2">PDF Editor</h4>
              <p className="text-sm font-medium text-neutral-500 text-center">Fill out PDF forms, add text, images, and edit existing text.</p>
            </a>

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
