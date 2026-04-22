"use client";

import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";
import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";

export default function DraggableBookmark({
  bookmark,
}: {
  bookmark: Bookmark;
}) {
  // drag and drop
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: bookmark.id,
    });

  // defines the drag and drop component
  return (
    <div
      ref={setNodeRef}
      {...listeners} // listeners for the taking the item and dropping it on the trash zone
      className="
        p-4 rounded-xl border bg-gray-900 text-white
        flex flex-col gap-2 cursor-grab
        hover:scale-[1.02] transition
      "
      // tracks the position of the element to follow the cursor and make it look like it's being dragged
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

      <p className="text-sm text-gray-300">{bookmark.description}</p>
    </div>
  );
}
