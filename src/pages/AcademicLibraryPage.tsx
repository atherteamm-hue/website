import React, { useState } from 'react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');

  // --- أداة استخراج الإحداثيات الذكية (نظام الكبستين) ---
  const [clickPoint, setClickPoint] = useState<{ x: number; y: number } | null>(null);

  const smartMapper = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(2));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(2));

    if (!clickPoint) {
      // الكبسة الأولى (الزاوية العلوية اليسرى)
      setClickPoint({ x, y });
      console.log(`📍 الكبسة الأولى تمت عند (x: ${x}, y: ${y}). اكبس هسا عالزاوية السفلية اليمنى للمادة.`);
    } else {
      // الكبسة الثانية والحساب النهائي (العرض والارتفاع)
      const w = parseFloat(Math.abs(x - clickPoint.x).toFixed(2));
      const h = parseFloat(Math.abs(y - clickPoint.y).toFixed(2));
      const finalX = Math.min(x, clickPoint.x);
      const finalY = Math.min(y, clickPoint.y);

      // طباعة الكود الجاهز للنسخ
      console.log(`%cنسخ إحداثيات المادة:`, 'color: #00ff00; font-weight: bold; font-size: 14px;');
      console.log(`coords: { x: ${finalX}, y: ${finalY}, w: ${w}, h: ${h} }`);
      console.log('-----------------------------------');
      
      // تصفير الأداة للمادة اللي بعدها
      setClickPoint(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 border-b pb-8">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">Curriculum Journey</h2>
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold tracking-tighter uppercase">Academic Library</h1>
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'AR' : 'EN')}
              className="px-8 py-3 bg-black text-white rounded-full font-mono text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
            >
              {lang === 'EN' ? 'VIEW ARABIC' : 'VIEW ENGLISH'}
            </button>
          </div>
        </div>

        {/* تم تغيير دالة الكليك هون لاستخدام الـ smartMapper */}
        <div className="relative w-full border border-black/5 shadow-2xl rounded-[40px] overflow-hidden bg-white" onClick={smartMapper}>
          <img src={lang === 'EN' ? '/flowchart-en.svg' : '/flowchart-ar.svg'} className="w-full h-auto block pointer-events-none select-none" />
          <div className="absolute inset-0">
            {Object.entries(curriculumData).map(([key, course]) => (
              <button
                key={key}
                onClick={(e) => { e.stopPropagation(); setSelectedCourse(key); }}
                // ضفنا لون أحمر شفاف مؤقت عشان تشوف شغلك: bg-red-500/40
                className="absolute bg-red-500/40 hover:bg-black/20 hover:border-2 hover:border-black/50 rounded-lg transition-all"
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
      </div>

      {selectedCourse && curriculumData[selectedCourse] && (
        <CourseModal content={curriculumData[selectedCourse].content} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}
