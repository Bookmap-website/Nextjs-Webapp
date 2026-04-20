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

  // LOAD DATA
  useEffect(() => {
    if (!id) return;

    const id_string = id as string;
    handleGetBookmarkById(id_string)
      .then((data) => {
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
      })
      .catch((err) => {
        console.error(err);
        setBookmark(null);
      });
  }, [id]);

  // INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TOGGLE EDIT MODE
  const activateEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // SAVE UPDATE
  const saveUpdate = async () => {
    if (!id) return;

    try {
      const id_string = id as string;
      const updated = await handleUpdateBookmark(id_string, form);
      setBookmark(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      router.push("/Bookmarks");
    }
  };

  // DELETE
  const deleteBookmark = async () => {
    if (!id) return;

    const confirmDelete = confirm(
      "Are you sure you want to delete this bookmark?",
    );

    if (!confirmDelete) return;

    try {
      const id_string = id as string;
      await handleDeleteBookmark(id_string);
      router.push("/Bookmarks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link href="/Bookmarks" className="navbar-item">
          ← Back
        </Link>
        <h1>Bookmark details</h1>
      </div>

      {/* Content */}
      {!bookmark ? (
        <p style={{ marginTop: "20px", opacity: 0.7 }}>Bookmark not found</p>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid white",
            borderRadius: "10px",
            background: "#111",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "50%",
          }}
        >
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            {isEditing ? (
              <>
                <button onClick={saveUpdate} style={{ width: "25%" }}>
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  style={{ width: "25%" }}
                >
                  Cancel
                </button>

                <button
                  onClick={deleteBookmark}
                  style={{ width: "50%", color: "red" }}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button onClick={activateEditMode} style={{ width: "50%" }}>
                  Edit
                </button>

                <button
                  onClick={deleteBookmark}
                  style={{ width: "50%", color: "red" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {/* TITLE */}
          <div>
            <h3>Title</h3>
            {isEditing ? (
              <input name="title" value={form.title} onChange={handleChange} />
            ) : (
              <p>{bookmark.title}</p>
            )}
          </div>

          {/* LINK */}
          <div>
            <h3>Link</h3>
            {isEditing ? (
              <input name="link" value={form.link} onChange={handleChange} />
            ) : (
              <a
                href={bookmark.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4da6ff" }}
              >
                {bookmark.link}
              </a>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3>Description</h3>
            {isEditing ? (
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            ) : (
              <p>{bookmark.description}</p>
            )}
          </div>

          {/* ACTIONS */}
        </div>
      )}
    </div>
  );
}
