import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/token";
import { getMe, getWhoami } from "@/services/user.service";

export function useProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

        const adminData = await getWhoami(token);
        setIsAdmin(adminData?.isAdmin);
      } catch (err) {
        tokenStorage.removeToken();
        router.push("/Login");
      }
    };

    fetchProfile();
  }, [router]);

  return { user, isAdmin };
}