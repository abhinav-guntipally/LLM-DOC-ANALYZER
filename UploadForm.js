import React, { useState } from "react";
import Loader from "./Loader";

export default function UploadForm({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); setSelectedFile(e.dataTransfer.files[0]); };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a PDF");
    onUpload(selectedFile);
  };

  return (
    <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6 mb-8">
      <form
        onSubmit={handleUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-6 border-4 border-dashed rounded-xl text-center ${
          dragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
        } transition-all duration-300`}
      >
        <p className="text-gray-700 mb-4">Drag & drop your PDF here or click to select</p>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="cursor-pointer inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          {selectedFile ? selectedFile.name : "Select PDF"}
        </label>
        <button type="submit" className="ml-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Analyze
        </button>
      </form>
      <Loader />
    </div>
  );
}
