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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {user.firstname ? `Welcome, ${user.firstname}` : "Welcome"}
        </h2>

        <p className="text-gray-500 mb-6">
          Your personal dashboard overview
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Email card */}
          <div className="p-4 rounded-xl border bg-gray-50">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-800 font-medium">{user.email}</p>
          </div>

          {/* Firstname card */}
          <div className="p-4 rounded-xl border bg-gray-50">
            <p className="text-sm text-gray-500">Firstname</p>
            <p className="text-gray-800 font-medium">
              {user.firstname || "Not set"}
            </p>
          </div>

          {/* Bookmarks card */}
          <div className="p-4 rounded-xl border bg-blue-50 col-span-1 md:col-span-2">
            <p className="text-sm text-blue-600">Bookmarks</p>
            <p className="text-2xl font-bold text-blue-700">
              {nbrBookmarks}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}