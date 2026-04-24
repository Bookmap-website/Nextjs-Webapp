"use client";

type Props = {
  item_header: string;
  item_description: string;
};

export default function BookmarksHeader({
  item_header,
  item_description,
}: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{item_header}</h1>
      <p className="text-gray-500">{item_description}</p>
    </div>
  );
}