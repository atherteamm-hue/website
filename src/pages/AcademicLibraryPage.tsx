import React, { useState, useEffect, useMemo } from 'react';
import { FileArchive, FileEdit, Calculator } from 'lucide-react';
import { curriculumData } from '../data/curriculumData.ts';
import { CourseModal } from '../components/CourseModal.tsx';
import { PdfMerger } from '../components/PdfMerger.tsx';
import { PdfSplitter } from '../components/PdfSplitter.tsx';
import { ImgToPdf } from '../components/ImgToPdf.tsx';
import { PdfWatermark } from '../components/PdfWatermark.tsx';
import { PdfRotate } from '../components/PdfRotate.tsx';
import { PdfPageNumbers } from '../components/PdfPageNumbers.tsx';
import { MaeSimulations } from '../components/MaeSimulations.tsx';

// ═══════════════ GPA CONSTANTS ═══════════════
const GRADE_LABELS = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
const NEW_WEIGHTS = [4, 3.75, 3.5, 3.25, 3, 2.75, 2.5, 2, 1.75, 1.25, 1, 0.5];
const OLD_WEIGHTS = [4, 3.75, 3.5, 3, 2.75, 2.5, 2, 1.75, 1.5, 1, 0.75, 0.5];

interface CourseState {
  id: number;
  enabled: boolean;
  name: string;
  hours: number;
  gradeIndex: number;
  isRepeated: boolean;
  isOldWeight: boolean;
  oldGradeIndex: number;
}

export function AcademicLibraryPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [electiveCount, setElectiveCount] = useState<number>(0);

  // Modal State for GPA Calculator
  const [isGpaModalOpen, setIsGpaModalOpen] = useState(false);

  // ═══════════════ GPA CALCULATOR STATE ═══════════════
  const [currentH, setCurrentH] = useState<string>('');
  const [currentG, setCurrentG] = useState<string>('');
  const [courses, setCourses] = useState<CourseState[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      enabled: i < 4,
      name: '',
      hours: 3,
      gradeIndex: 0,
      isRepeated: false,
      isOldWeight: false,
      oldGradeIndex: 0,
    }))
  );

  useEffect(() => {
    const savedCourses = localStorage.getItem('athar_completed_courses');
    if (savedCourses) {
      try {
        setCompletedCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error("Error parsing completed courses", e);
      }
    }
    
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

  const totalCompletedHours = useMemo(() => {
    const coreHours = completedCourses.reduce((sum, courseKey) => {
      const course = curriculumData[courseKey];
      return sum + (course?.content?.credits || 0);
    }, 0);
    
    return coreHours + (electiveCount * 3);
  }, [completedCourses, electiveCount]);

  // ═══════════════ GPA CALCULATION LOGIC ═══════════════
  const gpaResult = useMemo(() => {
    const curH = parseFloat(currentH) || 0;
    const curG = parseFloat(currentG) || 0;
    let totalPts = curH * curG;
    let totalH = curH;

    courses.forEach((c) => {
      if (!c.enabled) return;
      const h = c.hours;
      const g = NEW_WEIGHTS[c.gradeIndex];

      if (c.isRepeated && curH > 0) {
        const oldWeightValue = c.isOldWeight ? OLD_WEIGHTS[c.oldGradeIndex] : NEW_WEIGHTS[c.oldGradeIndex];
        totalPts = totalPts - (h * oldWeightValue) + (h * g);
      } else {
        totalPts += h * g;
        totalH += h;
      }
    });

    const res = totalH > 0 ? Math.min(Math.max(totalPts / totalH, 0), 4) : 0;
    
    let rate = '---';
    if (totalH > 0) {
      if (res >= 3.65) rate = 'Excellent';
      else if (res >= 3.00) rate = 'Good';
      else if (res >= 2.50) rate = 'Satisfactory';
      else if (res >= 2.00) rate = 'Minimally Acceptable';
      else rate = 'Fail';
    }

    return { gpa: res.toFixed(2), hours: totalH, rate };
  }, [courses, currentH, currentG]);

  const updateCourse = (id: number, updates: Partial<CourseState>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

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
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
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
            width={4000}
            height={2002}
            fetchPriority="high"
            decoding="async"
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
            Academic Toolkit
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* GPA Calculator Card (New Placement) */}
            <button 
              onClick={() => setIsGpaModalOpen(true)}
              className="relative flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-2xl hover:border-black hover:shadow-xl transition-all group cursor-pointer w-full text-left"
            >
              <span className="absolute -top-3 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-sm pointer-events-none">By Athar</span>
              <Calculator size={32} className="text-neutral-400 group-hover:text-black mb-4 transition-colors" />
              <h4 className="font-black text-lg text-black uppercase tracking-tight mb-2">GPA Calculator</h4>
              <p className="text-sm font-medium text-neutral-500 text-center">Calculate your cumulative and semester GPA easily.</p>
            </button>

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

      {/* ═══════════════ GPA CALCULATOR MODAL ═══════════════ */}
      {isGpaModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsGpaModalOpen(false)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-neutral-200 text-black overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">
                ATHAR // GPA CALCULATOR
              </span>
              <button onClick={() => setIsGpaModalOpen(false)} className="text-neutral-400 hover:text-black text-xl">✕</button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl">
                <div>
                  <label className="block text-[10px] uppercase tracking-tighter text-neutral-500 mb-1">Total Earned Hours</label>
                  <input type="number" value={currentH} onChange={e => setCurrentH(e.target.value)} placeholder="0" className="w-full bg-transparent border-b border-neutral-300 focus:border-black outline-none py-1" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-tighter text-neutral-500 mb-1">Current Cumulative GPA</label>
                  <input type="number" value={currentG} onChange={e => setCurrentG(e.target.value)} placeholder="0.00" className="w-full bg-transparent border-b border-neutral-300 focus:border-black outline-none py-1" />
                </div>
              </div>

              <div className="space-y-3">
                {courses.map((course, idx) => (
                  <div key={idx} className={`p-3 border rounded-xl transition-all ${course.enabled ? 'border-neutral-200 shadow-sm' : 'border-neutral-100 opacity-40'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <input type="checkbox" checked={course.enabled} onChange={e => updateCourse(idx, { enabled: e.target.checked })} className="accent-black w-4 h-4" />
                      <input type="text" placeholder={`Course ${idx + 1} Name`} value={course.name} onChange={e => updateCourse(idx, { name: e.target.value })} disabled={!course.enabled} className="flex-1 text-sm bg-transparent outline-none border-b border-transparent focus:border-neutral-200" />
                    </div>
                    
                    {course.enabled && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="flex flex-col">
                          <label className="text-neutral-500 mb-1">Hours</label>
                          <select value={course.hours} onChange={e => updateCourse(idx, { hours: parseInt(e.target.value) })} className="bg-white border rounded p-1 outline-none">
                            {[3, 2, 1, 0].map(h => <option key={h} value={h}>{h} Hours</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label className="text-neutral-500 mb-1">Expected Grade</label>
                          <select value={course.gradeIndex} onChange={e => updateCourse(idx, { gradeIndex: parseInt(e.target.value) })} className="bg-white border rounded p-1 outline-none">
                            {GRADE_LABELS.map((g, i) => <option key={g} value={i}>{g} ({NEW_WEIGHTS[i]})</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col justify-end">
                          <label className="flex items-center gap-2 cursor-pointer py-1">
                            <input type="checkbox" checked={course.isRepeated} onChange={e => updateCourse(idx, { isRepeated: e.target.checked })} className="accent-black" />
                            Repeating?
                          </label>
                        </div>
                      </div>
                    )}

                    {course.enabled && course.isRepeated && (
                      <div className="mt-3 pt-3 border-t border-dashed border-neutral-100">
                         <div className="flex flex-wrap gap-4 items-end">
                            <div className="flex gap-4">
                               <label className="flex items-center gap-1 text-[10px] cursor-pointer"><input type="radio" checked={!course.isOldWeight} onChange={() => updateCourse(idx, { isOldWeight: false })} className="accent-black" /> New Weight</label>
                               <label className="flex items-center gap-1 text-[10px] cursor-pointer"><input type="radio" checked={course.isOldWeight} onChange={() => updateCourse(idx, { isOldWeight: true })} className="accent-black" /> Old Weight</label>
                            </div>
                            <select value={course.oldGradeIndex} onChange={e => updateCourse(idx, { oldGradeIndex: parseInt(e.target.value) })} className="text-[10px] bg-white border rounded p-1 outline-none">
                               <option value="-1">Previous Grade</option>
                               {GRADE_LABELS.map((g, i) => (
                                 <option key={g} value={i}>{g} ({course.isOldWeight ? OLD_WEIGHTS[i] : NEW_WEIGHTS[i]})</option>
                               ))}
                            </select>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-8 text-center sm:text-left w-full sm:w-auto">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Expected GPA</div>
                    <div className="text-3xl font-bold font-mono tracking-tighter">{gpaResult.gpa}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Rating</div>
                    <div className={`text-sm font-medium ${gpaResult.rate === 'Fail' ? 'text-red-600' : 'text-black'}`}>
                      {gpaResult.rate}
                    </div>
                  </div>
                </div>

                <div className="text-[9px] border border-neutral-100 p-2.5 rounded-lg bg-neutral-50 font-mono w-full sm:w-auto">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <span>Excellent: ≥ 3.65</span>
                    <span>Good: ≥ 3.00</span>
                    <span>Satisfactory: ≥ 2.50</span>
                    <span>Minimally Acceptable: ≥ 2.00</span>
                    <span className="text-red-600 font-bold">Fail: &lt; 2.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
