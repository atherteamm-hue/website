import React, { useState } from 'react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  // Mapper Tool: Click a box on your screen, then check the browser console (F12)
  const logHitbox = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`Clicked at -> x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-black/10 pb-8">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Curriculum Journey
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h1 className="text-5xl font-bold tracking-tighter uppercase leading-none">
              Academic Library
            </h1>
            
            {/* Translation Button */}
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
              className="group flex items-center gap-3 px-8 py-3 bg-black text-white rounded-full font-mono text-[10px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95"
            >
              <span>{lang === 'EN' ? 'View Arabic' : 'View English'}</span>
              <span className="opacity-40">|</span>
              <span className="font-bold">{lang === 'EN' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Flowchart Container */}
        <div 
          className="relative w-full border border-black/5 shadow-2xl rounded-[40px] overflow-hidden bg-white cursor-crosshair" 
          onClick={logHitbox}
        >
          {/* Main Image (Switches based on lang state) */}
          <img 
            src={lang === 'EN' ? '/flowchart-en.svg' : '/flowchart-ar.svg'} 
            alt="Curriculum Map" 
            className="w-full h-auto block select-none pointer-events-none" 
          />

          {/* Invisible Hitbox Buttons */}
          <div className="absolute inset-0 pointer-events-auto">
            {Object.entries(curriculumData).map(([key, course]) => (
              <button
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(key);
                }}
                className="absolute transition-all hover:bg-black/5 hover:border-2 hover:border-black/20 rounded-lg"
                style={{
                  left: `${course.coords.x}%`,
                  top: `${course.coords.y}%`,
                  width: `${course.coords.w}%`,
                  height: `${course.coords.h}%`,
                }}
                title={course.content.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedCourse && curriculumData[selectedCourse] && (
        <CourseModal 
          content={curriculumData[selectedCourse].content} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}
