import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUp, Trash2, Image as ImageIcon, Download } from 'lucide-react';

export function ImgToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // قبول صور JPG و PNG فقط
      const newFiles = Array.from(e.target.files).filter(f => 
        f.type === 'image/jpeg' || f.type === 'image/png' || f.type === 'image/jpg'
      );
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of images) {
        const imgBytes = await imgFile.arrayBuffer();
        let pdfImage;
        
        // التحقق من نوع الصورة لدمجها بشكل صحيح
        if (imgFile.type === 'image/jpeg' || imgFile.type === 'image/jpg') {
          pdfImage = await pdfDoc.embedJpg(imgBytes);
        } else if (imgFile.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imgBytes);
        } else {
          continue;
        }

        const { width, height } = pdfImage;
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(pdfImage, {
          x: 0,
          y: 0,
          width: width,
          height: height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Athar_Images_To_PDF.pdf';
      a.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error converting images:", error);
      alert("Error converting images. Please make sure they are valid JPG or PNG files.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-black text-white rounded-xl">
          <ImageIcon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tighter text-black">IMG to PDF</h3>
          <p className="text-xs text-neutral-400 font-medium">Convert JPG/PNG images into a single PDF</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl hover:bg-neutral-50 hover:border-black transition-all cursor-pointer group">
          <FileUp size={28} className="text-neutral-400 group-hover:text-black mb-2 transition-colors" />
          <span className="text-sm font-bold text-neutral-600 group-hover:text-black">Upload Images (JPG, PNG)</span>
          <input type="file" multiple accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageChange} />
        </label>

        {images.length > 0 && (
          <div className="bg-neutral-50 rounded-2xl p-4 max-h-48 overflow-y-auto space-y-2 border border-neutral-100">
            {images.map((img, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-3 border border-neutral-100 rounded-xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  <ImageIcon size={16} className="text-blue-500 shrink-0" />
                  <span className="text-xs font-bold truncate text-black max-w-[150px]">{img.name}</span>
                </div>
                <button onClick={() => removeImage(index)} className="text-neutral-400 hover:text-red-500 transition-colors p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={convertToPdf}
        disabled={images.length === 0 || isConverting}
        className={`w-full py-4 mt-4 flex items-center justify-center gap-2 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
          images.length === 0 ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'
        }`}
      >
        {isConverting ? 'Converting...' : (images.length === 0 ? 'Upload images first' : <>Convert to PDF <Download size={16}/></>)}
      </button>
    </div>
  );
}
