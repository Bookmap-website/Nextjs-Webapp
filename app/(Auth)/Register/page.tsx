"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/Auth/useAuth";

import Input from "@/public/component/Input";
import LoginButton from "@/public/component/LoginRegisterNavigation/button";
import RegisterPrompt from "@/public/component/LoginRegisterNavigation/LoginRegisterNavigation";
import FormTitle from "@/public/component/LoginRegisterNavigation/title";

export default function Register_page() {
  const { handleSignupSubmit } = useAuth();

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
        {/* Title */}
        <FormTitle text="Register - Bookmap" />

        <form
          onSubmit={(e) => handleSignupSubmit(e, formData)}
          className="space-y-5"
        >
          {/* Email Input*/}
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />

          {/* Register button component */}
          <LoginButton label="Register" type="submit" isValid={isValid} />
        </form>

        {/* Footer link to login page */}
        <div className="mt-6">
          <RegisterPrompt
            href_file_path="/Login"
            text_before_link="Already have an account?"
            text_after_link="Login now"
          />
        </div>
      </div>
    </div>
  );
}
