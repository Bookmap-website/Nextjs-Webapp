"use client";

import { Bookmark } from "./bookmark_int";
import DraggableBookmark from "@/public/component/DragAndDrop/dragableBookmark";

export default function RenderBookmarks({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      {bookmarks.map((item) => (
        <DraggableBookmark key={item.id} bookmark={item} />
      ))}
    </div>
  );
}