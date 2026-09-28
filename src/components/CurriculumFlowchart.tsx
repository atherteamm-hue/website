import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import { curriculumMap, prerequisites } from '../data/curriculumData';


mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  securityLevel: 'loose', // Required for click events to work in newer versions
  themeVariables: {
    primaryColor: '#ffffff',
    primaryTextColor: '#000000',
    lineColor: '#000000',
    edgeLabelBackground: '#ffffff',
    fontSize: '13px',
    fontFamily: 'inherit'
  }
});

export const CurriculumFlowchart = ({ onCourseClick }: { onCourseClick: (key: string) => void }) => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We attach the handler to window so Mermaid can call it
    (window as any).handleNodeClick = (id: string) => {
      // id will be the index, we map it back to the original key
      const keys = Object.keys(curriculumMap);
      const originalKey = keys[parseInt(id)];
      if (originalKey) onCourseClick(originalKey);
    };
  }, [onCourseClick]);

  const generateGraph = () => {
    let graph = `graph TD\n`;

    // 1. VISUAL STYLES
    graph += `  classDef univ fill:#f9f9f9,stroke:#e5e5e5,stroke-width:1px,color:#a3a3a3;\n`;
    graph += `  classDef college fill:#fff,stroke:#000,stroke-width:1px,color:#000;\n`;
    graph += `  classDef major fill:#000,color:#fff,stroke:#000,stroke-width:1px;\n`;
    // New style for Labs: Double border / dashed look
    graph += `  classDef lab fill:#fff,stroke:#000,stroke-width:3px,stroke-dasharray: 0;\n`;

    const keys = Object.keys(curriculumMap);

    const univKeys = ["الابتكار والريادة والابداع", "التربية الوطنية والسلوك الجامعي", "علوم عسكرية", "لغة انجليزية تطبيقية 1", "لغة انجليزية تطبيقية 2", "لغة عربية تطبيقية", "مهارات الحاسوب والتعليم الالكتروني"];
    const collegeKeys = ["اقتصاد هندسي", "البرمجة للمهندسين", "التفاضل والتكامل (1)", "التفاضل والتكامل (2)", "الفيزياء العامة (1)", "الفيزياء العامة (2)", "الفيزياء العامة عملي (1)", "الكتابة التقنية والاخلاقيات المهنية", "الكيمياء العامة (1)", "الكيمياء العامه العمليه (1)", "المعادلات التفاضلية العادية (1)", "رسم هندسي", "مشغل هندسي"];

    // 2. UNIVERSITY SUBGRAPH
    graph += `  subgraph University ["University Compulsory"]\n`;
    univKeys.forEach(key => {
      if (keys.includes(key)) {
        graph += `    N${keys.indexOf(key)}["${curriculumMap[key][lang]}"]:::univ\n`;
      }
    });
    graph += `  end\n`;

    // 3. COLLEGE SUBGRAPH
    graph += `  subgraph College ["College Requirements"]\n`;
    collegeKeys.forEach(key => {
      if (keys.includes(key)) {
        graph += `    N${keys.indexOf(key)}["${curriculumMap[key][lang]}"]:::college\n`;
      }
    });
    graph += `  end\n`;

    // 4. NODES & STYLE LOGIC
    keys.forEach((key, i) => {
      const isUniv = univKeys.includes(key);
      const isCollege = collegeKeys.includes(key);
      const isLab = key.includes("مختبر") || key.includes("Lab") || key.includes("عملي");

      if (!isUniv && !isCollege) {
        // If it's a lab, use lab style, otherwise major style
        const style = isLab ? 'lab' : 'major';
        graph += `    N${i}["${curriculumMap[key][lang]}"]:::${style}\n`;
      } else if (isLab) {
        // Even if it's college level, if it's a lab, highlight it
        graph += `    N${i}:::lab\n`;
      }

      // Safety: Use the INDEX as the click argument to avoid Arabic character errors in the graph string
      graph += `    click N${i} call handleNodeClick("${i}")\n`;
    });

    // 5. EDGES
    prerequisites.forEach(([pre, target]) => {
      const preIdx = keys.indexOf(pre);
      const targetIdx = keys.indexOf(target);
      if (preIdx !== -1 && targetIdx !== -1) {
        graph += `  N${preIdx} --> N${targetIdx}\n`;
      }
    });

    return graph;
  };

  useEffect(() => {
    if (mermaidRef.current) {
      // Clear previous render
      mermaidRef.current.removeAttribute('data-processed');
      mermaid.contentLoaded();
    }
  }, [lang]);

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl border border-black/5 rounded-[40px] p-6 sm:p-10 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase mb-1">Curriculum Journey</h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider opacity-40">
              <div className="w-2 h-2 bg-black rounded-sm" /> Major
            </span>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider opacity-40">
              <div className="w-2 h-2 border-2 border-black rounded-sm" /> Lab
            </span>
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider opacity-40">
              <div className="w-2 h-2 bg-neutral-200 rounded-sm" /> General
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="group flex items-center gap-3 px-6 py-2.5 bg-black text-white rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
        >
          {lang === 'en' ? 'Arabic View' : 'English View'}
        </button>
      </div>

      <div 
        key={lang} 
        className="mermaid flex justify-center overflow-x-auto pb-6" 
        ref={mermaidRef}
      >
        {generateGraph()}
      </div>
    </div>
  );
};
