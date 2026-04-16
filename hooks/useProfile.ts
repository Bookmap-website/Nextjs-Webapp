import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/token";
import { getMe } from "@/services/user.service";

export function useProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = tokenStorage.getToken();

        if (!token) {
          router.push("/Login");
          return;
        }

        const data = await getMe(token);

        setUser(data);
      } catch (err) {
        tokenStorage.removeToken();
        router.push("/Login");
      }
    };

    fetchProfile();
  }, [router]);

  return { user };
}