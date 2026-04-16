/* Component to render a list of users from the api*/
"use client";

import { User } from "@/app/(Pages)/Users/users_interface";
import React from "react";

export default function RenderUsers({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{ flexDirection: "row" }}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
