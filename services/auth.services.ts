// services/auth.service.ts
// import * as argon2 from 'argon2';

import { server_ip } from "./server_ip.config";

export async function login(email: string, password: string) {
  const res = await fetch(server_ip + "/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // hash
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function signup(email: string, password: string) {
  const res = await fetch(server_ip + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // hash
  });

  if (!res.ok) {
    throw new Error("Signup failed");
  }

  return res.json();
}
