import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      
      <div className="flex flex-col items-center gap-4 rounded-xl bg-zinc-900 px-8 py-6 shadow-2xl">
        
        {/* Spinner Tailwind */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-500 border-t-white" />

        {/* Text */}
        <p className="text-sm text-white/70">
          Loading...
        </p>
      </div>
    </div>
  );
}