"use client";

import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";
import Link from "next/link";

export default function Render_bookmarks({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {bookmarks.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid white",
            borderRadius: "10px",
            padding: "15px",
            color: "white",
            background: "#111",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h3>{item.title}</h3>

          <Link
            href={item.link}
            target="_blank"
            style={{ color: "#4da6ff" }}
          >
            {item.link}
          </Link>

          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}