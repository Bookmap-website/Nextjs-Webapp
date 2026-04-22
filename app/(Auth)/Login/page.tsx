"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/Auth/useAuth";
import RegisterNavigation from "@/public/component/LoginRegisterNavigation/LoginRegisterNavigation";

import Input from "@/public/component/Input";
import LoginButton from "@/public/component/LoginRegisterNavigation/button";
import FormTitle from "@/public/component/LoginRegisterNavigation/title";

export default function Login_page() {
  const { handleLoginSubmit } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isValid =
    formData.email !== "" &&
    formData.password !== "" &&
    formData.password.length >= 6;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <FormTitle text="Login - Bookmap" />

        <form
          onSubmit={(e) => handleLoginSubmit(e, formData)}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />

          <LoginButton label="Login" type="submit" isValid={isValid} />
        </form>

        <div className="mt-6">
          <RegisterNavigation
            href_file_path="/Register"
            text_before_link="Don't have an account?"
            text_after_link="Register now"
          />
        </div>
      </div>
    </div>
  );
}
