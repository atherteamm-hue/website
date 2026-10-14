// src/components/Book3D.tsx
import React from 'react';

interface Book3DProps {
  title: string;
  url: string;
  coverUrl?: string;
  isArabic?: boolean;
}

export function Book3D({ title, url, coverUrl, isArabic }: Book3DProps) {
  // تحديد زوايا الدوران حسب لغة الكتاب (عشان يبين الكعب بشكل صحيح)
  const containerClass = isArabic 
    ? "relative w-full h-full transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:rotateX(10deg)_rotateY(25deg)] group-hover:[transform:rotateX(5deg)_rotateY(15deg)_translateY(-10px)]"
    : "relative w-full h-full transition-all duration-500 ease-out [transform-style:preserve-3d] [transform:rotateX(10deg)_rotateY(-25deg)] group-hover:[transform:rotateX(5deg)_rotateY(-15deg)_translateY(-10px)]";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-6 w-44 outline-none">
      
      {/* حاوية الكتاب 3D - واقفة ومستقيمة */}
      <div className="relative w-36 h-52 mt-4 [perspective:1000px]">
        
        <div className={containerClass}>
          
          {/* 1. الغلاف الأمامي */}
          <div className="absolute inset-0 [transform:translateZ(16px)] bg-white rounded-sm shadow-md overflow-hidden border border-neutral-300">
            {coverUrl ? (
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 text-center p-2">No Cover</div>
            )}
            
            {/* أخدود التجليد (الخسفة) */}
            <div className={`absolute top-0 bottom-0 w-[6px] bg-gradient-to-r from-black/20 to-transparent mix-blend-multiply ${isArabic ? 'right-0 rotate-180' : 'left-0'}`}></div>
            
            {/* لمعة زجاجية عند التمرير */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* 2. الغلاف الخلفي */}
          <div className="absolute inset-0 [transform:translateZ(-16px)_rotateY(180deg)] bg-neutral-200 rounded-sm shadow-xl border border-neutral-300"></div>

          {/* 3. الجانب الأيسر (كعب للإنجليزي، أوراق للعربي) */}
          <div className="absolute inset-y-0 left-0 w-[32px] origin-left [transform:translateZ(16px)_rotateY(-90deg)] flex justify-center overflow-hidden border-y border-neutral-300 bg-[#f8f8f8]">
            {isArabic ? (
              // رسمة الأوراق للعربي
              <div className="w-full h-full border-l border-neutral-300 bg-[linear-gradient(to_bottom,transparent_1px,#e5e5e5_1px)] bg-[size:100%_3px]"></div>
            ) : (
              // رسمة الكعب للإنجليزي
              <div className="w-full h-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 border-r border-neutral-300 flex flex-col justify-between py-4 shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]">
                <div className="w-full h-[2px] bg-black/10"></div>
                <div className="w-full h-[2px] bg-black/10"></div>
              </div>
            )}
          </div>

          {/* 4. الجانب الأيمن (أوراق للإنجليزي، كعب للعربي) */}
          <div className="absolute inset-y-0 right-0 w-[32px] origin-right [transform:translateZ(16px)_rotateY(90deg)] flex justify-center overflow-hidden border-y border-neutral-300 bg-[#f8f8f8]">
            {!isArabic ? (
              // رسمة الأوراق للإنجليزي
              <div className="w-full h-full border-r border-neutral-300 bg-[linear-gradient(to_bottom,transparent_1px,#e5e5e5_1px)] bg-[size:100%_3px]"></div>
            ) : (
              // رسمة الكعب للعربي
              <div className="w-full h-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 border-l border-neutral-300 flex flex-col justify-between py-4 shadow-[inset_0_0_8px_rgba(0,0,0,0.05)]">
                <div className="w-full h-[2px] bg-black/10"></div>
                <div className="w-full h-[2px] bg-black/10"></div>
              </div>
            )}
          </div>

          {/* 5. الوجه العلوي (الأوراق من فوق) */}
          <div className="absolute inset-x-0 top-0 h-[32px] origin-top [transform:translateZ(16px)_rotateX(90deg)] bg-[#f8f8f8] border-x border-t border-neutral-300">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5e5_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* 6. الوجه السفلي (الأوراق من تحت) */}
          <div className="absolute inset-x-0 bottom-0 h-[32px] origin-bottom [transform:translateZ(16px)_rotateX(-90deg)] bg-[#f8f8f8] border-x border-b border-neutral-300 shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5e5_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* ظل على الأرضية (Anchor Shadow) */}
          <div className="absolute -bottom-4 left-2 right-2 h-[12px] bg-black/20 blur-md rounded-full transition-all duration-500 group-hover:bg-black/10 group-hover:blur-xl group-hover:scale-90 [transform:translateZ(0px)]"></div>

        </div>
      </div>

      <span className="text-black text-sm font-black text-center leading-tight group-hover:text-neutral-500 transition-colors" dir={isArabic ? "rtl" : "ltr"}>
        {title}
      </span>
    </a>
  );
}
