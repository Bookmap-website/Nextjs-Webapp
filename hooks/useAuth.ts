import { login } from "@/services/auth.services";
import { tokenStorage } from "@/lib/token";
import { useRouter } from "next/navigation";
import * as argon2 from "argon2";

export function useAuth() {
  const router = useRouter();

  const handleLoginSubmit = async (e: any, formData: any) => {
    e.preventDefault();

    try {
      

      const data = await login(formData.email, formData.password);

      tokenStorage.setToken(data.access_token);

      router.push("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleLogoutSubmit = () => {
    tokenStorage.removeToken();
    router.push("/Login");
  };

  return { handleLoginSubmit, handleLogoutSubmit };
}