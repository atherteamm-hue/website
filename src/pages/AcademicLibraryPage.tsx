import React, { useState } from 'react';
import { curriculumData } from '../data/curriculumData';
import { CourseModal } from '../components/CourseModal';

export default function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  // CLICK TOOL: This helps you find coordinates for all 50+ boxes
  const logHitbox = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`Clicked at -> x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tighter">ACADEMIC LIBRARY</h1>
        <button onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')} className="px-6 py-2 bg-black text-white rounded-full font-mono text-xs">
          {lang === 'EN' ? 'VIEW ARABIC' : 'VIEW ENGLISH'}
        </button>
      </div>

      <div className="relative max-w-7xl mx-auto border border-black/5 shadow-2xl rounded-[40px] overflow-hidden" onClick={logHitbox}>
        <img src={lang === 'EN' ? '/flowchart-en.svg' : '/flowchart-ar.svg'} className="w-full h-auto block" />

        {/* Dynamic Buttons Layer */}
        <div className="absolute inset-0">
          {Object.entries(curriculumData).map(([key, course]) => (
            <button
              key={key}
              onClick={() => setSelectedCourse(key)}
              className="absolute hover:bg-black/10 border-2 border-transparent hover:border-black/20 rounded-lg transition-all"
              style={{
                left: `${course.coords.x}%`,
                top: `${course.coords.y}%`,
                width: `${course.coords.w}%`,
                height: `${course.coords.h}%`,
              }}
            />
          ))}
        </div>
      </div>

      {selectedCourse && (
        <CourseModal 
          content={curriculumData[selectedCourse].content} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
}
