"use client";

import { useProfile } from "@/hooks/useProfile";

export default function Home() {
  const { user } = useProfile();

  if (!user) return null;

  return (
    <>
      <div>
        {user.firstname ? (
          <h2>Welcome, {user.firstname} !</h2>
        ) : (
          <h2>Welcome !</h2>
        )}

        <p>{user.email}</p>
        <p>{user.firstname}</p>
      </div>
    </>
  );
}
