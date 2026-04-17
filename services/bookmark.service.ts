// services/auth.service.ts
// import * as argon2 from 'argon2';

import { server_ip } from "./server_ip.config";

export async function getBookmarks(token: string) {
  //   const res = await fetch(server_ip + "/auth/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }), // hash
  //   });

  //   if (!res.ok) {
  //     throw new Error("Login failed");
  //   }

  //   return res.json();

  // get hte bookmarks
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

export async function getBookmarksById() {}
