"use client";

import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";

export default function DraggableBookmark({
  bookmark,
}: {
  bookmark: Bookmark;
}) {
  const router = useRouter();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: bookmark.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="
        p-4 rounded-xl border bg-gray-900 text-white
        flex flex-col gap-3
      "
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {/* HEADER avec drag handle */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{bookmark.title}</h3>

        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-gray-400 hover:text-white"
        >
          ⋮⋮
        </div>
      </div>

      <Link
        href={bookmark.link}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        className="text-blue-400 break-all"
      >
        {bookmark.link}
      </Link>

      <p className="text-sm text-gray-300 line-clamp-2">
        {bookmark.description}
      </p>

      {/* BUTTON WORKS NOW */}
      <button
        onClick={() => router.push("/Bookmarks/" + bookmark.id)}
        className="
          mt-2 px-3 py-1.5 text-sm font-medium
          bg-blue-500 hover:bg-blue-600
          rounded-lg transition
        "
      >
        View details
      </button>
    </div>
  );
}