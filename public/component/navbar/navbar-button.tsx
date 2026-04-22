"use client";

type Props = {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
};

export default function NavbarButton({
  label,
  onClick,
  variant = "default",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition
        ${
          variant === "danger"
            ? "text-red-500 hover:text-red-600 hover:bg-red-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }
      `}
    >
      {label}
    </button>
  );
}