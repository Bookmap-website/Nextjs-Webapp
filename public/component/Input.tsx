"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Input({ label, type, value, onChange }: Props) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onChange(e.target.value)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}