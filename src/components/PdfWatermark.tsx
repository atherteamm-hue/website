import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { FileUp, Trash2, FileText, Type, Image as ImageIcon, ImagePlus, X } from 'lucide-react';

export function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  
  const [watermarkType, setWatermarkType] = useState<'text' | 'image'>('text');
  
  const [watermarkText, setWatermarkText] = useState('Athar Team');
  
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].type === 'application/pdf') {
        setFile(e.target.files[0]);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      if (imgFile.type.startsWith('image/')) {
        setWatermarkImage(imgFile);
        setImagePreview(URL.createObjectURL(imgFile));
      }
    }
  };

  const removeImage = () => {
    setWatermarkImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const applyWatermark = async () => {
    if (!file) return;
    if (watermarkType === 'text' && !watermarkText) return;
    if (watermarkType === 'image' && !watermarkImage) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      if (watermarkType === 'text') {
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        pages.forEach(page => {
          const { width, height } = page.getSize();
          page.drawText(watermarkText, {
            x: width / 2 - 100,
            y: height / 2,
            size: 50,
            font: helveticaFont,
            color: rgb(0.8, 0.8, 0.8),
            opacity: 0.5,
            rotate: degrees(45), // النص بضل مايل
          });
        });
      } else if (watermarkType === 'image' && watermarkImage) {
        const imgArrayBuffer = await watermarkImage.arrayBuffer();
        let pdfImage;
        
        if (watermarkImage.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(imgArrayBuffer);
        } else if (watermarkImage.type === 'image/jpeg' || watermarkImage.type === 'image/jpg') {
          pdfImage = await pdfDoc.embedJpg(imgArrayBuffer);
        } else {
          throw new Error("Only PNG and JPEG images are supported.");
        }

        const imgDims = pdfImage.scale(0.5); // تصغير حجم الصورة للنصف كافتراضي

        pages.forEach(page => {
          const { width, height } = page.getSize();
          page.drawImage(pdfImage, {
            x: width / 2 - imgDims.width / 2, // تمركز أفقي
            y: height / 2 - imgDims.height / 2, // تمركز عمودي
            width: imgDims.width,
            height: imgDims.height,
            opacity: 0.3, // شفافية الصورة (خفيفة لتبين علامة مائية)
            // شلنا الـ rotate هون عشان تضل الصورة جالسة بالنص بدون ما تنقص
          });
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Watermarked_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      alert("Error applying watermark: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const isReady = file && ((watermarkType === 'text' && watermarkText) || (watermarkType === 'image' && watermarkImage));

  return (
    <div className="bg-white border border-black/10 rounded-[30px] p-8 shadow-sm flex flex-col h-full">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black text-white rounded-xl">
            {watermarkType === 'text' ? <Type size={24} /> : <ImageIcon size={24} />}
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tighter text-black">Watermark</h3>
            <p className="text-xs text-neutral-400 font-medium">Add text or image to your PDF</p>
          </div>
        </div>

        <div className="flex bg-neutral-100 p-1 rounded-xl">
          <button 
            onClick={() => setWatermarkType('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${watermarkType === 'text' ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-black'}`}
          >
            <Type size={14} /> Text
          </button>
          <button 
            onClick={() => setWatermarkType('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${watermarkType === 'image' ? 'bg-white text-black shadow-sm' : 'text-neutral-500 hover:text-black'}`}
          >
            <ImageIcon size={14} /> Image
          </button>
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

            {watermarkType === 'text' ? (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Watermark Text</label>
                <input 
                  type="text" 
                  value={watermarkText} 
                  onChange={(e) => setWatermarkText(e.target.value)} 
                  className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm font-bold outline-none focus:border-black transition-colors" 
                  placeholder="e.g. Athar Team" 
                />
              </div>
            ) : (
              <div>
                 <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Watermark Image (PNG/JPG)</label>
                 {!watermarkImage ? (
                   <label className="flex flex-col items-center justify-center w-full h-24 bg-white border-2 border-dashed border-neutral-300 rounded-xl hover:bg-neutral-50 hover:border-black transition-all cursor-pointer group">
                     <ImagePlus size={24} className="text-neutral-400 group-hover:text-black mb-1 transition-colors" />
                     <span className="text-xs font-bold text-neutral-600 group-hover:text-black">Select Image</span>
                     <input type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={handleImageChange} />
                   </label>
                 ) : (
                   <div className="flex items-center justify-between bg-white p-2 border border-neutral-200 rounded-xl">
                     <div className="flex items-center gap-3">
                       <img src={imagePreview!} alt="Watermark Preview" className="w-10 h-10 object-cover rounded-lg border border-neutral-100" />
                       <span className="text-xs font-bold truncate text-black max-w-[120px]">{watermarkImage.name}</span>
                     </div>
                     <button onClick={removeImage} className="text-neutral-400 hover:text-red-500 p-2"><X size={16} /></button>
                   </div>
                 )}
              </div>
            )}
          </div>
        )}
      </div>

      <button 
        onClick={applyWatermark} 
        disabled={!isReady || isProcessing} 
        className={`w-full py-4 mt-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${!isReady ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:scale-[1.02] shadow-lg'}`}
      >
        {isProcessing ? 'Processing...' : (!file ? 'Upload a file' : 'Add Watermark')}
      </button>
    </div>
  );
}
