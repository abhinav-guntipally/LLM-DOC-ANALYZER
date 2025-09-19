import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/documents/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to analyze document");

      const data = await res.json();
      setResult(data.analysis);
    } catch (err) {
      console.error(err);
      alert("❌ Error analyzing document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center p-6">
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-2">
          📄 LLM Document Analyzer
        </h1>
        <p className="text-gray-700 text-lg">
          Upload contracts or invoices to detect missing fields and get recommendations
        </p>
      </header>

      <UploadForm onUpload={handleUpload} />

      {loading && <Loader />}

      {result && (
        <ResultCard
          docType={result.docType}
          confidence={result.confidence || "N/A"}
          missingFields={result.missingFields || []}
          recommendations={result.recommendations || []}
        />
      )}

      <footer className="mt-10 text-gray-500">
        © 2025 LLM Doc Analyzer. All rights reserved.
      </footer>
    </div>
  );
}
