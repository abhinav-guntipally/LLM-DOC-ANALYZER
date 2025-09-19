import React from "react";

export default function ResultCard({ docType, confidence, missingFields, recommendations }) {
  return (
    <div className="mt-8 p-6 max-w-lg w-full bg-white shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-2">📑 Analysis Result</h2>

      <p className="text-lg mb-2">
        Document Type:{" "}
        <span className={`px-3 py-1 rounded-full text-white font-semibold ${docType.toLowerCase() === "contract" ? "bg-indigo-600" : "bg-green-600"}`}>
          {docType}
        </span>
      </p>

      <p className="text-lg mb-4">
        Confidence: <span className="font-semibold text-gray-700">{confidence}</span>
      </p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">❌ Missing Fields</h3>
        {missingFields.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {missingFields.map((field, idx) => <li key={idx} className="bg-red-50 px-2 py-1 rounded">{field}</li>)}
          </ul>
        ) : (
          <p className="text-green-600 mt-2 font-semibold">✅ No missing fields detected!</p>
        )}
      </div>

      {recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">💡 Recommendations</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            {recommendations.map((rec, idx) => <li key={idx} className="bg-blue-50 px-2 py-1 rounded">{rec}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
