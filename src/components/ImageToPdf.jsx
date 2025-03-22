import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { CloudUpload, FileImage, FileText } from "lucide-react";

const ImageToPdf = () => {
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const imgURLs = files.map((file) => URL.createObjectURL(file));
        setImages(imgURLs);
    };

    const generatePDF = async () => {
        if (images.length === 0) return alert("Upload at least one image!");
    
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
    
        for (let i = 0; i < images.length; i++) {
            if (i !== 0) pdf.addPage(); // Tambah halaman jika ada lebih dari satu gambar
    
            await new Promise((resolve) => {
                const img = new Image();
                img.src = images[i];
    
                img.onload = function () {
                    let imgWidth = img.width;
                    let imgHeight = img.height;
    
                    // Hitung skala agar gambar tetap proporsional
                    let scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                    let newWidth = imgWidth * scale;
                    let newHeight = imgHeight * scale;
    
                    // Posisi agar gambar di tengah halaman
                    let xPos = (pageWidth - newWidth) / 2;
                    let yPos = (pageHeight - newHeight) / 2;
    
                    // Tentukan format gambar
                    let format = images[i].startsWith("data:image/png") ? "PNG" : "JPEG";
    
                    pdf.addImage(images[i], format, xPos, yPos, newWidth, newHeight);
                    resolve(); // Selesaikan load gambar sebelum lanjut ke gambar berikutnya
                };
            });
        }
        pdf.save("converted.pdf");
    };    
    

    return (
        <div className="bg-slate-200 max-w-lg mx-auto shadow-lg rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center justify-center gap-2">
                <FileImage size={24} /> Gambar Ke PDF            
            </h2>
            
            {/* Input File */}
            <label className="w-full flex flex-col items-center px-4 py-6 bg-blue-100 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-blue-200">
                <CloudUpload size={30} className="text-blue-500" />
                <span className="mt-2 text-gray-600 text-sm">Klik Untuk Upload Gambar</span>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {/* Preview Images */}
            <div className="flex gap-2 overflow-x-auto p-2">
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded shadow" />
                ))}
            </div>

            {/* Convert Button */}
            <button 
                onClick={generatePDF} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 transition">
                <FileText size={18} />
                Convert Ke PDF
            </button>
        </div>
    );
};

export default ImageToPdf;
