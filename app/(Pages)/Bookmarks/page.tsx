"use client";

import { useBookmark } from "@/hooks/useBookmark";
import RenderBookmarks from "@/component/render_items/renderBookmark";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark } from "./bookmark_int";

export default function Bookmarks_page() {
  const [bookmarks_list, setBookmarks] = useState<Bookmark[]>([]);
  const { handleGetBookmarks } = useBookmark();

  const getBookmarks = async () => {
    const data = await handleGetBookmarks();

    if (data) {
      setBookmarks(data);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <>
      <Link href="/" className="navbar-item">
        Vers la page Home
      </Link>

      <h1 style={{ paddingTop: "25px" }}>My Bookmarks</h1>

      <RenderBookmarks bookmarks={bookmarks_list} />
    </>
  );
}