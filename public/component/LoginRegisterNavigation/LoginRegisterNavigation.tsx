"use client";

import Link from "next/link";
import { RegisterPromptProps } from "./LoginRegister_int";

export default function RegisterNavigation({
  href_file_path,
  text_before_link,
  text_after_link,
}: RegisterPromptProps) {
  return (
    <div className="flex justify-center items-center text-sm text-gray-600">
      <p className="flex items-center gap-1">
        <span>{text_before_link}</span>

        <span className="text-gray-400">-</span>

        <Link
          href={href_file_path}
          className="text-blue-500 font-medium hover:text-blue-600 transition"
        >
          {text_after_link}
        </Link>
      </p>
    </div>
  );
}