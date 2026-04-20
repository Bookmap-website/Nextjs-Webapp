"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import "../comps.css";
import RegisterPrompt from "@/public/component/LoginRegisterNavigation/LoginRegisterNavigation";

export default function Register_page() {
  const { handleSignupSubmit } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSignupSubmit(e, formData)}>
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
            Register
          </button>
        </div>
      </form>
      <br />

      <RegisterPrompt
        href_file_path="/Login"
        text_before_link="Already have an account?"
        text_after_link="Login"
      />
    </>
  );
}
