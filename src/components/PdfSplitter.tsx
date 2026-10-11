import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUp, Trash2, FileText, Scissors } from 'lucide-react';

export function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<number | ''>('');
  const [endPage, setEndPage] = useState<number | ''>('');
  const [isSplitting, setIsSplitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') return;
      
      setFile(selectedFile);
      
      // قراءة الملف لمعرفة عدد الصفحات الكلي فوراً
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();
        setNumPages(totalPages);
        setStartPage(1);
        setEndPage(totalPages);
      } catch (error) {
        console.error("Error reading PDF:", error);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setNumPages(0);
    setStartPage('');
    setEndPage('');
  };

  const splitPdf = async () => {
    if (!file || startPage === '' || endPage === '') return;
    
    const start = parseInt(startPage.toString());
    const end = parseInt(endPage.toString());

    if (start < 1 || end > numPages || start > end) {
      alert(`Please enter a valid range between 1 and ${numPages}.`);
      return;
    }

    setIsSplitting(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      // إنشاء مصفوفة بأرقام الصفحات المطلوبة (الفهرسة تبدأ من 0)
      const pageIndices = [];
      for (let i = start - 1; i <= end - 1; i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfFile = await newPdf.save();
      
      // تحميل الملف المقصوص
      const blob = new Blob([newPdfFile], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Athar_Extracted_Pages_${start}-${end}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error splitting PDF:", error);
      alert("Error splitting the file. Please try again.");
    } finally {
      setIsSplitting(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl">
          <Scissors size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">PDF Splitter</h3>
          <p className="text-xs text-neutral-400 font-medium">Extract specific pages from a PDF</p>
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
                  <span className="text-[10px] text-neutral-400">{numPages} pages</span>
                </div>
              </div>
              <button onClick={removeFile} className="text-neutral-400 hover:text-red-500 transition-colors p-1">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">From Page</label>
                <input 
                  type="number" 
                  min="1" 
                  max={numPages} 
                  value={startPage} 
                  onChange={(e) => setStartPage(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors"
                  placeholder="1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">To Page</label>
                <input 
                  type="number" 
                  min="1" 
                  max={numPages} 
                  value={endPage} 
                  onChange={(e) => setEndPage(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors"
                  placeholder={numPages.toString()}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={splitPdf}
        disabled={!file || startPage === '' || endPage === '' || isSplitting}
        className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
          !file || startPage === '' || endPage === '' ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'
        }`}
      >
        {isSplitting ? 'Processing...' : (!file ? 'Upload a file first' : 'Split & Download')}
      </button>
    </div>
  );
}
