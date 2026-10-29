import React, { useState } from 'react';
const loadPdfLib = () => import('pdf-lib');
import { FileUp, Trash2, FileText, Scissors } from 'lucide-react';

export function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('');
  const [isSplitting, setIsSplitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      
      setFile(selectedFile);
      
      try {
        const { PDFDocument } = await loadPdfLib();
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();
        setNumPages(totalPages);
        setRangeInput(`1-${totalPages}`);
      } catch (error) {
        console.error("Error reading PDF:", error);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setNumPages(0);
    setRangeInput('');
  };

  // خوارزمية تحليل النص واستخراج أرقام الصفحات
  const parseRanges = (input: string, maxPages: number): number[] | null => {
    const pages = new Set<number>();
    const parts = input.split(',');

    for (let part of parts) {
      part = part.trim();
      if (!part) continue;

      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          return null; // إدخال غير صالح
        }
        for (let i = start; i <= end; i++) {
          pages.add(i - 1); // pdf-lib يستخدم فهرسة تبدأ من 0
        }
      } else {
        const num = parseInt(part);
        if (isNaN(num) || num < 1 || num > maxPages) {
          return null; // إدخال غير صالح
        }
        pages.add(num - 1);
      }
    }
    
    // إرجاع المصفوفة مرتبة
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!file || !rangeInput.trim()) return;
    
    const pageIndices = parseRanges(rangeInput, numPages);
    
    if (!pageIndices || pageIndices.length === 0) {
      alert(`Invalid range! Please use formats like "1-5, 8, 11-13" (Max pages: ${numPages}).`);
      return;
    }

    setIsSplitting(true);
    
    try {
      const { PDFDocument } = await loadPdfLib();
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfFile = await newPdf.save();
      
      const blob = new Blob([newPdfFile as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Athar_Extracted_Pages.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error processing the file. Please try again.");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full transition-all hover:border-black/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl">
          <Scissors size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">PDF Splitter</h3>
          <p className="text-xs text-neutral-400 font-medium">Extract custom page ranges</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl hover:bg-neutral-50 hover:border-black transition-all cursor-pointer group">
            <FileUp size={28} className="text-neutral-400 group-hover:text-black mb-2 transition-colors" />
            <span className="text-sm font-bold text-neutral-600 group-hover:text-black">Upload a PDF to split</span>
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="bg-neutral-50 rounded-2xl p-4 space-y-4 border border-neutral-100">
            <div className="flex items-center justify-between bg-white p-3 border border-neutral-100 rounded-xl">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={16} className="text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold truncate text-black max-w-[150px]">{file.name}</span>
                  <span className="text-[10px] text-neutral-400">{numPages} total pages</span>
                </div>
              </div>
              <button onClick={removeFile} className="text-neutral-400 hover:text-red-500 transition-colors p-1">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex flex-col">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Pages to extract (e.g., 1-5, 8, 11-13)
              </label>
              <input 
                type="text" 
                value={rangeInput} 
                onChange={(e) => setRangeInput(e.target.value)}
                className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors"
                placeholder={`e.g. 1-${numPages > 5 ? '5' : numPages}, 7`}
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={splitPdf}
        disabled={!file || !rangeInput.trim() || isSplitting}
        className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
          !file || !rangeInput.trim() ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'
        }`}
      >
        {isSplitting ? 'Processing...' : (!file ? 'Upload a file first' : 'Split & Download')}
      </button>
    </div>
  );
}
