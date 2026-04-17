// services/auth.service.ts
// import * as argon2 from 'argon2';

import { BookmarkCreateRequest } from "@/app/(Pages)/Bookmarks/bookmark_int";
import { server_ip } from "./server_ip.config";

/* cache: "no-store" => data that needs to be changed frequently 
cache: "no-store",

  // revalidate: 10 => data that needs to be changed every 10 seconds 
  next: {
  revalidate: 10,
} */

export async function getBookmarks(token: string) {
  const res = await fetch(server_ip + "/bookmark/getBookmarks", {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function getBookmarksById() {}

export async function createBookmark(
  token: string,
  request_body: BookmarkCreateRequest,
) {
  const res = await fetch(server_ip + "/bookmark/createBookmark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(request_body),
  });

  if (!res.ok) {
    throw new Error("creation failed");
  }

  return res.json();
}
