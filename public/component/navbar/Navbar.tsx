"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import NavbarButton from "./navbar-button";
import { useProfile } from "@/hooks/useProfile";

export function Navbar() {
  const router = useRouter();
  const { isAdmin } = useProfile();

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          Bookmap
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {/* show this button only if the user is admin */}
          {isAdmin && (
            <NavbarButton label="Logs" onClick={() => router.push("/Logs")} />
          )}
          <NavbarButton label="Dashboard" onClick={() => router.push("/")} />
          <NavbarButton
            label="Bookmarks"
            onClick={() => router.push("/Bookmarks")}
          />
          <NavbarButton
            label="Settings"
            onClick={() => router.push("/Profile")}
          />

          <NavbarButton
            label="Logout"
            variant="danger"
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/Login");
            }}
          />
        </div>
      </div>
    </nav>
  );
}
