// services/auth.service.ts
// import * as argon2 from 'argon2';

export async function login(email: string, password: string) {

    // hash password with argon2
    // const hash = await argon2.hash(password);

  const res = await fetch("http://localhost:3000/auth/signin", {
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