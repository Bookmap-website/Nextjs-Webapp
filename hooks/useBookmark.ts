import { useRouter } from "next/navigation";
import {
  getBookmarks,
  createBookmark,
  getBookmarksById,
  updateBookmark,
  deleteBookmark,
  getNbrBookmarks,
} from "../services/bookmark.service";
import { tokenStorage } from "../lib/token";
import { BookmarkCreateRequest } from "@/app/(Pages)/Bookmarks/bookmark_int";
import { EditBookmark_interface } from "@/app/(Pages)/Bookmarks/[id]/editBookmark_int";

export function useBookmark() {
  const router = useRouter();

  const handleGetBookmarks = async () => {
    try {
      const token = tokenStorage.getToken();

      if (!token) {
        router.push("/Login");
        return;
      }

      const data = await getBookmarks(token!);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  const handleGetBookmarkById = async (id: string) => {
    try {
      const token = tokenStorage.getToken();

      if (!token) {
        router.push("/Login");
        return;
      }

      const data = await getBookmarksById(token!, id);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  const handleAddBookmark = async (
    e: React.SyntheticEvent,
    formData: BookmarkCreateRequest,
  ) => {
    e.preventDefault();
    try {
      const token = tokenStorage.getToken();

      if (!token) {
        router.push("/Login");
        return;
      }

      const data = await createBookmark(token!, formData);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  const handleUpdateBookmark = async (
    id: string,
    formData: EditBookmark_interface,
  ) => {
    try {
      const token = tokenStorage.getToken();

      if (!token) {
        router.push("/Login");
        return;
      }

      const data = await updateBookmark(token!, id, formData);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    try {
      const token = tokenStorage.getToken();
      if (!token) {
        router.push("/Login");
        return;
      }
      const data = await deleteBookmark(token!, id);
      return data;
    } catch (err) {
      router.push("/Bookmarks");
    }
  };

  const handleGetNbrBookmarks = async () => {
    try {
      const token = tokenStorage.getToken();
      if (!token) {
        router.push("/Login");
        return;
      }
      const data = await getNbrBookmarks(token!);
      console.log(data);
      return data;
    } catch (err) {
      console.error("Error fetching number of bookmarks:", err);
    }
  };

  return {
    handleGetBookmarks,
    handleGetBookmarkById,
    handleAddBookmark,
    handleUpdateBookmark,
    handleDeleteBookmark,
    handleGetNbrBookmarks,
  };
}
