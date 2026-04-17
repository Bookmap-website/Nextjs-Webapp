import Link from "next/link";
import "./navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>

      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/bookmarks">Bookmarks</Link>
        <Link href="/Login">Login</Link>
      </div>
    </nav>
  );
}