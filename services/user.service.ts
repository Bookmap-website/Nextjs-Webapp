// services/user.service.ts

import { server_ip } from "./server_ip.config";

export async function getMe(token: string) {
  const res = await fetch(server_ip + "/user/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
