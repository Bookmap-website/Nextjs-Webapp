// services/auth.service.ts
// import * as argon2 from 'argon2';

import { BookmarkCreateRequest } from "@/app/(Pages)/Bookmarks/bookmark_int";
import { server_ip } from "./server_ip.config";
import { EditBookmark_interface } from "@/app/(Pages)/Bookmarks/[id]/editBookmark_int";

/* cache: "no-store" => data that needs to be changed frequently 
cache: "no-store",

  // revalidate: 10 => data that needs to be changed every 10 seconds 
  next: {
  revalidate: 10,
} */

export async function getBookmarks(token: string) {
  const res = await fetch(server_ip + "/bookmark/getBookmarks", {
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

export async function getBookmarksById(token: string, id: string) {
  const res = await fetch(server_ip + "/bookmark/getBookmarkById/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("BookamrkById failed to fetch");
  }

  return await res.json();
}

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

export async function updateBookmark(
  token: string,
  id: string,
  dto: EditBookmark_interface,
) {
  const res = await fetch(server_ip + "/bookmark/editBookmarkById/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    throw new Error("update failed");
  }

  return res.json();
}

export async function deleteBookmark(token: string, id: string) {
  const res = await fetch(server_ip + "/bookmark/deleteBookmarkById/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("deletion failed");
  }

  return res.json();
}

export async function getNbrBookmarks(token: string) {
  const res = await fetch(server_ip + "/bookmark/nbrBookmarks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Getting bookmark count in service failed");
  }

  return res.json();
}
