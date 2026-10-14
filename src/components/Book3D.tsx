// src/components/Book3D.tsx
import React from 'react';

// هاي هي المتغيرات (Parameters) اللي حكيت عنها
interface Book3DProps {
  title: string;
  url: string;
  coverUrl?: string;
}

export function Book3D({ title, url, coverUrl }: Book3DProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-5 w-36 outline-none">
      {/* حاوية الـ 3D مع Perspective عالي */}
      <div className="relative w-32 h-46 [perspective:1200px] [transform-style:preserve-3d]">
        
        {/* مجسم الكتاب الرئيسي */}
        <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] [transform:rotateY(-18deg)_rotateX(6deg)_rotateZ(-1deg)] group-hover:[transform:rotateY(-26deg)_rotateX(10deg)_rotateZ(-2deg)_translateY(-8px)]">
          
          {/* الغلاف الأمامي للكتاب */}
          <div className="absolute inset-0 rounded-r-md overflow-hidden bg-white border border-neutral-300 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] z-20 [transform-style:preserve-3d]">
            {coverUrl ? (
              <img 
                src={coverUrl} 
                alt={title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('bg-neutral-100', 'flex', 'items-center', 'justify-center', 'text-xs', 'font-bold', 'text-neutral-400', 'text-center', 'p-2');
                  (e.target as HTMLImageElement).parentElement!.innerText = 'Cover Not Found';
                }}
              />
            ) : (
              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-400 text-center p-2">No Cover</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent pointer-events-none"></div>
          </div>

          {/* كعب الكتاب الجانبي (Spine) */}
          <div className="absolute top-0 left-0 bottom-0 w-[14px] bg-gradient-to-r from-neutral-200 to-neutral-50 border-y border-l border-neutral-300 rounded-l-sm shadow-inner origin-right -translate-x-3.5 skew-y-12 z-10 flex justify-center">
            <div className="w-[1px] h-[92%] bg-neutral-300/60"></div>
          </div>

          {/* طبقات أوراق الكتاب */}
          <div className="absolute top-[3px] right-[-10px] bottom-[3px] w-[10px] bg-gradient-to-l from-white via-neutral-100 to-neutral-200 border-y border-r border-neutral-300/50 rounded-r-sm z-0 [transform:rotateY(90deg)_translateZ(-5px)] shadow-[1px_0_3px_rgba(0,0,0,0.1)] flex flex-col justify-between p-[2px]">
            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_1px,#e5e5e5_1px)] bg-[size:100%_2px]"></div>
          </div>

          {/* الجزء السفلي من الأوراق */}
          <div className="absolute bottom-[-10px] left-[5px] right-[-1px] h-[10px] bg-neutral-100 border-x border-b border-neutral-300 rounded-b-sm z-0 [transform:rotateX(90deg)_translateZ(5px)] flex flex-col justify-between p-[1px]">
            <div className="w-full h-full bg-[linear-gradient(to_right,transparent_1px,#e5e5e5_1px)] bg-[size:2px_100%]"></div>
          </div>

          {/* الظل الخلفي الساقط */}
          <div className="absolute -inset-4 bg-black/10 blur-md rounded-xl transition-opacity duration-300 group-hover:bg-black/20 -z-10 [transform:translateZ(-15px)_translateY(8px)]"></div>
          
        </div>
      </div>

      {/* اسم الكتاب */}
      <span className="text-black text-xs font-bold text-center leading-tight group-hover:text-neutral-500 transition-colors mt-2" dir="ltr">
        {title}
      </span>
    </a>
  );
}
