"use client";

type Props = {
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  formBookmarkData: {
    title: string;
    link: string;
    description: string;
  };
  setFormBookmarkData: (v: any) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};

export default function BookmarkForm({
  showForm,
  setShowForm,
  formBookmarkData,
  setFormBookmarkData,
  onSubmit,
}: Props) {
  if (!showForm) return null;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mt-4">
      <form onSubmit={onSubmit} className="space-y-3">

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Title"
          value={formBookmarkData.title}
          onChange={(e) =>
            setFormBookmarkData({
              ...formBookmarkData,
              title: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Link"
          value={formBookmarkData.link}
          onChange={(e) =>
            setFormBookmarkData({
              ...formBookmarkData,
              link: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Description"
          value={formBookmarkData.description}
          onChange={(e) =>
            setFormBookmarkData({
              ...formBookmarkData,
              description: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Save
        </button>

      </form>
    </div>
  );
}