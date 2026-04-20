"use client";

import { useBookmark } from "@/hooks/useBookmark";
import RenderBookmarks from "./renderBookmark";
import { useEffect, useState } from "react";
import { Bookmark } from "./bookmark_int";

export default function Bookmarks_page() {
  const { handleGetBookmarks, handleAddBookmark } = useBookmark();

  const [bookmarks_list, setBookmarks] = useState<Bookmark[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formBookmarkData, setFormBookmarkData] = useState({
    title: "",
    link: "",
    description: "",
  });

  // when the page mounts, get the bookmarks
  useEffect(() => {
    getBookmarks();
  }, []);

  // gets the bookmarks from the hooks/services
  const getBookmarks = async () => {
    const data = await handleGetBookmarks();

    if (data) {
      setBookmarks(data);
    }
  };

  // sends the form data to the backend and resets the front end if successful
  const onCreationBookmarkFormSubmit = async (e: React.SyntheticEvent) => {
    try {
      await handleAddBookmark(e, formBookmarkData);
    } catch (err) {
      return;
    }

    setFormBookmarkData({
      title: "",
      link: "",
      description: "",
    });

    try {
      await getBookmarks();
    } catch (err) {
      return;
    }
  };

  const isFormValid =
    formBookmarkData.title.trim() !== "" && formBookmarkData.link.trim() !== "";

  return (
    <>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid white",
            borderRadius: "5px",
          }}
        >
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ borderRadius: "5px", width: "100%" }}
          >
            {showForm ? "Cancel" : "Add Bookmark"}
          </button>
        </div>
        {showForm && (
          <div style={{ marginTop: "20px", alignContent: "center" }}>
            <form onSubmit={(e) => onCreationBookmarkFormSubmit(e)}>
              {/* Row: Title + Link */}
              <div style={{ display: "flex", gap: "20px" }}>
                {/* Title */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                  }}
                >
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={formBookmarkData.title}
                    onChange={(e) =>
                      setFormBookmarkData({
                        ...formBookmarkData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Link */}
                <div
                  style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px" }}
                >
                  <label>Website Link (url) *</label>
                  <input
                    type="text"
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={formBookmarkData.link}
                    onChange={(e) =>
                      setFormBookmarkData({
                        ...formBookmarkData,
                        link: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Description */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "15px",
                  padding: "10px",
                }}
              >
                <label>Description</label>
                <input
                  type="text"
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={formBookmarkData.description}
                  onChange={(e) =>
                    setFormBookmarkData({
                      ...formBookmarkData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                {}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  style={{
                    color: isFormValid ? "green" : "red",
                    borderColor: isFormValid ? "green" : "red",
                    borderWidth: "1px",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <h1 style={{ paddingTop: "25px" }}>My Bookmarks : </h1>
      <RenderBookmarks bookmarks={bookmarks_list} />
    </>
  );
}
