"use client";

import { useBookmark } from "@/hooks/useBookmark";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useProfile();
  const { handleGetNbrBookmarks } = useBookmark();
  const [nbrBookmarks, setNbrBookmarks] = useState(0);

  useEffect(() => {
    if (user) {
      handleGetNbrBookmarks().then((data) => setNbrBookmarks(data));
    }
  }, [handleGetNbrBookmarks, user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* HEADER (same style as bookmarks page) */}
      <div className=" mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Overview of your account and activity</p>
      </div>

      {/* MAIN CARD */}
      <div className=" mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* WELCOME BLOCK */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstname ? `Welcome, ${user.firstname}` : "Welcome"}
          </h2>
          <p className="text-gray-500">Here is your personal space</p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EMAIL */}
          <div className="p-4 rounded-xl border bg-gray-50 hover:shadow-sm transition">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>

          {/* FIRSTNAME */}
          <div className="p-4 rounded-xl border bg-gray-50 hover:shadow-sm transition">
            <p className="text-sm text-gray-500">Firstname</p>
            <p className="text-gray-800 font-medium">
              {user.firstname || "Not set"}
            </p>
          </div>

          {/* BOOKMARKS (highlighted like KPI card) */}
          <div className="p-5 rounded-xl border bg-blue-50 col-span-1 md:col-span-2 hover:shadow-md transition">
            <p className="text-sm text-blue-600">Total Bookmarks</p>

            <p className="text-3xl font-bold text-blue-700">{nbrBookmarks}</p>

            <p className="text-sm text-blue-500 mt-1">
              Saved items in your collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
