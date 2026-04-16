"use client";

import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useProfile();
  const { handleLogoutSubmit } = useAuth();

  if (!user) return null;

  return (
    <>
      <div>
        <h1>Home</h1>

        {user.firstname ? <h2>Welcome, {user.firstname}</h2> : <h2>Welcome</h2>}

        <p>{user.email}</p>
        <p>{user.firstname}</p>
      </div>

      <div>
        <button
          onClick={handleLogoutSubmit}
          className="bg-black text-white px-3 py-2 hover:bg-red-600 rounded border border-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
