"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login_page() {
  const { handleLoginSubmit } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <form onSubmit={(e) => handleLoginSubmit(e, formData)}>
      <div style={{ display: "flex", gap: "10px" }}>
        <h1>Email :</h1>
        <input
          type="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <h1>Password :</h1>
        <input
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      {/* if all fields arent filled, then the color is red, else it green */}
      <div>
        <button
          type="submit"
          style={{
            color:
              formData.email !== "" && formData.password !== ""
                ? "green"
                : "red",
          }}
        >
          Login
        </button>
      </div>
    </form>
  );
}
