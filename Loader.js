import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      <p className="ml-4 text-indigo-600 font-semibold">Analyzing document...</p>
    </div>
  );
}
