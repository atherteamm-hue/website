import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { FileUp, Trash2, FileText, Type } from 'lucide-react';

export function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('Athar Team');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === 'application/pdf') {
        setFile(e.target.files[0]);
      }
    }
  };

  const applyWatermark = async () => {
    if (!file || !watermarkText) return;
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      
      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 2 - 100,
          y: height / 2,
          size: 50,
          font: helveticaFont,
          color: rgb(0.8, 0.8, 0.8), // رمادي فاتح
          opacity: 0.5,
          rotate: degrees(45),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Watermarked_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error applying watermark.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl"><Type size={24} /></div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">Watermark</h3>
          <p className="text-xs text-neutral-400 font-medium">Add text watermark to your PDF</p>
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
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Watermark Text</label>
              <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors" placeholder="e.g. Athar Team" />
            </div>
          </div>
        )}
      </div>
      <button onClick={applyWatermark} disabled={!file || !watermarkText || isProcessing} className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${!file ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'}`}>
        {isProcessing ? 'Processing...' : (!file ? 'Upload a file' : 'Add Watermark')}
      </button>
    </div>
  );
}
