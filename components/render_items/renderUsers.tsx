/* Component to render a list of users from the api*/
"use client";

import { User } from "@/app/(Pages)/Users/users_interface";
import React from "react";

export default function RenderUsers({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((item) => (
        <div key={item.id} style={{ flexDirection: "row" }}>
          <p>{item.name}</p>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
}
