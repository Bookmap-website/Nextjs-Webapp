"use client";

type Props = {
  label: string;
  isValid: boolean;
  type: "button" | "submit" | "reset";
};

export default function LoginButton({
  label,
  isValid,
  type,
}: Props) {
  return (
    <button
      type={type}
      disabled={!isValid}
      className={`w-full py-2 rounded-lg font-semibold text-white transition
        ${
          isValid
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-400 cursor-not-allowed"
        }
      `}
    >
      {label}
    </button>
  );
}