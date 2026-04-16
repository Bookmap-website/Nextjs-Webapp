import Link from "next/link";
import styles from "./Presentation.module.css";

export default function PresentationPage() {
  return (
    <div>
      <Link href="/" className="navbar-item">
        Vers la page Home
      </Link>
      <h1 className="p-5 my-5 bg-amber-400 text-black text-xl">
        Presentation Page
      </h1>
      <p>ici c'est la Presentation page</p>
    </div>
  );
}
