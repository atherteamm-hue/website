import React, { useState, useEffect, useMemo } from 'react';
import { FileArchive, FileEdit } from 'lucide-react';
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
  
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  // State جديدة لحفظ عدد المواد الاختيارية المنجزة (0, 1, 2)
  const [electiveCount, setElectiveCount] = useState<number>(0);

  useEffect(() => {
    // استرجاع مواد التخصص
    const savedCourses = localStorage.getItem('athar_completed_courses');
    if (savedCourses) {
      try {
        setCompletedCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error("Error parsing completed courses", e);
      }
    }
    
    // استرجاع عدد المواد الاختيارية
    const savedElectives = localStorage.getItem('athar_elective_count');
    if (savedElectives) {
      setElectiveCount(parseInt(savedElectives));
    }
  }, []);

  const toggleCourseCompletion = (courseKey: string) => {
    setCompletedCourses(prev => {
      const isCompleted = prev.includes(courseKey);
      const newCompleted = isCompleted 
        ? prev.filter(k => k !== courseKey)
        : [...prev, courseKey];
      
      localStorage.setItem('athar_completed_courses', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const handleElectiveChange = (count: number) => {
    setElectiveCount(count);
    localStorage.setItem('athar_elective_count', count.toString());
  };

  // ----------------------------------------------------
  // حساب المجموع = (مواد التخصص) + (المواد الاختيارية * 3 ساعات)
  // ----------------------------------------------------
  const totalCompletedHours = useMemo(() => {
    const coreHours = completedCourses.reduce((sum, courseKey) => {
      const course = curriculumData[courseKey];
      return sum + (course?.content?.credits || 0);
    }, 0);
    
    return coreHours + (electiveCount * 3);
  }, [completedCourses, electiveCount]);

  return (
    <div className="relative z-[5] min-h-screen bg-[#fafafa] pt-32 pb-20 px-5 sm:px-10 antialiased">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 border-b border-black/10 pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-600 mb-4">
              Curriculum Journey
            </h2>
            <h1 className="text-5xl font-black tracking-tighter uppercase text-black">
              Academic Library
            </h1>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
              className="px-8 py-3 bg-black text-white rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 hover:bg-neutral-800 transition-all shadow-md"
            >
              {lang === 'EN' ? 'VIEW ARABIC' : 'VIEW ENGLISH'}
            </button>
            
            {/* ---------------------------------------------------- */}
            {/* قسم العدادات (مواد اختيارية + مجموع الساعات) */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
              
              {/* عداد المواد الاختيارية */}
              <div className="flex items-center gap-2 bg-white border border-neutral-200 shadow-sm rounded-full px-3 py-1.5">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-2">
                  {lang === 'EN' ? 'Electives Done:' : 'مواد اختياري:'}
                </span>
                <div className="flex gap-1 bg-neutral-100 rounded-full p-0.5">
                  {[0, 1, 2].map(num => (
                    <button
                      key={num}
                      onClick={() => handleElectiveChange(num)}
                      className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        electiveCount === num 
                          ? 'bg-black text-white shadow-sm' 
                          : 'text-neutral-500 hover:bg-white hover:text-black'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* عداد الساعات الكلي */}
              <div className="bg-white border border-neutral-200 shadow-sm rounded-full px-5 py-2 flex items-center gap-2 h-[40px]">
                 <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                   {lang === 'EN' ? 'Passed Hours:' : 'الساعات المقطوعة:'}
                 </span>
                 <span className="font-mono text-xl font-black text-black">{totalCompletedHours}</span>
              </div>
              
            </div>
          </div>
        </div>

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
                  className={`absolute rounded-lg transition-all cursor-pointer flex items-center justify-center hover:bg-black/5 hover:border-2 hover:border-black/20 ${
                    isCompleted ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    left: `${course.coords.x}%`,
                    top: `${course.coords.y}%`,
                    width: `${course.coords.w}%`,
                    height: `${course.coords.h}%`,
                  }}
                  title={lang === 'EN' ? course.content.titleEn : course.content.titleAr}
                >
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

        <div className="mt-24 border-t border-black/10 pt-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-2 text-center">
            Athar Tools & More
          </h2>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-black text-center mb-10">
            Student Utilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
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

        <MaeSimulations />

      </div>

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
