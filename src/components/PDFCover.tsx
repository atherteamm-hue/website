import React, { useEffect, useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

// This uses a public CDN for the worker to avoid complex local setup on GitHub
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs`;

export const PDFCover = ({ url }: { url: string }) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = async () => {
      try {
        const loadingTask = pdfjs.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        setThumb(canvas.toDataURL());
      } catch (e) {
        // Fallback if PDF fails to load
        console.error("PDF Thumb error:", e);
      }
    };
    render();
  }, [url]);

  return (
    <div className="w-full h-full bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      {thumb ? (
        <img src={thumb} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="text-[10px] font-mono opacity-20 uppercase">PDF</div>
      )}
    </div>
  );
};
