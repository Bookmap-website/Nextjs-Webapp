/* Component to render a list of items from the api*/
"use client";

import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";

export default function Render_bookmarks({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  return (
    <div>
      {bookmarks.map((item) => (
        <div key={item.id} style={{ flexDirection: "row" }}>
          <p>{item.title}</p>
          <p>{item.link}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
