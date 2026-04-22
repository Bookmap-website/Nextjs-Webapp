"use client";

import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

export default function TrashZone() {
  // sets a ref to the trash zone
  const { setNodeRef, isOver } = useDroppable({
    id: "trash",
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        fixed bottom-6 right-6 w-44 h-44
        flex flex-col items-center justify-center gap-2
        rounded-2xl border-2 z-50
        transition-all duration-200
        shadow-lg
        ${
          isOver
            ? "bg-red-100 border-red-500 text-red-600 scale-103"
            : "bg-white border-gray-300 text-gray-500"
        }
      `}
    >
      <Trash2
        size={32}
        className={`transition ${isOver ? "text-red-600" : "text-gray-500"}`}
      />

      <p className="text-sm font-medium">Drop to delete</p>
    </div>
  );
}
