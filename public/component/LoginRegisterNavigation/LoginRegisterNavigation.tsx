"use client";

import Link from "next/link";
import { RegisterPromptProps } from "./LoginRegister_int";

export default function RegisterPrompt({
  href_file_path,
  text_before_link,
  text_after_link,
}: RegisterPromptProps) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>
        {text_before_link} - {" "}
        <Link href={href_file_path} className="login-link">
          {text_after_link}
        </Link>
      </p>
    </div>
  );
}
