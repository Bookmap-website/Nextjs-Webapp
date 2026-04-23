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
  const { handleGetBookmarks, handleAddBookmark, handleDeleteBookmark } = useBookmark();

  const [bookmarks_list, setBookmarks] = useState<Bookmark[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // dynamic form data
  const [formBookmarkData, setFormBookmarkData] = useState({
    title: "",
    link: "",
    description: "",
  });

  // search bar
  const [searchBar, setSearchBar] = useState("");

  // filters for the search bar
  const [filters, setFilters] = useState({
    title: true,
    description: true,
    link: true,
  });

  // get all the bookmarks on page load
  useEffect(() => {
    getBookmarks();
  }, []);

  // get all the bookmarks from the hook comp
  const getBookmarks = async () => {
    try {
      const data = await handleGetBookmarks();

      setBookmarks(data);
    } catch (err) {
      console.error("Error fetching number of bookmarks:", err);
    }
  };

  // function to create a new bookmark with the form's submitted data
  const onCreationBookmarkFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await handleAddBookmark(event, formBookmarkData);

    setFormBookmarkData({
      title: "",
      link: "",
      description: "",
    });

    await getBookmarks();
  };

  // filters the bookmarks in the list to match the search bar + filters
  const filteredBookmarks = Array.isArray(bookmarks_list)
  ? bookmarks_list.filter((bookmark) => {
      const query = searchBar.toLowerCase();

      return (
        (filters.title && bookmark.title.toLowerCase().includes(query)) ||
        (filters.description &&
          (bookmark.description || "").toLowerCase().includes(query)) ||
        (filters.link && bookmark.link.toLowerCase().includes(query))
      );
    })
  : [];

  // drag and drop the bookmarks to the trash zone component to delete
  // librairies i used : npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    // if the item is dropped on the trash zone
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
    // comes from the librairies : @dnd-kit/core, provides a context to drag and drop the items from the list of bookmarks
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
