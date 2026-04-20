import { Bookmark } from "@/app/(Pages)/Bookmarks/bookmark_int";

export const exportBookmarksToCSV = (data: Bookmark[]) => {
  if (!data.length) return;

  // create headers for the bookmarks
  const headers = ["Title", "Link", "Description"];

  // create rows in the csv format
  const rows = data.map((b) => [b.title, b.link, b.description ?? ""]);

  // escape special characters
  const escapeCSV = (value: string) => {
    if (value.includes('"')) value = value.replace(/"/g, '""');
    if (value.includes(",") || value.includes("\n")) {
      return `"${value}"`;
    }
    return value;
  };

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  // create the csv
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  // puts it in the downloads folder on windows
  link.setAttribute("download", "bookmarks.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
