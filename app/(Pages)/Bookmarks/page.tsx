"use client";

import { useBookmark } from "@/hooks/useBookmark";
import RenderBookmarks from "./renderBookmark";
import { useEffect, useState } from "react";
import { Bookmark } from "./bookmark_int";

import { DndContext } from "@dnd-kit/core";
import TrashZone from "@/public/component/DragAndDrop/TrashZone";

import BookmarksHeader from "@/public/component/bookmark/BookmarksHeader";
import BookmarkForm from "@/public/component/bookmark/BookmarkForm";
import BookmarkActions from "@/public/component/bookmark/BookmarkActions";
import BookmarkSearch from "@/public/component/bookmark/BookmarkSearchBar";

export default function Bookmarks_page() {
  const { handleGetBookmarks, handleAddBookmark, handleDeleteBookmark } =
    useBookmark();

  const [bookmarks_list, setBookmarks] = useState<Bookmark[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [formBookmarkData, setFormBookmarkData] = useState({
    title: "",
    link: "",
    description: "",
  });

  const [searchBar, setSearchBar] = useState("");

  const [filters, setFilters] = useState({
    title: true,
    description: true,
    link: true,
  });

  useEffect(() => {
    getBookmarks();
  }, []);

  const getBookmarks = async () => {
    const data = await handleGetBookmarks();
    if (data) setBookmarks(data);
  };

  const onCreationBookmarkFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await handleAddBookmark(e, formBookmarkData);

    setFormBookmarkData({
      title: "",
      link: "",
      description: "",
    });

    await getBookmarks();
  };

  const filteredBookmarks = bookmarks_list.filter((bookmark) => {
    const query = searchBar.toLowerCase();

    return (
      (filters.title && bookmark.title.toLowerCase().includes(query)) ||
      (filters.description &&
        (bookmark.description || "").toLowerCase().includes(query)) ||
      (filters.link && bookmark.link.toLowerCase().includes(query))
    );
  });

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over?.id === "trash") {
      const id = active.id;

      setBookmarks((prev) => prev.filter((b) => b.id !== id));

      try {
        await handleDeleteBookmark(id);
      } catch (err) {
        console.error(err);
        await getBookmarks();
      }
    }

    setIsDragging(false);
  };

  return (
    <DndContext
      autoScroll={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <BookmarksHeader />

        <BookmarkActions
          showForm={showForm}
          setShowForm={setShowForm}
          filteredBookmarks={filteredBookmarks}
        />

        <BookmarkForm
          showForm={showForm}
          setShowForm={setShowForm}
          formBookmarkData={formBookmarkData}
          setFormBookmarkData={setFormBookmarkData}
          onSubmit={onCreationBookmarkFormSubmit}
        />

        <BookmarkSearch
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="mt-6">
          <RenderBookmarks bookmarks={filteredBookmarks} />
        </div>

        {isDragging && <TrashZone />}
      </div>
    </DndContext>
  );
}
