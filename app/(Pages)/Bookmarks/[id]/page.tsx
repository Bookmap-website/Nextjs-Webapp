"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BookmarksPage() {
  const { id } = useParams();

  return (
    <>
      <h1>bookmark id from url</h1>
      <h2>{id}</h2>

      <Link href="/" className="navbar-item">
        Vers la page Home
      </Link>
    </>
  );
}