"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import '../comps.css';

export default function Login_page() {
  const { handleLoginSubmit } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={(e) => handleLoginSubmit(e, formData)}>
        <div style={{ display: "flex", gap: "10px" }}>
          <h1>Email :</h1>
          <input
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
      <br />
      <div style={{ flexDirection: "row" }}>
        <p>
          Don't have an account ? -{" "}
          <Link href="/Register" className="login-link">
            register now
          </Link>
        </p>
      </div>
    </>
  );
}
