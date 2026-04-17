"use client";

import { useRouter } from "next/navigation";
import "./navbar.css";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="logo">Bookmap</div>

      <div className="links">
        <button onClick={() => router.push("/")} className="button-navbar">Home</button>
        <button onClick={() => router.push("/bookmarks")} className="button-navbar">Bookmarks</button>
        <button onClick={() => {
          // logout logic here
          localStorage.removeItem("token");
          router.push("/Login");
        }} className="button-navbar">
          Logout
        </button>
      </div>
    </nav>
  );
}