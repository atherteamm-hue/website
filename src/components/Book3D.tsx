// src/components/Book3D.tsx
import React from 'react';

interface Book3DProps {
  title: string;
  url: string;
  coverUrl?: string;
  isArabic?: boolean;
  isSolution?: boolean; // ضفنا هذا المتغير
}

export function Book3D({ title, url, coverUrl, isArabic, isSolution }: Book3DProps) {
  const containerClass = isArabic 
    ? "relative w-full h-full transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:rotateY(30deg)] group-hover:[transform:rotateY(38deg)_translateY(-8px)]"
    : "relative w-full h-full transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:rotateY(-30deg)] group-hover:[transform:rotateY(-38deg)_translateY(-8px)]";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-6 w-40 outline-none">
      
      <div className="relative w-32 h-44 [perspective:1000px]">
        
        <div className={containerClass}>
          
          {/* 1. الغلاف الأمامي */}
          <div className="absolute inset-0 [transform:translateZ(12px)] bg-white rounded-[2px] shadow-sm border border-neutral-300 overflow-hidden">
            {coverUrl ? (
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 text-center p-2">No Cover</div>
            )}

            {/* الشريط الأسود الخاص بكتاب الحلول */}
            {isSolution && (
              <div className="absolute top-4 left-0 right-0 bg-black/90 py-1.5 flex items-center justify-center border-y border-neutral-700 shadow-md z-10">
                <span className="text-white text-[10px] font-black uppercase tracking-[0.25em] ml-1">Solutions</span>
              </div>
            )}
            
            {/* أخدود التجليد */}
            <div className={`absolute top-0 bottom-0 w-[4px] mix-blend-multiply z-20 ${
              isArabic ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
            } from-black/20 to-transparent`}></div>
            
            {/* لمعة التمرير */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
          </div>

          {/* 2. الغلاف الخلفي */}
          <div className="absolute inset-0 [transform:translateZ(-12px)_rotateY(180deg)] bg-neutral-200 rounded-[2px] border border-neutral-300 shadow-xl"></div>

          {/* 3. الوجه الأيسر */}
          <div className="absolute inset-y-0 left-0 w-[24px] [transform:translateX(-12px)_rotateY(-90deg)] flex justify-center overflow-hidden border-y border-neutral-300 bg-[#f8f8f8]">
            {isArabic ? (
              <div className="w-full h-full border-l border-neutral-200 bg-[linear-gradient(to_bottom,transparent_1px,#eaeaea_1px)] bg-[size:100%_3px]"></div>
            ) : (
              <div className="w-full h-full border-r border-neutral-300 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 flex flex-col justify-between py-4 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]">
                <div className="w-full h-[1px] bg-black/10"></div>
                <div className="w-full h-[1px] bg-black/10"></div>
              </div>
            )}
          </div>

          {/* 4. الوجه الأيمن */}
          <div className="absolute inset-y-0 right-0 w-[24px] [transform:translateX(12px)_rotateY(90deg)] flex justify-center overflow-hidden border-y border-neutral-300 bg-[#f8f8f8]">
            {!isArabic ? (
              <div className="w-full h-full border-r border-neutral-200 bg-[linear-gradient(to_bottom,transparent_1px,#eaeaea_1px)] bg-[size:100%_3px]"></div>
            ) : (
              <div className="w-full h-full border-l border-neutral-300 bg-gradient-to-l from-neutral-300 via-neutral-100 to-neutral-300 flex flex-col justify-between py-4 shadow-[inset_0_0_5px_rgba(0,0,0,0.1)]">
                <div className="w-full h-[1px] bg-black/10"></div>
                <div className="w-full h-[1px] bg-black/10"></div>
              </div>
            )}
          </div>

          {/* 5. الوجه العلوي */}
          <div className="absolute inset-x-0 top-0 h-[24px] [transform:translateY(-12px)_rotateX(90deg)] bg-[#f8f8f8] border-x border-neutral-300">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#eaeaea_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* 6. الوجه السفلي */}
          <div className="absolute inset-x-0 bottom-0 h-[24px] [transform:translateY(12px)_rotateX(-90deg)] bg-[#f8f8f8] border-x border-neutral-300 shadow-md">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#eaeaea_1px)] bg-[size:3px_100%]"></div>
          </div>

        </div>

        <div className="absolute -bottom-2 left-2 right-2 h-[8px] bg-black/20 blur-md rounded-[100%] transition-all duration-500 group-hover:bg-black/15 group-hover:blur-lg group-hover:scale-95 [transform:translateZ(-12px)] z-0"></div>
      </div>

      <span className="text-black text-xs font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors mt-2" dir={isArabic ? "rtl" : "ltr"}>
        {title}
      </span>
    </a>
  );
}
