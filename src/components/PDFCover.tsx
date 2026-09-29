import React, { useEffect, useState, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const PDFCover = ({ url }: { url: string }) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = async () => {
      try {
        const pdf = await pdfjs.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context!, viewport }).promise;
        setThumb(canvas.toDataURL());
      } catch (e) { console.error(e); }
    };
    render();
  }, [url]);

  return (
    <div className="w-full h-full bg-neutral-100 rounded border flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      {thumb ? <img src={thumb} alt="" className="w-full h-full object-cover" /> : <div className="text-[8px] opacity-20">PDF</div>}
    </div>
  );
};
