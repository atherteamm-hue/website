import React, { useState } from 'react';
import { curriculumMap } from '../data/curriculumData';

export const CurriculumFlowchart = ({ onCourseClick }: { onCourseClick: (key: string) => void }) => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  // Mapper Helper: Click corners of boxes on your screen to see coords in Console (F12)
  const logCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    console.log(`x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center px-4">
        <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">ATHAR // Interactive Map</div>
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="px-6 py-2 bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest"
        >
          {lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        </button>
      </div>

      <div className="relative w-full rounded-[40px] overflow-hidden bg-white shadow-xl border border-black/5 cursor-crosshair" onClick={logCoords}>
        <img 
          src={lang === 'en' ? '/flowchart-en.svg' : '/flowchart-ar.svg'} 
          className="w-full h-auto block select-none pointer-events-none"
        />
        <div className="absolute inset-0 pointer-events-auto">
          {Object.entries(curriculumMap).map(([key, data]) => (
            <button
              key={key}
              onClick={(e) => { e.stopPropagation(); onCourseClick(key); }}
              className="absolute group"
              style={{
                left: `${data.coords?.x}%`,
                top: `${data.coords?.y}%`,
                width: `${data.coords?.w}%`,
                height: `${data.coords?.h}%`,
              }}
            >
              <div className="w-full h-full group-hover:bg-black/5 group-hover:border-2 group-hover:border-black/20 rounded-lg transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
