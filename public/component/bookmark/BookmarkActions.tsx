"use client";

import { exportBookmarksToCSV } from "@/utilities/CSV/bookmark_csv_export_logic";

type Props = {
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  filteredBookmarks: any[];
};

export default function BookmarkActions({
  showForm,
  setShowForm,
  filteredBookmarks,
}: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex gap-3">

      {/* CREATE BUTTON */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {showForm ? "Cancel" : "Add Bookmark"}
      </button>

      {/* EXPORT CSV */}
      <button
        onClick={() => exportBookmarksToCSV(filteredBookmarks)}
        className="px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
      >
        Export CSV
      </button>

    </div>
  );
}