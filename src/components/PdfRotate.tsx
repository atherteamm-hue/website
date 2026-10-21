import React, { useState } from 'react';
// pdf-lib is ~350 KB — pull it in on demand instead of shipping it
// with the page bundle. The first click pays for it, the rest is cached.
const loadPdfLib = () => import('pdf-lib');

import { FileUp, Trash2, FileText, RotateCw } from 'lucide-react';

export function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].type === 'application/pdf') {
      setFile(e.target.files[0]);
    }
  };

  const rotatePdf = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const { PDFDocument, degrees } = await loadPdfLib();
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      // تدوير جميع الصفحات 90 درجة لليمين
      pages.forEach(page => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + 90));
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rotated_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error rotating PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl"><RotateCw size={24} /></div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">Rotate PDF</h3>
          <p className="text-xs text-neutral-400 font-medium">Rotate all pages 90° clockwise</p>
        </div>
      </div>
      <div className="space-y-4 flex-1">
        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl hover:bg-neutral-50 hover:border-black transition-all cursor-pointer group">
            <FileUp size={28} className="text-neutral-400 group-hover:text-black mb-2 transition-colors" />
            <span className="text-sm font-bold text-neutral-600 group-hover:text-black">Upload PDF</span>
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="bg-neutral-50 rounded-2xl p-4 space-y-4 border border-neutral-100">
            <div className="flex items-center justify-between bg-white p-3 border border-neutral-100 rounded-xl">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={16} className="text-red-500 shrink-0" />
                <span className="text-xs font-bold truncate text-black max-w-[150px]">{file.name}</span>
              </div>
              <button onClick={() => setFile(null)} className="text-neutral-400 hover:text-red-500 p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        )}
      </div>
      <button onClick={rotatePdf} disabled={!file || isProcessing} className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${!file ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'}`}>
        {isProcessing ? 'Rotating...' : (!file ? 'Upload a file' : 'Rotate & Download')}
      </button>
    </div>
  );
}
