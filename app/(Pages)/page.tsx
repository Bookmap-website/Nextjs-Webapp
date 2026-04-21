"use client";

import { useBookmark } from "@/hooks/useBookmark";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useProfile();
  const { handleGetNbrBookmarks } = useBookmark();
  const [nbrBookmarks, setNbrBookmarks] = useState(0);

  // useEffect(() => {
  //   if (user) {
  //     setNbrBookmarks(handleGetNbrBookmarks());
  //   }
  // }, [handleGetNbrBookmarks, user]);

  useEffect(() => {
    if (user) {
      handleGetNbrBookmarks().then((data) => setNbrBookmarks(data));
    }
  }, [handleGetNbrBookmarks, user]);

  if (!user) return null;

  return (
    <div>
      <h2>
        {user.firstname ? `Welcome, ${user.firstname}!` : "Welcome!"}
      </h2>

      <p>{user.email}</p>
      <p>{user.firstname}</p>

      <p>Number of bookmarks: {nbrBookmarks}</p>
    </div>
  );
}