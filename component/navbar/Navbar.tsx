"use client";

import { useRouter } from "next/navigation";
import "./navbar.css";
import Link from "next/link";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div><Link href="/" className="logo">Bookmap</Link></div>

      <div className="links">
        <button onClick={() => router.push("/Bookmarks")} className="button-navbar">Bookmarks</button>
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