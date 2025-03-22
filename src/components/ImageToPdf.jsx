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

    const generatePDF = () => {
        if (images.length === 0) return alert("Upload at least one image!");
        
        const pdf = new jsPDF();
        images.forEach((img, index) => {
            if (index !== 0) pdf.addPage();

            let format = "JPEG"; // Default JPG/JPEG
            if (img.startsWith("data:image/png")) {
                format = "PNG";
            }
            pdf.addImage(img, format, 15, 10, 180, 280);
        });
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
