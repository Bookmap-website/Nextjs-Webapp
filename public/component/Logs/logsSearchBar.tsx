"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LogsSearchBar({ value, onChange }: Props) {
  return (
    <div className="mt-6">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Rechercher dans les logs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}