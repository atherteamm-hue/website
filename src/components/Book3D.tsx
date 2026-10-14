// src/components/Book3D.tsx
import React from 'react';

interface Book3DProps {
  title: string;
  url: string;
  coverUrl?: string;
  isArabic?: boolean;
}

export function Book3D({ title, url, coverUrl, isArabic }: Book3DProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-5 w-40 outline-none">
      <div className="relative w-32 h-44 [perspective:1000px]">
        
        {/* حاوية المجسم - الميلان مبني بشكل سليم لكل لغة */}
        <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isArabic 
            ? '[transform:rotateY(25deg)_rotateX(5deg)] group-hover:[transform:rotateY(32deg)_rotateX(5deg)_translateY(-6px)]' 
            : '[transform:rotateY(-25deg)_rotateX(5deg)] group-hover:[transform:rotateY(-32deg)_rotateX(5deg)_translateY(-6px)]'
        }`}>
          
          {/* 1. الغلاف الأمامي (Front Cover) */}
          <div className="absolute inset-0 z-30 [transform:translateZ(12px)] bg-white rounded-sm shadow-md border border-neutral-300 overflow-hidden">
            {coverUrl ? (
              <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400">No Cover</div>
            )}
            
            {/* أخدود التجليد (Hinge/Crease) - ذكي يتغير مكانه حسب لغة الكتاب */}
            <div className={`absolute top-0 bottom-0 w-[6px] mix-blend-multiply ${
              isArabic 
                ? 'right-[2px] bg-gradient-to-l from-black/20 to-transparent' 
                : 'left-[2px] bg-gradient-to-r from-black/20 to-transparent'
            }`}></div>
            
            {/* لمعة زجاجية خفيفة للتفاعل */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* 2. الغلاف الخلفي (Back Cover) */}
          <div className="absolute inset-0 z-0 [transform:translateZ(-12px)_rotateY(180deg)] bg-neutral-200 rounded-sm shadow-xl border border-neutral-300"></div>

          {/* 3. كعب الكتاب (Spine) - يتم بناؤه يميناً أو يساراً حسب اللغة */}
          <div className={`absolute top-0 bottom-0 w-[24px] bg-neutral-200 z-20 border-y border-neutral-300 flex justify-center ${
            isArabic 
              ? 'right-0 origin-right [transform:translateZ(12px)_rotateY(90deg)] border-r' 
              : 'left-0 origin-left [transform:translateZ(12px)_rotateY(-90deg)] border-l'
          }`}>
            {/* تأثير إضاءة الكعب الأسطواني */}
            <div className="w-full h-full bg-gradient-to-r from-black/10 via-white/40 to-black/10"></div>
          </div>

          {/* 4. الأوراق الجانبية (Side Pages) */}
          <div className={`absolute top-[2px] bottom-[2px] w-[24px] bg-[#fafafa] z-10 flex flex-col justify-between p-[2px] border-y border-neutral-200 ${
            isArabic 
              ? 'left-0 origin-left [transform:translateZ(12px)_rotateY(-90deg)] border-l' 
              : 'right-0 origin-right [transform:translateZ(12px)_rotateY(90deg)] border-r'
          }`}>
            {/* خطوط الأوراق */}
            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_1px,#eaeaea_1px)] bg-[size:100%_3px]"></div>
          </div>

          {/* 5. الأوراق العلوية (Top Pages) */}
          <div className="absolute top-0 left-[2px] right-[2px] h-[24px] bg-[#fafafa] origin-top [transform:translateZ(12px)_rotateX(90deg)] z-10 border-x border-neutral-200">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#eaeaea_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* 6. الأوراق السفلية (Bottom Pages) */}
          <div className="absolute bottom-0 left-[2px] right-[2px] h-[24px] bg-[#fafafa] origin-bottom [transform:translateZ(12px)_rotateX(-90deg)] z-10 border-x border-neutral-200 shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#eaeaea_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* 7. الظل الساقط (Drop Shadow) */}
          <div className="absolute -bottom-3 left-3 right-3 h-4 bg-black/15 blur-lg rounded-full transition-all duration-500 group-hover:bg-black/10 group-hover:blur-xl group-hover:scale-110 [transform:translateZ(-10px)]"></div>

        </div>
      </div>

      <span className="text-black text-xs font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors mt-2" dir={isArabic ? "rtl" : "ltr"}>
        {title}
      </span>
    </a>
  );
}
