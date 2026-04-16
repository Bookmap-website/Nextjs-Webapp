// services/user.service.ts

export async function getMe(token: string) {
  const res = await fetch("http://localhost:3000/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}