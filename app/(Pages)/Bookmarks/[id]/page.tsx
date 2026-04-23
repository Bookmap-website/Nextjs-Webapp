"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBookmark } from "@/hooks/useBookmark";
import { Bookmark } from "../bookmark_int";

export default function BookmarksPage() {
  const { id } = useParams();
  const router = useRouter();

  const { handleGetBookmarkById, handleDeleteBookmark, handleUpdateBookmark } =
    useBookmark();

  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    if (!id) return;

    // fetch the bookmark in question using the hook comp on load
    const fetchBookmark = async () => {
      try {
        const data = await handleGetBookmarkById(id as string);

        if (!data) {
          setBookmark(null);
          return;
        }

        setBookmark(data);

        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          link: data.link ?? "",
        });
      } catch (err) {
        setBookmark(null);
      }
    };

    fetchBookmark();
  }, [id]);

  // changes the form data from un-editable to editable
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // saves the updated bookmark, communicates with the server then update the state of the bookmark
  const saveUpdate = async () => {
    if (!id) return;

    try {
      const updated = await handleUpdateBookmark(id as string, form);
      setBookmark(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      router.push("/Bookmarks");
    }
  };

  // deletes the bookmark with an alert to confirm the choice
  const deleteBookmark = async () => {
    if (!id) return;

    if (!confirm("Are you sure you want to delete this bookmark?")) return;

    try {
      await handleDeleteBookmark(id as string);
      router.push("/Bookmarks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* HEADER */}
      <div className="flex items-center gap-4 pb-5">
        <Link
          href="/Bookmarks"
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-800">Bookmark details</h1>
      </div>

      {/* CONTENT */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        {!bookmark ? (
          <p className="text-gray-500">Bookmark not found</p>
        ) : (
          <div className="flex flex-col gap-6">
            {/* ACTIONS */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={saveUpdate}
                    className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteBookmark}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={deleteBookmark}
                    className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-500">Title *</label>

              {isEditing ? (
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800 mt-1">
                  {bookmark.title}
                </p>
              )}
            </div>

            {/* LINK */}
            <div>
              <label className="text-sm text-gray-500">Link *</label>

              {isEditing ? (
                <input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <a
                  href={bookmark.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all mt-1 block"
                >
                  {bookmark.link}
                </a>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-sm text-gray-500">Description</label>

              {isEditing ? (
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ) : (
                <p className="text-gray-700 mt-1">
                  {bookmark.description || "No description"}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
