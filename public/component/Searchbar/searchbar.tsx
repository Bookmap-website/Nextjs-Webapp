"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;

  filters: {
    title: boolean;
    description: boolean;
    link: boolean;
  };
  onFilterChange: (filters: {
    title: boolean;
    description: boolean;
    link: boolean;
  }) => void;
};

export default function SearchBar({
  value,
  onChange,
  filters,
  onFilterChange,
}: SearchBarProps) {
  const toggleFilter = (key: "title" | "description" | "link") => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      {/* INPUT + X */}
      <div style={{ position: "relative", width: "80%" }}>
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 30px 8px 8px", // espace pour le X
            borderRadius: "5px",
            border: "1px solid white",
            background: "#111",
            color: "white",
          }}
        />

        {value && (
          <button
            onClick={() =>  onChange("")}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>
        {(["title", "description", "link"] as const).map((key) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              border: "1px solid",
              cursor: "pointer",
              color: filters[key] ? "blue" : "gray",
              borderColor: filters[key] ? "blue" : "gray",
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}