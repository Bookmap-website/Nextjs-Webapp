"use client";

import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";
import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";

export default function DraggableBookmark({
  bookmark,
}: {
  bookmark: Bookmark;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: bookmark.id,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        p-4 rounded-xl border bg-gray-900 text-white
        flex flex-col gap-2 cursor-grab
        hover:scale-[1.02] transition
        ${isDragging ? "opacity-50" : ""}
      `}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <h3 className="font-semibold">{bookmark.title}</h3>

      <Link
        href={bookmark.link}
        target="_blank"
        className="text-blue-400 break-all"
      >
        {bookmark.link}
      </Link>

      <p className="text-sm text-gray-300">
        {bookmark.description}
      </p>
    </div>
  );
}