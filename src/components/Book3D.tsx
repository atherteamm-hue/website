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
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-7 w-44 outline-none">
      
      {/* الحاوية بـ Perspective عميق جداً لواقعية المنظور */}
      <div className={`relative w-36 h-52 mt-4 [perspective:1800px] [transform-style:preserve-3d] ${isArabic ? '-scale-x-100' : ''}`}>
        
        {/* المجسم الرئيسي - تفاعل فيزيائي عند الرفع (Hover) */}
        <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] [transform:rotateX(15deg)_rotateY(-24deg)_rotateZ(-1deg)] group-hover:[transform:rotateX(20deg)_rotateY(-32deg)_rotateZ(-2deg)_translateY(-15px)]">
          
          {/* === 1. الغلاف الأمامي (Front Cover) === */}
          <div className="absolute inset-0 z-30 [transform:translateZ(14px)] [transform-style:preserve-3d]">
            <div className="absolute inset-0 bg-white rounded-r-md overflow-hidden shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)] border border-neutral-300">
              {coverUrl ? (
                <img 
                  src={coverUrl} 
                  alt={title} 
                  className={`w-full h-full object-cover ${isArabic ? '-scale-x-100' : ''}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('bg-neutral-100', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-neutral-400', 'text-center', 'p-2');
                    (e.target as HTMLImageElement).parentElement!.innerText = 'Cover Not Found';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 text-center p-2">No Cover</div>
              )}
              
              {/* أخدود التجليد (Book Hinge Crease) */}
              <div className="absolute top-0 bottom-0 left-[2px] w-[6px] bg-gradient-to-r from-black/40 via-transparent to-black/10 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 left-[8px] w-[2px] bg-white/30 pointer-events-none"></div>

              {/* لمعة زجاجية متحركة (Dynamic Glare) تقطع الغلاف عند التمرير */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full ease-out"></div>
              
              {/* تظليل ثابت يضيف عمق للغلاف */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5 pointer-events-none"></div>
            </div>
          </div>

          {/* === 2. كعب الكتاب (Spine) === */}
          <div className="absolute top-0 left-0 bottom-0 w-[28px] bg-neutral-200 origin-left [transform:rotateY(-90deg)_translateZ(-14px)] z-20 flex justify-center overflow-hidden border-y border-l border-neutral-300 rounded-l-sm">
            {/* تدرج لوني يعطي إيحاء بأن الكعب أسطواني/دائري وليس مسطح */}
            <div className="w-full h-full bg-gradient-to-r from-black/30 via-white/80 to-black/40"></div>
            {/* خطوط التجليد العلوية والسفلية (Details) */}
            <div className="absolute top-4 w-full h-[2px] bg-black/10 border-b border-white/60"></div>
            <div className="absolute bottom-4 w-full h-[2px] bg-black/10 border-b border-white/60"></div>
          </div>

          {/* === 3. طبقات الأوراق (Pages) === */}
          {/* الأوراق الجانبية (يمين) - نلاحظ أنها أصغر قليلاً من الغلاف لتعطي واقعية */}
          <div className="absolute top-[3px] bottom-[3px] right-[2px] w-[28px] bg-[#f4f4f0] origin-right [transform:rotateY(90deg)_translateZ(0px)] z-10 border-y border-r border-neutral-300/60 shadow-[inset_4px_0_8px_rgba(0,0,0,0.08)]">
            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_1px,#e5e5dd_1px)] bg-[size:100%_3px]"></div>
          </div>

          {/* الأوراق السفلية (تحت) */}
          <div className="absolute bottom-[2px] left-[2px] right-[4px] h-[28px] bg-[#f4f4f0] origin-bottom [transform:rotateX(-90deg)_translateZ(-14px)] z-10 border-x border-b border-neutral-300/60 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.05)]">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5dd_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* الأوراق العلوية (فوق) */}
          <div className="absolute top-[2px] left-[2px] right-[4px] h-[28px] bg-[#f4f4f0] origin-top [transform:rotateX(90deg)_translateZ(14px)] z-10 border-x border-t border-neutral-300/60">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5dd_1px)] bg-[size:3px_100%]"></div>
          </div>

          {/* === 4. الغلاف الخلفي (Back Cover) === */}
          {/* الغلاف الخلفي يغلق المجسم ويعطيه وزن بصري */}
          <div className="absolute inset-0 bg-neutral-200 rounded-r-md [transform:translateZ(-14px)_rotateY(180deg)] z-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.15)] border border-neutral-400"></div>

          {/* === 5. الظل الساقط (Physics Drop Shadow) === */}
          {/* الظل مفصول عن المجسم، ويتفاعل بالانتشار (Blur) عند ارتفاع الكتاب */}
          <div className="absolute -inset-2 top-10 bg-black/20 blur-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform:translateZ(-40px)_translateY(5px)_rotateX(30deg)] group-hover:bg-black/15 group-hover:blur-2xl group-hover:[transform:translateZ(-50px)_translateY(35px)_rotateX(20deg)_scale(0.85)] -z-10 rounded-full"></div>
          
        </div>
      </div>

      {/* اسم الكتاب */}
      <span className="text-black text-sm font-black text-center leading-tight group-hover:text-neutral-500 transition-colors" dir={isArabic ? "rtl" : "ltr"}>
        {title}
      </span>
    </a>
  );
}
