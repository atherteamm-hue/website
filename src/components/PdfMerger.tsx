import React, { useState } from 'react';
// pdf-lib is ~350 KB — pull it in on demand instead of shipping it
// with the page bundle. The first click pays for it, the rest is cached.
const loadPdfLib = () => import('pdf-lib');

import { FileUp, FileDown, Trash2, FileText, ChevronUp, ChevronDown } from 'lucide-react';

export function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // دالة تحريك الملفات للأعلى والأسفل
  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    if (direction === 'up' && index > 0) {
      [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
    }
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    try {
      const { PDFDocument } = await loadPdfLib();
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Athar_Merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error merging files.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl"><FileDown size={24} /></div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">PDF Merger</h3>
          <p className="text-xs text-neutral-400 font-medium">Merge & Reorder PDF files</p>
        </div>
      </div>
      <div className="space-y-4 flex-1">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl hover:bg-neutral-50 hover:border-black transition-all cursor-pointer group">
          <FileUp size={28} className="text-neutral-400 group-hover:text-black mb-2 transition-colors" />
          <span className="text-sm font-bold text-neutral-600 group-hover:text-black">Upload PDF files</span>
          <input type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
        </label>
        {files.length > 0 && (
          <div className="bg-neutral-50 rounded-2xl p-4 max-h-48 overflow-y-auto space-y-2 border border-neutral-100">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-2 border border-neutral-100 rounded-xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={16} className="text-red-500 shrink-0" />
                  <span className="text-xs font-bold truncate text-black max-w-[120px]">{file.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {/* أزرار الترتيب */}
                  <button disabled={index === 0} onClick={() => moveFile(index, 'up')} className="text-neutral-400 hover:text-black disabled:opacity-30 p-1"><ChevronUp size={16}/></button>
                  <button disabled={index === files.length - 1} onClick={() => moveFile(index, 'down')} className="text-neutral-400 hover:text-black disabled:opacity-30 p-1"><ChevronDown size={16}/></button>
                  <button onClick={() => removeFile(index)} className="text-neutral-400 hover:text-red-500 p-1 ml-1"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={mergePdfs} disabled={files.length < 2 || isMerging} className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${files.length < 2 ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'}`}>
        {isMerging ? 'Merging...' : (files.length < 2 ? 'Upload 2+ files' : 'Merge & Download')}
      </button>
    </div>
  );
}
