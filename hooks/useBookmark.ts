import { useRouter } from "next/navigation";
import { getBookmarks, createBookmark } from "../services/bookmark.service";
import { tokenStorage } from "../lib/token";
import { Bookmark, BookmarkCreateRequest } from "@/app/(Pages)/Bookmarks/bookmark_int";

export function useBookmark() {
  const router = useRouter();

  const handleGetBookmarks = async () => {
    try {
      const token = tokenStorage.getToken();
      const data = await getBookmarks(token!);
      return data;
    } catch (err) {
      tokenStorage.removeToken();
      router.push("/Login");
    }
  };

  const handleAddBookmark = async (e: any, formData: BookmarkCreateRequest) => {
    e.preventDefault();
    try {
      const token = tokenStorage.getToken();

      const data = await createBookmark(token!, formData);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  return { handleGetBookmarks, handleAddBookmark };
}
