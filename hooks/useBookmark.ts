import { useRouter } from "next/navigation";
import { getBookmarks } from "../services/bookmark.service";
import { tokenStorage } from "../lib/token";

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

  return { handleGetBookmarks };
}
